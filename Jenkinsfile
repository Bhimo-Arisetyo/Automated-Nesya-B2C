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
    stage('install Dotenv') {
      steps {
        sh '''
          npm install dotenv
        '''
      }
    }
    stage('install faker') {
      steps {
        sh '''
          npm install --save-dev @faker-js/faker   
        '''
      }
    stage('test') {
      steps {
        sh '''
        NODE_ENV=dev  npx playwright test --trace on
        '''
      }
    }
  }
}