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
};
