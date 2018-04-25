const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');

/**
 * Auth
 */
routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

module.exports = routes;
