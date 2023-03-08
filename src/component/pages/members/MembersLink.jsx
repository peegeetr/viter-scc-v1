import React from "react";
import BreadCrumbs from "../../partials/BreadCrumbs.jsx";
import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";

const MembersLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="members" />
      <div className="wrapper">
        <div className="min-h-[30px]">
          <h4 className="text-xl leading-[1.5rem]">Members</h4>
          <BreadCrumbs />
        </div>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2"></li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default MembersLink;
