const express = require('express');
const app = express();
const path = require('path');
const pool = require(path.join(__dirname, 'db', 'conexao')); // <-- importa o pool

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//ler dados enviados por POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Pagina inicial com o formulário
app.get('/', (req, res) => {
  res.render('formulario', {dados: {}});
});

// Rota para processar o formulário
app.post('/formulario', async (req, res,next) => {
  try {
    const dados = req.body;
      const sql = `
      INSERT INTO usuarios
        (nome, email, telefone, sexo, data_nasc, cidade, estado, endereco)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const params = [
      dados.nome,
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
    res.redirect(`/sucesso?${queryString}`);

  } catch (err) {
    next(err);
  }
});

// Rota de sucesso
app.get('/sucesso', (req, res) => {
  let dados = req.query;
  console.log('req.query:', dados);
  console.log('req.body', req.body);
  res.render('sucesso', {dados});
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
console.log('Conexao realizada com sucesso');

//evitar usuario ver erros
// Middleware para capturar erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack); // aparece só no terminal

  // Renderiza uma página EJS de erro
  res.status(500).render('erro', {
    mensagem: 'Algo deu errado ao processar sua requisição 😢',
  });
});
