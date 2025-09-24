const express = require('express');
const router = express.Router();

// Array inicial com 2 professores de exemplo
let professores = [
  {
    id: 1,
    nome: "Ana Paula",
    email: "ana.paula@escola.com",
    cpf: "22233344455",
    curso: "Engenharia de Software",
    disciplina: "Banco de Dados"
  },
  {
    id: 2,
    nome: "Ricardo Lima",
    email: "ricardo.lima@escola.com",
    cpf: "66677788899",
    curso: "Ciência da Computação",
    disciplina: "Algoritmos"
  }
];

let nextId = 3;

// GET /professores - Listar todos os professores
router.get('/', (req, res) => {
  res.json(professores);
});

// GET /professores/:id - Buscar professor por ID
router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado" });
  }
  res.json(professor);
});

// POST /professores - Criar novo professor
router.post('/', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;

  // Validações básicas
  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (professores.some(p => p.cpf === cpf)) {
    return res.status(400).json({ error: "CPF já cadastrado" });
  }

  const novoProfessor = {
    id: nextId++,
    nome,
    email,
    cpf,
    curso,
    disciplina
  };

  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

// PUT /professores/:id - Atualizar professor
router.put('/:id', (req, res) => {
  const professor = professores.find(p => p.id === parseInt(req.params.id));
  if (!professor) {
    return res.status(404).json({ error: "Professor não encontrado" });
  }

  const { nome, email, cpf, curso, disciplina } = req.body;

  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  professor.nome = nome;
  professor.email = email;
  professor.cpf = cpf;
  professor.curso = curso;
  professor.disciplina = disciplina;

  res.json(professor);
});

// DELETE /professores/:id - Deletar professor
router.delete('/:id', (req, res) => {
  const index = professores.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Professor não encontrado" });
  }

  const deletado = professores.splice(index, 1);
  res.json({ message: "Professor deletado com sucesso", professor: deletado[0] });
});

module.exports = router;
