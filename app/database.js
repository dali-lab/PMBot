import firebase from 'firebase';

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

const db = {
  initTeam(message) {
    const regex = /<@(.*)>/;
    const userIds = message.text
      .split(' ')
      .slice(1) // remove @pmbot
      .map((x) => {
        if (regex.test(x)) {
          return regex.exec(x)[1];
        } else {
          return '';
        }
      })
      .filter((x) => {
        return x !== '';
      });

    teamRef.child(message.channel).update({
      members: Array.from(new Set(userIds)), // removes duplicates
    });
  },

  getMembersForTeam(teamID) {
    return new Promise((resolve, reject) => {
      teamRef.child(teamID).child('members').once('value').then((snapshot) => {
        if (snapshot.val()) {
          return resolve(snapshot);
        } else {
          return reject(`No value for team/${teamID}/members`);
        }
      });
    });
  },

  saveStandup(message) {},

  getMostRecentStandup(team) {},
};

module.exports = db;
