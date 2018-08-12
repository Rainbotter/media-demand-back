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
        timeout(time: 1, unit: 'HOURS') {
            input 'Deploy to Production?'
        }
    }

    stage('deploy') {
        sh "cp -R node_modules /home/jenkins/prod/back/"
        sh "cp app.js /home/jenkins/prod/back/"
        sh "cp app /home/jenkins/prod/back/"
        sh "cp -R docker /home/jenkins/prod/back/"
    }
}
