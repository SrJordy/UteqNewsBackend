pipeline {
    agent any
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
                }
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }
    }
}