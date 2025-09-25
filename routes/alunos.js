const express = require('express');
const router = express.Router();

// Array inicial com 2 alunos exemplo
let alunos = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria@email.com",
    cpf: "12345678901",
    telefone: "11987654321",
    dataNascimento: "2000-05-15"
  },
  {
    id: 2,
    nome: "João Souza",
    email: "joao@email.com",
    cpf: "98765432100",
    telefone: "11912345678",
    dataNascimento: "1999-11-30"
  }
];

let nextId = 3;

// GET /alunos - Listar todos os alunos
router.get('/', (req, res) => {
  res.json(alunos);
});

// GET /alunos/:id - Buscar aluno por ID
router.get('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }
  res.json(aluno);
});

// POST /alunos - Criar novo aluno
router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;

  // Validações básicas
  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (alunos.some(a => a.cpf === cpf)) {
    return res.status(400).json({ error: "CPF já cadastrado" });
  }

  const novoAluno = {
    id: nextId++,
    nome,
    email,
    cpf,
    telefone,
    dataNascimento
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// PUT /alunos/:id - Atualizar aluno
router.put('/:id', (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  const { nome, email, cpf, telefone, dataNascimento } = req.body;

  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  aluno.nome = nome;
  aluno.email = email;
  aluno.cpf = cpf;
  aluno.telefone = telefone;
  aluno.dataNascimento = dataNascimento;

  res.json(aluno);
});

// DELETE /alunos/:id - Deletar aluno
router.delete('/:id', (req, res) => {
  const index = alunos.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Aluno não encontrado" });
  }

  const deletado = alunos.splice(index, 1);
  res.json({ message: "Aluno deletado com sucesso", aluno: deletado[0] });
});

module.exports = router;
