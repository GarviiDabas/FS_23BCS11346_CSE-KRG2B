// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header.jsx'; 
import Footer from './Footer.jsx'; 

const Layout = ({ children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#F8FAFC' /* Light background for a clean look */
    }}>
      <Header />
      <main style={{ 
        flexGrow: 1, 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '1.5rem 2rem', 
        width: '100%' 
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;