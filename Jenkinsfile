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

    stage('deploy') {
        sh "cp -R dist/* /home/jenkins/prod/back"
    }
}
