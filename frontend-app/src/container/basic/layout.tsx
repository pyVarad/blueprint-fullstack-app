import React from 'react';
import Header from '../../components/header/Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-4 pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;