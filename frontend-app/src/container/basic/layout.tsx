import React from 'react';
import NavBarComponent from '../../components/navbar/navbar';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarComponent />
      <main className="flex-grow bg-gray-100 p-4 pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;