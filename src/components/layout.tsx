import React from 'react';
import Header from './header.tsx';
import Footer from './footer.tsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
