pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID = '165769518303'
        TALKTODB_REACT_APP_NAME = 'talktodb-ui' 
        AWS_DEFAULT_REGION = 'ap-southeast-2'
        AWS_ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        IMAGE_REPO_NAME = "react/${TALKTODB_REACT_APP_NAME}"
        IMAGE_TAG = "latest"
        EC2_USER_AT_TALKTODB_UI_INSTANCE = 'ec2-user@ip-172-31-46-53.ap-southeast-2.compute.internal'
        TALKTODB_UI_SSH_CREDENTIALS = 'talktodb-ui-ec2-ssh-key-id'
    }

    stages {
        stage('Check Out Git Repo') {
            steps {
                // Check out the code from GitHub
                git branch: 'master', url: 'https://github.com/westapps/TalkToDB-UI'
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                // Use AWS CLI to authenticate Docker with AWS ECR
                sh '''
                    aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                    docker login --username AWS --password-stdin $AWS_ECR_REGISTRY
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh '''
                    docker build --network=host -t $AWS_ECR_REGISTRY/$IMAGE_REPO_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Push Docker Image to AWS ECR') {
            steps {
                // Push the Docker image to AWS ECR
                sh '''
                    docker push $AWS_ECR_REGISTRY/$IMAGE_REPO_NAME:$IMAGE_TAG
                '''
            }
        }
        stage('Deploy to EC2 TalkToDB-UI instance') {
            steps {
                sshagent (credentials: [TALKTODB_UI_SSH_CREDENTIALS]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $EC2_USER_AT_TALKTODB_UI_INSTANCE "\
                            aws ecr get-login-password --region $AWS_DEFAULT_REGION | \
                            docker login --username AWS --password-stdin $AWS_ECR_REGISTRY && \
                            docker pull $AWS_ECR_REGISTRY/$IMAGE_REPO_NAME:$IMAGE_TAG && \
                            docker stop $TALKTODB_REACT_APP_NAME || true && \
                            docker rm $TALKTODB_REACT_APP_NAME || true && \
                            docker run -d -p 80:80 --name $TALKTODB_REACT_APP_NAME \
                            $AWS_ECR_REGISTRY/$IMAGE_REPO_NAME:$IMAGE_TAG \
                        "
                    '''
                }
            }
        }
        stage('Clean Up') {
            steps {
                // Optional: Remove the image locally to save space
                sh "docker rmi $AWS_ECR_REGISTRY/$IMAGE_REPO_NAME:$IMAGE_TAG || true"
            }
        }
    }
}