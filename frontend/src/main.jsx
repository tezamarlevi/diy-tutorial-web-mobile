import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </StrictMode>
);
