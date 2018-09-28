# ai-maker-api-tester

Sample application with Nuxt + Firebase (Authentication + Cloud Functions) + [AI Maker](https://aimaker.io) API

## Setup

### Install dependencies

```bash
yarn
```

### Create AI Maker Account

Login to AI Maker and get apikey.

### Initialize Firebase

Create Firebase project at [Firebase Console](https://console.firebase.google.com).

#### Setup environment variables

Copy `env.sample.js` to `env.development.js` and `env.production.js` and fill these environment variables.

#### Initialize Firebase Authentication

Enable Twitter authentication.

#### Initialize Cloud Functions

Enable Cloud Functions.

Initialize Cloud Functions for JavaScript.

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

Set config variables.

```bash
firebase functions:config:set cors.origin=http://localhost:3000
firebase functions:config:set ai_maker.apikey=apikeygotfromaimaker
```

And deploy functions.

```bash
firebase deploy --only functions
```

### serve with hot reload at localhost:3000

```bash
yarn run dev
```

## Deploy to Now

```bash
now
```

Update cors.origin and deploy functions.

## build for production and launch server

```bash
yarn run build
yarn start
```

## AI Data

AI List is defined in data/ai.js. If you want to add, just add to list.

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
