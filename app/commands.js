const COMMANDS = ['init', 'standup'];

const COMMAND_TYPE = {
  INIT: 'INIT',
  STANDUP: 'STANDUP',
  NONE: 'NONE',
};

const commands = {
  getCommand(str) {
    let cmd = COMMAND_TYPE.NONE;
    Object.values(COMMANDS).forEach((command) => {
      if (str.indexOf(command) !== -1) {
        cmd = COMMAND_TYPE[command.toUpperCase()];
      }
    });

    return cmd;
  },
};

export { commands, COMMAND_TYPE };
