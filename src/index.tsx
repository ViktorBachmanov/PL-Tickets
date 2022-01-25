import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './app/store';
import { Storage } from './constants';


window.addEventListener("beforeunload", () => {
  console.log('beforeunload');
  localStorage.setItem(Storage.LIGHT_STATUS, String(store.getState().theme.lightStatus));
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
