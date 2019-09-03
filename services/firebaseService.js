import firebase from 'firebase';
import { Notifications } from 'expo';
import uuid from 'uuid';
import config from '../config/config';

class FirebaseService {
  constructor() {
    if(!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        databaseURL: config.databaseURL,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId
      });
    }
  }
  login = async(user, success_callback, failed_callback) => {
    console.log("logging in");
    const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  }
  register = async(user, success_callback, failed_callback) => {
    console.log("registering");
    const output = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(()=>{
      const userf = firebase.auth().currentUser;
      userf.updateProfile({displayName: user.name})
    })
    .then(success_callback, failed_callback);
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        this.login(user);
      } catch ({ message }) {
        console.log("Failed:" + message);
      }
    } else {
      console.log("Reusing auth...");
    }
  };
     
  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get name() {
    return (firebase.auth().currentUser || {}).name;
  }
  get ref() {
    return firebase.database().ref('Messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    if(this.uid !== message.user.id) {
      sendNotificationImmediately = async () => {
        Notifications.presentLocalNotificationAsync({
          title: message.user.email,
          body: message.text,
        }).then((data)=>{
          console.log(data);
        });
        // console.log(notificationId); // can be saved in AsyncStorage or send to server
      };
      
      console.log(message);
    } else {
      console.log('self');
    }
    return message;
  };

  refOn = callback => {
    this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;

