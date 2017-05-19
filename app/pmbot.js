if (!process.env.slack || !process.env.firebase) {
  console.log('Error: Specify slack and firebase token in environment');
  process.exit(1);
}

const RtmClient = require('@slack/client').RtmClient;
const WebClient = require('@slack/client').WebClient;


const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const db = require('./database');

// Return codes
const MESSAGE_TYPE = {
  INIT: 'INIT',
  STANDUP: 'STANDUP',
  NONE: 'NONE',
};

// Commands
const pmInit = 'pm-init';
const pmStandup = 'pm-standup';

// Build web client and rtm client
const web = new WebClient(process.env.slack);
const slack = new RtmClient(process.env.slack);
slack.start();

// Handles any incoming message from slack.
slack.on(RTM_EVENTS.MESSAGE, (message) => {
    // Debug line for us
  console.log('Message:', message);

    // Route message to appropriate handler
    // See types/subtypes: https://api.slack.com/events/message
  switch (message.subtype) {

    // TODO: Gracefully handle message subtypes
    // case '< some subtype >':
    //   handle(message)
    //   break;

    default:
      handleMessage(message);
      break;
  }
});


// Message handlers

// Routes the content of a message
function handleMessage(message) {
  // Check if it's a mention
  const directMention = message.text.indexOf(`<@${slack.activeUserId}>`);
  if (directMention !== -1) {
    console.log(message.user);


    // Check message
    const commandType = checkMessageForCommand(message);

    console.log(commandType);
    switch (commandType) {
      case MESSAGE_TYPE.INIT:
        // TODO: Handle
        break;

      case MESSAGE_TYPE.STANDUP:
        slack.sendMessage('Sending out standup', message.channel);
        sendDirectMessage(message.user, 'It\'s time for your weekly standup!');
      // TODO: This should start a "conversation" instance of some sort
        break;

      default:
        // TODO: Handle
        break;
    }
  }
}


// Utility methods

// Checks for commands in message
function checkMessageForCommand(message) {
  const initCommand = message.text.indexOf(pmInit);
  const standupCommand = message.text.indexOf(pmStandup);

  if (initCommand > -1) {
    return MESSAGE_TYPE.INIT;
  }

  if (standupCommand > -1) {
    return MESSAGE_TYPE.STANDUP;
  }

  return MESSAGE_TYPE.NONE;
}

// Returns tokenized string of message
function tokenizeMessage(message) {
  return message.text.split(' ');
}

// Method that sends a direct message to a userID
function sendDirectMessage(userID, message) {
  web.chat.postMessage(userID, message, { as_user: true }, (err, res) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
    }
  });
}
