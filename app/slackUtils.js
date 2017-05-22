const WebClient = require('@slack/client').WebClient;

const web = new WebClient(process.env.slack);

// Method that sends a direct message to a userID

const slackUtils = {
  sendDirectMessage(userID, message) {
    web.chat.postMessage(userID, message, { as_user: true }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Message sent: ', res);
      }
    });
  },
};

export default slackUtils;
