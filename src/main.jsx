import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import AuthenticationProvider from "./contexts/Authentication.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HandlerProvider from './contexts/Handler.jsx';
import DeleteContextProvider from './contexts/Delete.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DeleteContextProvider>
        <AuthenticationProvider>
          <HandlerProvider>
            <App />
            <ToastContainer />
          </HandlerProvider>
        </AuthenticationProvider>
      </DeleteContextProvider>
    </BrowserRouter>
  </StrictMode>
)
