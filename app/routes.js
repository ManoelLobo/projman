const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

/**
 * Flash messages middleware
 */
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');

  next();
});

/**
 * Auth
 */
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/app', authMiddleware);

routes.get('/app/dashboard', dashboardController.index);

/**
 * Projects
 */
routes.get('/app/projects/:projectId', projectController.show);
routes.get('/app/projects/:projectId/sections/:sectionId', projectController.show);
routes.post('/app/projects/create', projectController.store);
routes.delete('/app/projects/:projectId', projectController.destroy);

/**
 * Sections
 */
routes.post('/app/projects/:projectId/sections/create', sectionController.store);
routes.put('/app/projects/:projectId/sections/:sectionId', sectionController.update);
routes.delete('/app/projects/:projectId/sections/:sectionId', sectionController.destroy);

/**
 * Error handling
 */
routes.use((req, res) => {
  res.render('errors/404');
});

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
