// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.urlencoded({ extended: true })); // Для обробки POST запитів


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Підключення до бази даних SQLite
let db = new sqlite3.Database('C:\\users\\olegk\\desktop\\SQLite\\burger.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Підключено до бази даних burger.db');
  }
});

// Маршрут для обробки POST запиту з форми
app.post('/submit-order', (req, res) => {
  const name = req.body.uname;
  const phone = req.body.phone;
  
  const sql = `INSERT INTO orders (name, phone_number) VALUES (?, ?)`;
  
  db.run(sql, [name, phone], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Рядок було додано до таблиці orders`);
  });

  res.redirect('/');
});

app.post('/submit-data', (req, res) => {
  const name = req.body.uname;
  const phone = req.body.phone;
  const email = req.body.mail;
  
  const sql = `INSERT INTO career (name, phone_number, email) VALUES (?, ?, ?)`;
  
  db.run(sql, [name, phone, email], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Рядок було додано до таблиці orders`);
  });

  res.redirect('/');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущено на порту 3000');
});
