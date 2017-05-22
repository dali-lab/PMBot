# PM Slack bot
[![Build Status](https://travis-ci.org/tburnam/PMBot.svg?branch=master)](https://travis-ci.org/tburnam/PMBot)

## Usage
```bash
cd PMBot
npm install
firebase=<firebase token> slack=<slack token> npm start
```

Join `#<some Slack channel at DALI>` to get access tokens for test development.


## Testing
```bash
cd PMBot
npm test
```

## Database
### Current/MVP
```
teams
  <team_name>
    channel_id – id
    members
      <member_id> – members/<id>
    standups
      date – int
      messages
        <message> – string

members
  <id> – int
  <name> – string
  <team> – teams/<team_name>
```

### Eventually
```
support multiple teams (team -> current_standup_team)
flatten standups
pretty print team name (not just channel name)
```


Built off of work done in [Timeline](https://github.com/dali-lab/timeline-backend).
