Circle CI Status

[![CircleCI](https://circleci.com/gh/endurance/slack-integration-test/tree/master.svg?style=svg)](https://circleci.com/gh/endurance/slack-integration-test/tree/master)

## General Environment Setup
Setup your database. Docker/Docker-Compose must be installed.

```bash
cd workos-backend
npm run db:restart
npm run db:migrate
```

Setup your environment. 

In both directories, run 
```bash
npm install
```

## Workos-Backend
### Setup Slack Token Configuration
Obtain the Slack Access Token.

Create a new file named **development.env.local**

Apply the token as follows below. 
```bash
SLACK_TOKEN = xoxp_******
```

### Running the Development Environments
Run the back end. This will run in watch mode by default.
```bash
cd workos-backend
npm start
```

Run the front end. This will be in watch mode by default.
```bash
cd workos-client
npm start
```
