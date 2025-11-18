// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';

// A simple default theme for MUI. You can customize this.
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets CSS for consistency */}
      <BrowserRouter>
        <Navbar />
        <main>
          <AppRoutes /> {/* All your pages will render here */}
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;