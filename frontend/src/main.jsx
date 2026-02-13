import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';

// Initialize Google Analytics (only if measurement ID is set)
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) ReactGA.initialize(gaId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
