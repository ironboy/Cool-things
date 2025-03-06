import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import betterSqlite from 'better-sqlite3';

// port to start web server on
const PORT = 5001;

// the absolute path to this directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// connect to the database
let dbLivePath = path.join(__dirname, '..', 'db', 'live', 'db.sqlite3');
const db = betterSqlite(dbLivePath);

// start a web server, serving the content of the frontend folder
const app = express();
app.use(express.static('frontend'));
app.listen(PORT, () => console.log(
  `Listening on http://localhost:${PORT}`
));

// we need this middleware in order to read request bodies
app.use(express.json({ limit: '10mb' }));

// serve the products from our SQLite database
app.get('/api/products', (req, res) => {
  res.json(db.prepare('SELECT * FROM products').all());
});

// add a new product (and then serve the products again)
app.post('/api/products', (req, res) => {
  let body = { ...req.body };
  // convert base64 image to buffer/binary
  let imgData = Buffer.from(body.base64image.split('base64')[1], 'base64');
  // delete the base64 image from the body (so that it only contain db fields)
  delete body.base64image;
  // insert into db and get the insert id back
  let insertId = db.prepare(`
    INSERT INTO products(name,description,price$) 
    VALUES(:name,:description,:price$)
  `).run(body).lastInsertRowid;
  // upload image to product images folder
  fs.writeFileSync(
    path.join(__dirname, '..', 'frontend', 'productImages', insertId + '.jpg'),
    imgData
  );
  // return the new list of products
  res.json(db.prepare('SELECT * FROM products').all());
});

// serve the README-file on the path /README.md
app.get('/api/README.md', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'README.md')));

// serve the index.html page on 404:s 
// - so that React / SPA frontend routing works on hard reloads
app.get('*', (req, res) => {
  const indexFile = path.join(__dirname, '..', 'frontend', 'index.html');
  res.sendFile(indexFile);
});