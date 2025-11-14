const path = require('path');
const pool = require(path.join(__dirname, '..', 'db', 'conexao')); // <-- importa o pool

//renderiza formulario na pagina inicial
exports.getFormulario = (req, res) => {
  res.render('formulario', {dados: {}});
}

//trata post do formulario
exports.postFormulario =  async (req, res, next) => {
  try {
    const dados = req.body;
      const sql = `
      INSERT INTO usuarios
        (nome, senha, email, telefone, sexo, data_nasc, cidade, estado, endereco)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const params = [
      dados.nome,
      dados.senha,
      dados.email,
      dados.tel,
      dados.genero,
      dados.data_nasc,
      dados.cidade,
      dados.estado,
      dados.endereco
    ];
      await pool.execute(sql, params);

    const queryString = new URLSearchParams(req.body).toString();
    res.redirect(`/user/sistema?${queryString}`);

  } catch (err) {
    next(err);
  }
}

//carrega pagina login
exports.getLogin = (req, res) => {
  mensagem = req.session.mensagem;
  user = req.session.user;
  req.session.mensagem = null; // Limpa a mensagem após exibi-la
  req.session.user = null;
  res.render('login', {mensagem: mensagem, user: user});
}

//trata login
exports.postLogin = async (req, res) => {
    const dados = req.body;
    const email = dados.email;
    const senha = dados.senha;

    sql = `select * from usuarios where email = ? and senha = ?`;
    const params = [email, senha];
    const [rows] = await pool.execute(sql, params);

    if (rows.length > 0) {
        req.session.mensagem = 'Login realizado com sucesso!';
        req.session.user = email;
        return res.redirect('/user/sistema');
    }

    req.session.mensagem = 'Email ou senha inválidos.';
    delete req.session.user;
    res.redirect('/auth/login');

    console.log(rows);
}

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {  
          console.log('Erro ao destruir a sessão:', err);
      } 
      res.redirect('/auth/login');
  });
}

//carrega pagina home
exports.getHome = (req, res) => {
    mensagem = req.session.mensagem;
    req.session.mensagem = null; // Limpa a mensagem após exibi-lau
    user = req.session.user;

    res.render('home', {mensagem: mensagem, user: user});
}