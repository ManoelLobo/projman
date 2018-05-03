const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Insira o nome do projeto');
        return res.redirect('back');
      }

      const project = await Project.create({ ...req.body, UserId: req.session.user.id });

      req.flash('success', 'Projeto criado com sucesso!');

      return res.redirect(`/app/projects/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { user } = req.session;
      const { projectId, sectionId } = req.params;

      const project = await Project.findOne({
        where: { id: projectId, UserId: user.id },
      });

      if (!project) {
        req.flash('error', 'Acesso negado');
        return res.redirect('back');
      }

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });

      let activeSection;

      if (sectionId) {
        activeSection = await Section.findOne({ where: { id: sectionId, ProjectId: projectId } });
      }

      return res.render('projects/show', {
        user,
        project,
        sections,
        activeSection,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const project = await Project.findOne({
        where: { id: req.params.projectId, UserId: req.session.user.id },
      });

      await project.destroy();

      req.flash('success', 'Projeto removido!');

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
