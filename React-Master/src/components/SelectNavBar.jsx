import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
function SelectNavBar(nav) {
  console.log(nav);
  return nav.nav == "profile" ? <Navbar /> : <Header />;
}

export default SelectNavBar;
