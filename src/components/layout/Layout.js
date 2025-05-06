import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import './Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* This renders the current route's component */}
      </main>
    </div>
  );
}

export default Layout;