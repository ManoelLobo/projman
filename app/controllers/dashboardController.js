const { Project } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const { user } = req.session;
      const projects = await Project.findAll({ where: { UserId: user.id } });
      return res.render('dashboard/index', { user, projects });
    } catch (err) {
      return next(err);
    }
  },
};
