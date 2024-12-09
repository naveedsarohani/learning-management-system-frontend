import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import AuthenticationProvider from './contexts/Authentication.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HandlerProvider from './contexts/Handler.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <HandlerProvider>
          <App />
          <ToastContainer />
        </HandlerProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </StrictMode>,
);