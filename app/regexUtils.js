const regexUtils = {
  userIds(text, unique = false) {
    const regex = /<@(.*)>/;

    const userIds = text
      .split(' ')
      .slice(1) // remove @pmbot
      .map((x) => {
        if (regex.test(x)) {
          return regex.exec(x)[1];
        } else {
          return '';
        }
      })
      .filter((x) => {
        return x !== '';
      });

    if (unique) {
      return Array.from(new Set(userIds));
    } else {
      return userIds;
    }
  },
};

export default regexUtils;
