const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router({
  todos: [{ id: 'todo-0', title: 'First todo', description: 'Description', isCompleted: false }]
});

server.use(middlewares);
server.use((req, res, next) => {
  const delay = Math.random() * 1000;
  setTimeout(next, delay);
});
server.use(router);

server.listen(3001, () => {
  console.log('JSON server running at port http://localhost:3001');
});
