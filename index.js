const express = require("express");

const server = express();

server.use(express.json());

const users = ["marcos", "andré", "suarez", "ewbank"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json({
    test: users[index]
  });
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { nome } = req.body;
  const { index } = req.params;

  users[index] = nome;

  return res.json(users);
});

server.del("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send("Usuário deletado");
});

server.listen(3000);
