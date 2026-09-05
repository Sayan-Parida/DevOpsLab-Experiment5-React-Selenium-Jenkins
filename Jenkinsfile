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

                    powershell -NoProfile -Command "$env:BROWSER='none'; $p = Start-Process 'C:\\Program Files\\nodejs\\npm.cmd' -ArgumentList 'start' -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru; Write-Host ('React process started with PID ' + $p.Id); Start-Sleep -Seconds 20"

                    echo React application startup wait completed.
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