import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { GlobalStateProvider } from './Components/GlobalStateContext/GlobalStateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App/>
    </GlobalStateProvider>
  </React.StrictMode>
);
