

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

Get your access token, and put it into your **development.env** under SLACK_TOKEN in the backend
```bash
SLACK_TOKEN = xoxp_******
```

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
