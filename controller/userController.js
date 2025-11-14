exports.getSistema = (req, res) => {
  if (!req.session.user) {
    req.session.mensagem = 'Por favor, faça login para acessar o sistema.';
    return res.redirect('/auth/login');
  }

  let logadoUser = req.session.user;  
  res.render('sistema', { user: logadoUser });
}
