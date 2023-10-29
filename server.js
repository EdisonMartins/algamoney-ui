// Importa módulo express.
console.log("Iniciando servidor!")
const porta = 8000;
const express = require('express');
// Obtém o objeto que representa o servidor web.
const app = express();
const projectName = 'algamoney-ui'
// Serve os arquivos estáticos da pasta dist.
app.use(express.static(__dirname + '/dist/'));

// Define a rota para index.html
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Define a porta
app.listen(porta);
console.log("Servidor front-end iniciado na porta " + porta + "!");

// Execute o comando
// node server.js
