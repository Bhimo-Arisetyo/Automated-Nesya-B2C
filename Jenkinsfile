pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.45.1'
      args '-u root:root'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
          npx playwright install chrome
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --trace on
        '''
      }
    }
  }
}