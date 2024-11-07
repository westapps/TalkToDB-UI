pipeline {
    agent any

    environment {
        //TALKTODB_REACT_APP_NAME = 'talktodb-ui' // Set in Jenkins UI
        //TALKTODB_UI_GIT_REPO = 'https://github.com/westapps/TalkToDB-UI.git' // Set in Jenkins UI
        GIT_CREDENTIALS = credentials('GitHubToken_For_Jenkins') // Set in Jenkins Credentials
        //AWS_ECR_REGISTRY = '165769518303.dkr.ecr.ap-southeast-2.amazonaws.com' // Set in Jenkins UI
        AWS_ECR_REPO = "react/${TALKTODB_REACT_APP_NAME}"
        AWS_ECR_CREDENTIALS = credentials('ecr-credentials-id') //todo: Set in Jenkins Credentials
        EC2_USER_AT_TALKTODB_UI_INSTANCE = 'ec2-user@13.54.102.161' // Set in Jenkins UI
        SSH_CREDENTIALS = 'ec2-ssh-key-id' // Set in Jenkins Credentials
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${GIT_REPO}", credentialsId: "${GIT_CREDENTIALS}"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${AWS_ECR_REGISTRY}/${AWS_ECR_REPO}:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${AWS_ECR_REGISTRY}", "${AWS_ECR_CREDENTIALS}") {
                        dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ["${SSH_CREDENTIALS}"]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ${EC2_INSTANCE} "
                            docker pull ${AWS_ECR_REGISTRY}/${AWS_ECR_REPO}:latest && \
                            docker stop ${REACT_APP_NAME} || true && \
                            docker rm ${REACT_APP_NAME} || true && \
                            docker run -d -p 80:80 --name ${REACT_APP_NAME} ${AWS_ECR_REGISTRY}/${AWS_ECR_REPO}:latest
                        "
                    '''
                }
            }
        }
    }
}
