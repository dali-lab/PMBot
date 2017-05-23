import db from './database';
import slackUtils from './slackUtils';

const standup = {
  startStandup(message) {
    db
      .initStandup(message.channel)
      .then(() => {
        return db.getUsersForTeam(message.channel);
      })
      .then((snapshot) => {
        slackUtils.sendDMs(
          snapshot.val(),
          'It\'s time for your weekly standup!',
        );
      })
      .catch((err) => {
        console.log(`startStandup Error: ${err}`);
      });
  },
};

export default standup;
