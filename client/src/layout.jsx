// Layout.js
import React from 'react';
import './layout.css'; // External CSS for layout

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        <h1>Treasure Hunt</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Treasure Hunt</p>
      </footer>
    </div>
  );
};

export default Layout;
