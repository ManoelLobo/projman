const { Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const project = await Project.create({ ...req.body, UserId: req.session.user.id });

      req.flash('success', 'Projeto criado com sucesso!');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
