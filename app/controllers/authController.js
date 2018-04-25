const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        req.flash('error', 'Preencha todos os campos!');
        return res.redirect('back');
      }

      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'Email já cadastrado!');
        return res.redirect('back');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ ...req.body, password: hashedPassword });

      req.flash('success', 'Usuário cadastrado com sucesso!');
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
};
