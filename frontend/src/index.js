import React from 'react';
import ReactDOM from 'react-dom/client';
import Directus from './services/directus';
import App from './components/app/App'; 

import './index.css';

const directus = new Directus();

directus.getAllPhotos().then(res => console.log(res));
directus.getPhoto(2).then(res => console.log(res));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

