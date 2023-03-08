import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";

const ApplicationLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="application" />
      <div className="wrapper">
          <h4 className="text-xl mb-3">Application</h4> 
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2"></li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default ApplicationLink;
