import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Peter', age: 30 },
  { id: 3, name: 'Mary', age: 40 },
  { id: 4, name: 'Mike', age: 50 },
  { id: 5, name: 'Adam', age: 60 },
  { id: 6, name: 'Julie', age: 70 },
  { id: 7, name: 'Juliette', age: 80 },
  { id: 8, name: 'Mauro', age: 90 },
  { id: 9, name: 'Cabrine', age: 100 },
  { id: 10, name: 'Fofão', age: 110 },
];

app.use(express.json()); // for parsing application/json

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Criando uma rota para o endpoint /
app.get('/', (req, res) => {
  return res.send('<h1>Trabalhando com servidor Express</h1>');
});

// Criando uma rota para o endpoint /users
app.get('/users', (req, res) => {
  return res.send(users);
});

// Criando uma rota para o endpoint /users/:id
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find(user => user.id === Number(userId));
  // const user = users.find(user => user.id == userId); // outra forma de fazer o find
  return res.send(user);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  // Não é legal fazer isso na mãoa
  // Melhor baixar "http-status-code"
  return res.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updateUser = req.body;
  console.log(updateUser);

  users = users.map(user => {
    return userId == user.id ? updateUser : user;
  });
  console.log(users);
  return res.send(updateUser);
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  users = users.filter(user => user.id != userId);

  return res.status(StatusCodes.NO_CONTENT).send();
});
