import React from "react";
import Navbar from "./Navbar";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{paddingTop:"90px"}}>
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
