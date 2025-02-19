const healthRouter = require('express').Router()

healthRouter.get('/', async (request, response) => {

  response.send('OK')
})

module.exports = healthRouter