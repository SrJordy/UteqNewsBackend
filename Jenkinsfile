pipeline {
    agent any
    environment {
        PROD_DATABASE_URL = credentials('PROD_DATABASE_URL')
    }
    stages{
        stage('Checkout'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/SrJordy/UteqNewsBackend.git']])
            }
        }
        stage('Create .env'){
            steps{
                withCredentials([file(credentialsId: 'ENV_FILE', variable: 'ENV_SECRET')]) {
                    sh 'cp $ENV_SECRET .env'
                    // Inyectar URL segura desde Jenkins Credentials
                    sh 'echo "DATABASE_URL=${PROD_DATABASE_URL}" >> .env'
                }
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    sh 'docker stop uteqnews_backend || true'
                    sh 'docker rm uteqnews_backend || true'
                    sh 'docker stop nginx_ssl_uteqnews || true'
                    sh 'docker rm nginx_ssl_uteqnews || true'
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }
    }
}