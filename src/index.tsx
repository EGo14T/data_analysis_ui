import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from './routes/main';
import './index.css'
import { Provider } from 'mobx-react';
import allStores from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider {...allStores}>
      <Router>
        <MainRoute />
      </Router>
    </Provider>
  </React.StrictMode>
);
