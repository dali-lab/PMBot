if (!process.env.slack || !process.env.firebase) {
  console.log('Error: Specify slack and firebase token in environment');
  process.exit(1);
}

const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const db = require('./database');

// Build client
const slack = new RtmClient(process.env.slack);
slack.start();

// Handles any incoming message from slack.
slack.on(RTM_EVENTS.MESSAGE, (message) => {
    // Debug line for us
  console.log('Message:', message);

    // Route message to appropriate handler
    // See types/subtypes: https://api.slack.com/events/message
  switch (message.subtype) {
    case 'bot_message':
      handleBot(message);
      break;

    case 'file_share':
      handleFile(message);
      break;

    default:
      handleMessage(message);
      break;
  }
});


// Message handlers
function handleBot(message) {
  slack.sendMessage('Commit logged!', message.channel);
  db.saveCommit(message);
}

function handleFile(message) {
  slack.sendMessage('I\'m going to put those files somewhere', message.channel);

  if (message.file.filetype === 'space') {
    console.log('saving slack post');
    db.savePost(message);
  } else if (message.file.filetype === 'jpg' || message.file.filetype === 'png') {
    console.log('saving jpg/png');
    db.saveImage(message);
  } else {
        // db.saveGeneral(message);
    console.log('unrecognized file type');
  }
}

function handleMessage(message) {
  const directMention = message.text.indexOf(`<@${slack.activeUserId}>`);
  if (directMention !== -1) {
    slack.sendMessage('You mentioned me!', message.channel);
    handleCommand(message, directMention);
  }
}

function handleCommand(message, index) {
  const offset = (`<@${slack.activeUserId}>`).length;
  const command = message.text.substring(index + offset);
  slack.sendMessage(`Command arguments: ${command.trim().split(' ')}`, message.channel);
}
