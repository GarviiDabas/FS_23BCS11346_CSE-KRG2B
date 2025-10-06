// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#374151', /* Dark Gray */
      color: '#F3F4F6', /* Light Text */
      padding: '1.5rem', 
      textAlign: 'center', 
      fontSize: '0.875rem', 
      marginTop: 'auto' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        &copy; {new Date().getFullYear()} Virtual Queue System | Chandigarh University Project
      </div>
    </footer>
  );
};

export default Footer;