import firebase from 'firebase/app';
import 'firebase/auth';
import  'firebase/database';
import  'firebase/storage';

 let config = {
    apiKey: "AIzaSyBUDO0pwHuIL-32-rZ09ri4DoFPpSMTMG0",
    authDomain: "slack-dd578.firebaseapp.com",
    databaseURL: "https://slack-dd578.firebaseio.com",
    projectId: "slack-dd578",
    storageBucket: "slack-dd578.appspot.com",
    messagingSenderId: "802506568380"
  };
  firebase.initializeApp(config);
  export default firebase;