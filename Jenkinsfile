pipeline {
    agent any

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    @echo off
                    echo Installing Node.js dependencies...
                    "C:\\Program Files\\nodejs\\npm.cmd" ci
                '''
            }
        }

        stage('Start React Application') {
            steps {
                bat '''
                    @echo off
                    echo Starting React application...
                    start "ReactApp" /B cmd /c "set BROWSER=none&&npm start > react.log 2>&1"
                    echo Waiting for React application to start...
                    timeout /t 20 /nobreak >nul
                '''
            }
        }

        stage('Execute Selenium Tests') {
            steps {
                bat '''
                    @echo off
                    if not exist reports mkdir reports
                    echo Running Selenium UI tests...
                    "C:\\Program Files\\nodejs\\npx.cmd" mocha tests/test.js --reporter xunit --reporter-option "output=reports/test-results.xml"
                '''
            }
        }
    }

    post {
        always {
            junit testResults: 'reports/test-results.xml',
                  allowEmptyResults: true
        }
    }
}