import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCmWJBSMq0WNHm5ZwclsASEAbio_yLTiI4",
    authDomain: "dineinwebapp.firebaseapp.com",
    databaseURL: "https://dineinwebapp.firebaseio.com",
    projectId: "dineinwebapp",
    storageBucket: "dineinwebapp.appspot.com",
    messagingSenderId: "513928158083",
    appId: "1:513928158083:web:e39ddd6a27fc6ea18e74b6",
    measurementId: "G-ZF6RWQPV66"
  };

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

  export default firebase
