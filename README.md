# To Do - Documentation
A task management web-application inspired by Microsoft To Do. [Live preview](https://to-do-list-6d4f7.firebaseapp.com/).


## Frameworks
This project was built using React (Create React App) and Firebase. The Firebase services used in this project are Authentication, Firestore, and Hosting.


## Features
* Google Auth
* Sign in/out
* Create lists/categories
* Create tasks within categories that users can check or delete
* Clear all completed tasks


## Project setup

### Dependencies
```
npm install dotenv
npm install firebase
npm install -g firebase-tools
npm install --save react-firebase-hooks
npm install --save react-modal
npm install react-outside-click-handler
npm install react-icons --save
```

### Installation and Firebase setup
* Create a new Firebase project
* Go to Authentication, under *Sign-in providers* enable Google Auth
* Go to *Project Overview* and register a web app
* Activate Firestore
* Fork & clone the repository
* Add Firebase credentials
  * ```npm install dotenv```
  * ```npm install firebase```
  * In the root folder of the respository, create a file called *.env.local*

The .env.local file should have the following:

```
REACT_APP_API_KEY=apiKeyValue
REACT_APP_AUTH_DOMAIN=authDomainValue
REACT_APP_DATABASE_URL=projectIdValue
REACT_APP_PROJECT_ID=storageBucketValue
REACT_APP_STORAGE_BUCKET=messagingSenderIdValue
REACT_APP_MESSAGING_SENDER_ID=appIdValue
```