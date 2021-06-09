pipeline {

    agent any
    triggers {
        githubPush()
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Deploying...'
                sh 'ssh root@165.22.19.212 "cd /home/talent-match/auth-service/ && git pull && npm install && npm run build && pm2 reload app"'
                echo 'Access GRANTED and Deploy completed'
            }
        }
    }
}
