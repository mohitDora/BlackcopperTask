import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import ContextApi from './context/ContextApi';
import { BrowserRouter } from 'react-router-dom';

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212"
    },
    primary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[800],
      contrastText: '#fff',
    },
    secondary: {
      light: '#d0ec73',
      main: '#bde231',
      dark: '#a2ba20',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <ContextApi>
          <App />
        </ContextApi>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);

