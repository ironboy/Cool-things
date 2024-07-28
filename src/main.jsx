// main imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../sass/main.scss';
import * as ReactBootstrap from 'react-bootstrap';
import * as Router from 'react-router-dom';
import * as Easier from 'react-easier';
import Markdown from 'react-markdown';
import routes from './utils/routes';
import numTo$ from './utils/numberTo$';
import { useEffect } from 'react';
import fileToBase64 from "./utils/fileToBase64";
import App from './App';

// set a title
document.title = "React Boilerplate";

// make some common components and hooks global
Object.assign(globalThis,
  ReactBootstrap, Router, Easier, {
  routes, Markdown, numTo$, useEffect, fileToBase64
});

// create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  }
]);

// create the React root element
ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
