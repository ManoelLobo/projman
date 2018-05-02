const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Insira o nome da seção');
        return res.redirect('back');
      }

      const project = await Project.findOne({
        where: { id: req.params.projectId, UserId: req.session.user.id },
      });

      if (!project) {
        req.flash('error', 'Acesso negado');
        return res.redirect('back');
      }

      const section = await Section.create({
        ...req.body,
        content: '',
        ProjectId: req.params.projectId,
      });

      req.flash('success', 'Seção criada com sucesso!');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.sectionId);

      const project = await Project.findOne({
        where: { id: section.ProjectId, UserId: req.session.user.id },
      });

      if (!project) {
        req.flash('error', 'Acesso negado');
        return res.redirect('back');
      }

      section.update({ title: section.title, ...req.body });

      req.flash('success', 'Seção atualizada!');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const section = await Section.findOne({
        where: { id: req.params.sectionId },
        include: [{ model: Project, where: { UserId: req.session.user.id } }],
      });

      await section.destroy();

      req.flash('success', 'Seção removida!');

      return res.redirect(`/app/projects/${req.params.projectId}/`);
    } catch (err) {
      return next(err);
    }
  },
};
