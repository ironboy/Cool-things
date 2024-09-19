This is a boilerplate example of using React with Vite, Sass, Bootstrap, React Bootstrap, React Router and React Easier.

The example shows you a good starting point for using these frameworks/libraries together.

### How to use
* Download.
* Run **npm install** once and then run **npm start** to start the app.
* Create a production version by running **npm run build** and then **npm run backend**.

### Documentation of the individual libraries
Documentation of the individual libraries can be found here:

*   [React](https://react.dev)
*   [Vite](https://vitejs.dev)
*   [Sass](https://sass-lang.com)
*   [Bootstrap](https://getbootstrap.com)
*   [React Bootstrap](https://react-bootstrap.netlify.app)
*   [React Router](https://reactrouter.com)
*   [React Easier](https://react-easier.nodehill.com)

### Look at the code to learn!
Don't forget to [look at the source code](https://github.com/ironboy/Cool-things) of this example (and the [Products](/products) section) - it shows you a lot of basics and nifty tricks when using the libraries together!

### Some other libraries as well...
Although the example mainly focuses on the libraries mentioned above we also use:
* [Node.js](https://nodejs.org) + [Express](https://expressjs.com) to build a small backend.
* [React Markdown](https://github.com/remarkjs/react-markdown/#readme) to convert markdown to html within React.
* A [SQLite](https://www.sqlite.org) database for our products and the [better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md)-driver for Node.js.
* The npm modules [concurrently](https://github.com/open-cli-tools/concurrently#readme) (to start the backend and the Vite dev server in tandem) and [nodemon](https://nodemon.io) (to watch and reload on changes to the backend).

### About the SQLite database
* If no database exists on the path **db/live/db.sqlite3** the backend will copy the database from **db/template/db/db.sqlite3**.
  * *Why?* A sqlite database is stored in ONE file. This file get changed even if you don't write to the database (because of updates on indexes etc that are done automatically). So it's a good idea to store a copy of the database in your git repo, but a bad idea to store the 'running database' in your git repo.
* To view the database from inside VSCode install the VSCode extension [SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer).
* To work with the database in a full graphical user interface use [SQLiteStudio](https://sqlitestudio.pl).