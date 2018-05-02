const { Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Insira o nome da seção');
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

      section.update({ title: section.title, ...req.body });

      req.flash('success', 'Seção atualizada!');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
