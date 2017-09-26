import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div id="root">
  <App /></div>,
  document.querySelector('body')
);

registerServiceWorker();
