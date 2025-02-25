const healthRouter = require('express').Router()
const packageJson = require('../package.json')
const mongoose = require('mongoose')

healthRouter.get('/', async (request, response) => {

  try {
    // Check database connection
    await mongoose.connection.db.admin().ping()
    response.status(200).json({
      status: 'OK',
      version: packageJson.version,
      message: 'Server and database are running',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      version: packageJson.version,
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})


module.exports = healthRouter