const { Project, Section } = require('../models');

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

  async show(req, res, next) {
    try {
      const project = await Project.findAll({
        include: [Section],
        where: { UserId: req.session.user.id },
      });

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      const { user } = req.session;

      return res.render('projects/show', { user, project, sections });
    } catch (err) {
      return next(err);
    }
  },
};
