const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url); // /hello
  console.log(req.method); // GET
  console.log(req.headers); // здесь будут заголовки запроса
  console.log(req.body); // а здесь тело запроса, но у GET запроса его нет

  res.statusCode = 200; // статус ответа
  res.statusMessage = 'OK'; // сообщение ответа
  res.setHeader('Content-Type', 'text/plain'); // добавить ответу заголовок

  res.write('Hello, '); // отправить часть ответа — строку "Hello, "
  res.write('world!'); // отправить часть ответа — строку "world!"

  res.end(); // закончить отправку ответа
});

server.listen(3009);
