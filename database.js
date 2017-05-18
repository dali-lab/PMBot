const firebase = require('firebase');

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
const postRef = rootRef.child('post');
const imageRef = rootRef.child('image');
const commitRef = rootRef.child('commit');
const generalRef = rootRef.child('general');


const db = {
  savePost(message) {
    postRef.push().set({
      ts: message.ts,
      author: message.username,
      title: message.file.title,
      link: message.file.permalink,
    });
  },

  saveImage(message) {
    imageRef.push().set({
      ts: message.ts,
      author: message.username,
      title: message.file.title,
      link: message.file.url_private,
    });
  },

  saveGeneral(message) {
    generalRef.push().set({
      ts: message.ts,
      author: message.username,
      title: message.file.title,
      link: message.file.permalink,
      type: message.file.mimetype,
    });
  },

  saveCommit(message) {
    const authorRegex = '> by ([a-zA-Z]*)';
    const urlRegex = '<(.*?)\\|';
    const commitMsgRegex = '` (.*?) -';

    const commits = message.attachments[0].text.split('\n');
    for (let i = 0; i < commits.length; i++) {
      commitRef.push().set({
        ts: message.ts,
        author: message.attachments[0].fallback.match(authorRegex)[1],
        link: commits[i].match(urlRegex)[1],
        message: commits[i].match(commitMsgRegex)[1],
      });
    }
  },
};

module.exports = db;
