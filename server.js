const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//ler dados enviados por POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da sessão
const session = require('express-session');
app.use(session({
  secret: 'meusegredosecreto', // usa uma string qualquer pra "assinar" o cookie
  resave: false,               // não salva se nada mudou
  saveUninitialized: true,     // cria sessão mesmo que vazia
}));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require(path.join(__dirname, 'routes', 'userRoutes'));
const authRoutes = require(path.join(__dirname, 'routes', 'authRoutes'));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

// trata erro do servidor
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack); 

  // Renderiza uma página EJS de erro
  res.status(500).render('erro', {
    mensagem: 'Algo deu errado ao processar sua requisição 😢',
  });
});