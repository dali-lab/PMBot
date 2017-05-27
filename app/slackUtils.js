const WebClient = require('@slack/client').WebClient;

const web = new WebClient(process.env.slack);

const MESSAGE_TYPE = {
  DM: 'DM',
  GROUP: 'GROUP',
  CHANNEL: 'CHANNEL',
};

const MESSAGE_TYPE_RAW = {
  D: 'DM',
  G: 'GROUP',
  C: 'CHANNEL',
};

// Method that sends a direct message to a userId

const slackUtils = {
  sendMessage(userId, message) {
    web.chat.postMessage(userId, message, { as_user: true }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Message sent: ', res);
      }
    });
  },

  sendMessages(userIds, message) {
    Object.values(userIds).forEach((userId) => {
      slackUtils.sendMessage(userId, message);
    });
  },

  // the first letter of message.channel tells us the message type, defined in the consts above
  messageType(message) {
    return MESSAGE_TYPE[MESSAGE_TYPE_RAW[message.channel[0]]];
  },

  isFrom(userId, message) {
    return message.user === userId;
  },

  isMention(userId, string) {
    return string.indexOf(`<@${userId}>`) !== -1;
  },
};

export default slackUtils;
export { MESSAGE_TYPE };
