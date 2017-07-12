import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBqxNTm3NLPmDs2rcXEean4sVlaxgV2OoU',
  authDomain: 'health-nlp-88b08.firebaseapp.com',
  databaseURL: 'https://health-nlp-88b08.firebaseio.com',
  projectId: 'health-nlp-88b08',
  storageBucket: 'health-nlp-88b08.appspot.com',
  messagingSenderId: '329948122061'
};

const firebasedb = firebase.initializeApp(config);

export default firebasedb;
