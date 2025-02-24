const healthRouter = require('express').Router()
const packageJson = require('../../package.json')

// eslint-disable-next-line no-unused-vars
healthRouter.get('/', async (request, response) => {

  response.json({
    status: 'OK',
    version: packageJson.version,
    timestamp: new Date().toISOString()
  })
})

module.exports = healthRouter