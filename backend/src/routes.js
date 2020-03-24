const express = require('express')
const routes = express.Router()
// controllers
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// session routes
routes.post('/sessions', SessionController.create)
// ong routes
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)
// incident routes
routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)
// profile routes
routes.get('/profile', ProfileController.index)

module.exports = routes
