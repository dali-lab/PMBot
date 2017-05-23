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
      name: '??',
      users: userIds,
      numUsers: userIds.length,
    });

    const data = {
      name: '??',
      team: message.channel,
    };

    Object.values(userIds).forEach((userId) => {
      this.initUser(userId, data);
    });
  },

  initUser(userId, data) {
    userRef.child(userId).update(data);
  },

  initStandup(teamId) {
    const standupRef = teamRef.child(teamId).child('standups').push();
    return new Promise((resolve, reject) => {
      teamRef
        .child(teamId)
        .child('numUsers')
        .once('value')
        .then((snapshot) => {
          standupRef.update({
            remainingResponses: snapshot.val(),
            responses: null,
          });
        })
        .then(() => {
          return resolve(standupRef);
        });
    });
  },

  getUsersForTeam(teamId) {
    return new Promise((resolve, reject) => {
      teamRef.child(teamId).child('users').once('value').then((snapshot) => {
        if (snapshot.val()) {
          return resolve(snapshot);
        } else {
          return reject(`No value for team/${teamId}/users`);
        }
      });
    });
  },

  saveStandup(message) {},

  getMostRecentStandup(team) {},
};

export default db;
