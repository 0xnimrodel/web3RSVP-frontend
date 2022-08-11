import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

const Layout = ({ children }: {children: any}) => {
  return (
    <div className="font-serif flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
