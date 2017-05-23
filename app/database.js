import firebase from 'firebase';
import regexUtils from './regexUtils';

const config = {
  apiKey: process.env.firebase,
  authDomain: 'pmbot-90414.firebaseapp.com',
  databaseURL: 'https://pmbot-90414.firebaseio.com',
  projectId: 'pmbot-90414',
  storageBucket: 'pmbot-90414.appspot.com',
  messagingSenderId: '477239417201',
};
firebase.initializeApp(config);

const rootRef = firebase.database().ref();
const teamRef = rootRef.child('teams');
const userRef = rootRef.child('users');

const db = {
  initTeam(message) {
    const userIds = regexUtils.userIds(message.text, true);
    teamRef.child(message.channel).update({
      users: userIds,
    });

    const data = {
      team: message.channel,
    };

    Object.values(userIds).forEach((userId) => {
      this.initUser(userId, data);
    });
  },

  initUser(userId, data) {
    userRef.child(userId).update(data);
  },

  getUsersForTeam(teamID) {
    return new Promise((resolve, reject) => {
      teamRef.child(teamID).child('users').once('value').then((snapshot) => {
        if (snapshot.val()) {
          return resolve(snapshot);
        } else {
          return reject(`No value for team/${teamID}/users`);
        }
      });
    });
  },

  saveStandup(message) {},

  getMostRecentStandup(team) {},
};

module.exports = db;
