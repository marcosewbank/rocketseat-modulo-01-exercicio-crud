const express = require("express");

const server = express();

server.use(express.json());

const users = ["marcos", "andré", "suarez", "ewbank"];

server.use((req, res, next) => {
  console.log(`Método, ${req.method}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.user) {
    return res.status(400).json({ error: "Username is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }

  return next();
}

server.get("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;

  return res.json({
    test: users[index]
  });
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUserExists, (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { nome } = req.body;
  const { index } = req.params;

  users[index] = nome;

  return res.json(users);
});

server.del("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send("Usuário deletado");
});

server.listen(3000);
