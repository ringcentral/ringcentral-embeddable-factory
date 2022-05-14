
# ringcentral-embeddable-factory [experimental]

A online tool to generate customized [ringcentral-embeddable](https://github.com/ringcentral/ringcentral-embeddable) resources.

## Preview video

https://youtu.be/01xJs8cv3Oo

## Use

todo

## DEV

Let's start it.

```bash

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

then start the test server

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER

# run local dynamo db, optional
npm run dynamo

# run local dev server
npm start

# run client
npm run c

# then visit https://xxxx.ap.ngrok.io
```

## Deploy to AWS Lambda

```bash
cp deploy/env.sample.yml deploy/env.yml
cp deploy/serverless.sample.yml deploy/serverless.yml

# then edit deploy/env.yml and deploy/serverless.yml

# deploy
npm run deploy
```

## todos

- [ ] Style link/inline support
- [ ] Third party features support
- [ ] Custom script support

## License

MIT

## RingCentral Labs

RingCentral Labs is a program that lets RingCentral engineers, platform product managers and other employees share RingCentral apps they've created with the customer community. RingCentral Labs apps are free to use, but are not official products, and should be considered community projects - these apps are not officially tested or documented. For help on any RingCentral Labs app please consult each project's GitHub Issues message boards - RingCentral support is not available for these applications.
