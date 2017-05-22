import slackUtils from './slackUtils';

const standup = {
  processStandupMessage(message) {
    slackUtils.sendDirectMessage(
      message.user,
      'It\'s time for your weekly standup!',
    );
  },
};

export default standup;
