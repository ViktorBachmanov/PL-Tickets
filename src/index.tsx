import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './app/store';
import { Storage } from './constants';


window.addEventListener("beforeunload", () => {
  localStorage.setItem(Storage.THEME_DATA, JSON.stringify(store.getState().theme));

  sessionStorage.setItem(Storage.USER_DATA, JSON.stringify(store.getState().user));
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
