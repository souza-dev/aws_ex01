/* eslint-disable no-shadow */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());
const _ = require('lodash');

const resultados = {
  pessoas: [{ id: 1, nome: 'Marcelo' }, { id: 2, nome: 'João' }, { id: 3, nome: 'Maria' }],
  carros: [{ id: 1, modelo: 'Fusca' }, { id: 2, modelo: 'Gol' }, { id: 3, modelo: 'Palio' }],
  animais: [{ id: 1, nome: 'Cachorro' }, { id: 2, nome: 'Gato' }, { id: 3, nome: 'Papagaio' }],
};

app.get('/', (_, res) => {
  res.send('Trabalho prático 1 - Implentação de API - PUC MG');
});

// Rotas para recurso pessoas.
app.get('/pessoas', (_, res) => {
  res.json(resultados.pessoas);
});

app.get('/pessoas/:id', (req, res) => {
  const find = resultados.pessoas.find((item) => item.id === parseInt(req.params.id, 10));
  if (find) {
    res.json(find);
  } else {
    res.status(404).json({ error: { message: 'Recurso não encontrado' } });
  }
});

app.post('/pessoas', (req, res) => {
  const obj = req.body;
  if (!obj.id || !obj.nome) {
    res.status(400).json({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
  }
  if (_.some(resultados.pessoas, { id: obj.id })) {
    res.status(409).json({ error: { message: 'Já existe um recurso com o id solicitado' } });
  }
  resultados.pessoas.push(obj);
  res.status(201).json(obj);
});

// Rotas para recurso carros.
app.get('/carros', (_, res) => {
  res.json(resultados.carros);
});

app.get('/carros/:id', (req, res) => {
  const find = resultados.carros.find((item) => item.id === parseInt(req.params.id, 10));
  if (find) {
    res.json(find);
  } else {
    res.status(404).json({ error: { message: 'Recurso não encontrado' } });
  }
});

app.post('/carros', (req, res) => {
  const obj = req.body;
  if (!obj.id || !obj.modelo) {
    res.status(400).json({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
  }
  if (_.some(resultados.carros, { id: obj.id })) {
    res.status(409).json({ error: { message: 'Já existe um recurso com o id solicitado' } });
  }
  resultados.carros.push(obj);
  res.status(201).json(obj);
});

// Rotas para recurso animais.
app.get('/animais', (_, res) => {
  res.json(resultados.animais);
});

app.get('/animais/:id', (req, res) => {
  const find = resultados.animais.find((item) => item.id === parseInt(req.params.id, 10));
  if (find) {
    res.json(find);
  } else {
    res.status(404).json({ error: { message: 'Recurso não encontrado' } });
  }
});

app.post('/animais', (req, res) => {
  const obj = req.body;
  if (!obj.id || !obj.nome) {
    res.status(400).json({ error: { message: 'Os dados enviados malformados ou faltando dados' } });
  }
  if (_.some(resultados.animais, { id: obj.id })) {
    res.status(409).json({ error: { message: 'Já existe um recurso com o id solicitado' } });
  }
  resultados.animais.push(obj);
  res.status(201).json(obj);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, resultados };
