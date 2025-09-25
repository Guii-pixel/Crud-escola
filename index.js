const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

///Importando rotas
const alunosRouter = require('./routes/alunos');
const professoresRouter = require('./routes/professores');

app.use('/alunos', alunosRouter);
app.use('/professores', professoresRouter);

app.listen(3000, () => {
  console.log('Server rodando em http://localhost:3000');
});
