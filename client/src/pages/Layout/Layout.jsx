// Layout.js
import React from 'react';
import './Layout.css'; // External CSS for layout

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        <h1>TREASURE HUNT</h1>
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
