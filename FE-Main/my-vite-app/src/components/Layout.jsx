import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
