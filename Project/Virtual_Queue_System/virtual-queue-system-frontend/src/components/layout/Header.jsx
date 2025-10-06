// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          VQS | Virtual Queue System
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/join" className={styles.navLink}>Join Queue</Link>
          
          <Link to="/admin">
            {/* The Admin button stands out using the primary style */}
            <Button type="primary">Admin Panel</Button> 
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;