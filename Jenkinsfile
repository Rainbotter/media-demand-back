node {
    stage('check tools') {
        sh "node -v"
        sh "npm -v"
    }

    stage('checkout') {
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('Deploy to production ?') {
        timeout(time: 5, unit: 'MINUTES') {
            input 'Deploy to Production?'
        }
    }

    stage('deploy') {
        sh "echo deploy application package"
        sh "cp -R node_modules /home/jenkins/prod/back/"
        sh "cp app.js /home/jenkins/prod/back/"
        sh "cp -R app /home/jenkins/prod/back/"
        sh "cp -R docker /home/jenkins/prod/back/"
        sh "echo Restarting node"
        sh "pm2 restart app"
    }
}
