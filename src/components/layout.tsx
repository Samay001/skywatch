import React from 'react';
import Header from './header.tsx';
// import Footer from './footer.tsx';
//@ts-ignore
import bgImg from "../assets/bg5.jpg";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-8">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
