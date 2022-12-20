const express = require('express')
const api = express.Router()

const planetsRouter = require('./planets/planets.router')
const launchesRouter = require('./launches/launches.router')


api.use('/launches',launchesRouter)
api.use('/planets',planetsRouter)

module.exports = api