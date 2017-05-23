const WebClient = require('@slack/client').WebClient;

const web = new WebClient(process.env.slack);

// Method that sends a direct message to a userId

const slackUtils = {
  sendDM(userId, message) {
    web.chat.postMessage(userId, message, { as_user: true }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Message sent: ', res);
      }
    });
  },

  sendDMs(userIds, message) {
    Object.values(userIds).forEach((userId) => {
      slackUtils.sendDM(userId, message);
    });
  },
};

export default slackUtils;
