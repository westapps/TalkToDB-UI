pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/your-react-app-repo.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("your-ecr-repo/your-react-app:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://your-ecr-repo-url', 'ecr-credentials-id') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshAgent(['ec2-ssh-key-id']) {
                    sh '''
                        ssh ec2-user@your-ec2-instance "docker pull your-ecr-repo/your-react-app:latest && docker stop react-app || true && docker rm react-app || true && docker run -d -p 80:80 --name react-app your-ecr-repo/your-react-app:latest"
                    '''
                }
            }
        }
    }
}
