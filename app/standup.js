import db from './database';
import slackUtils from './slackUtils';

const standup = {
  startStandup(message) {
    db
      .initStandup(message.channel)
      .then(() => {
        return db.getUsersForTeam(message.channel);
      })
      .then((userIds) => {
        slackUtils.sendMessages(userIds, 'It\'s time for your weekly standup!');
      })
      .catch((err) => {
        console.log(`startStandup Error: ${err}`);
      });
  },

  // TODO do something with remainingResponses
  recieveStandup(message) {
    db
      .getTeamForUser(message.user)
      .then((teamId) => {
        return db.getMostRecentStandup(teamId);
      })
      .then((standupId) => {
        return db.saveStandupMessage(standupId, message);
      })
      .catch((err) => {
        console.log(`recieveStandup Error: ${err}`);
      });
  },
};

export default standup;
