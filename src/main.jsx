import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(
  (() => {
    // Keep our UI isolated from Grok by rendering into a detached div we inject ourselves.
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
