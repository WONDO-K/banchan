pipeline {
    agent any

    environment {
        GIT_CREDENTIAL_ID = 'pwd-gitlab-ssafy'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12E105.git', branch: 'production', credentialsId: GIT_CREDENTIAL_ID
                    sh '''
                    cd /home/S11P12E105
                    sudo git pull
                    '''     
                }
                
            }
        }
        stage('Build and Deploy Backend') {
            when {
                changeset "Banchan/**"
            }
            steps {
                script {
                    sh '''
                    cd /home/S11P12E105
                    cd docker-compose
                    sudo docker-compose -f docker-compose-back.yml build --no-cache 
                    sudo docker stop banchan_back1 || true
                    sudo docker stop banchan_back2 || true
                    sudo docker rm banchan_back1 || true
                    sudo docker rm banchan_back2 || true
                    sudo docker image prune -a -f
                    sudo docker-compose -f docker-compose-back.yml up -d
                    '''
                }
            }
        }
        stage('Build and Deploy Frontend') {
            when {
                changeset "BanChan_FE/**"
            }
            steps {
                script {
                    sh '''
                    cd /home/S11P12E105
                    cd docker-compose
                    sudo docker-compose -f docker-compose-front.yml build --no-cache 
                    sudo docker stop banchan_front || true
                    sudo docker rm banchan_front || true
                    sudo docker image prune -a -f
                    sudo docker-compose -f docker-compose-front.yml up -d
                    '''
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
