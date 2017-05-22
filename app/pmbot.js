import db from './database';
import standup from './standup';
import { commands, COMMAND_TYPE } from './commands';

if (!process.env.slack || !process.env.firebase) {
  console.log('Error: Specify slack and firebase token in environment');
  process.exit(1);
}

const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Build web client and rtm client
// TODO abstract slack stuff to slackUtils
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
  if (isDirectMessage(slack.activeUserId, message.text)) {
    // Check message
    switch (commands.getCommand(message.text)) {
      case COMMAND_TYPE.INIT:
        db.initTeam(message);
        break;

      case COMMAND_TYPE.STANDUP:
        standup.processStandupMessage(message);
        slack.sendMessage('Sending out standup', message.channel);
        break;

      default:
        // TODO: Handle
        break;
    }
  } else {
    console.log('not dm');
  }
}

// Utility methods

function isDirectMessage(userID, string) {
  return string.indexOf(`<@${slack.activeUserId}>`) !== -1;
}
