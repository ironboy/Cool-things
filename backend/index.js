import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import betterSqlite from 'better-sqlite3';

// if we are in developer mode
const devMode = process.argv[2] === 'dev';

// port to start web server on
const PORT = 3952;

// the absolute path to this directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))

let dbLivePath = path.join(__dirname, '..', 'db', 'live', 'db.sqlite3');

// connect to the database
const db = betterSqlite(dbLivePath);

// start a web server, serving the content of the dist folder
const app = express();

// simulate Apache/PHP behavior of running php files when you goto their url
// but for JS-files (and only within the productImages folder)
app.use(async (req, res, next) => {
  let a = path.join(__dirname, '..', 'dist', req.url);
  if (a.endsWith('.js') && a.includes('productImages') && fs.existsSync(a)) {
    let oldLog = console.log;
    let output = [];
    console.log = (...args) => output.push(args);
    await import(a + '?nocache=' + Math.random());
    console.log = oldLog;
    res.send(output.flat().join(''));
    return;
  }
  next();
});


app.use(express.static('dist'));

app.listen(PORT, () => console.log(
  devMode ? `Backend listening on port ${PORT}` :
    `Backend listening on http://localhost:${PORT}`
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
    INSERT INTO products(name,description,price$,imageSource) 
    VALUES(:name,:description,:price$,:imageName)
  `).run(body).lastInsertRowid;
  // if the dist folder exists, write the image there too
  fs.writeFileSync(
    path.join(__dirname, '..', 'dist', 'productImages', req.body.imageName),
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
  const indexFile = path.join(__dirname, '..', 'dist', 'index.html');
  fs.existsSync(indexFile) ? res.sendFile(indexFile) : res.json('No dist folder');
});