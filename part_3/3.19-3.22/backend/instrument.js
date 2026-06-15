// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: 'https://21aa45532c18b83a057b634c7490f366@o4511534449491968.ingest.de.sentry.io/4511535076999248',
  // To disable sending user data, uncomment the line below. For more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
  // dataCollection: { userInfo: false },
})