import React from "react";
import {
  ScrollToTopOnMount,
  SectionsContainer,
  Section,
  Header,
  Footer,
} from "react-fullpage";

import Navbar from "./../components/Navbar";
import FooterComponent from "../components/Footer";
import SectionOne from "../components/landingComponent/SectionOne";
import SectionTwo from "../components/landingComponent/SectionTwo";
import SectionThree from "../components/landingComponent/SectionThree";
import SectionFour from "../components/landingComponent/SectionFour";

function Landing() {
  let options = {
    sectionClassName: "section",
    anchors: ["sectionOne", "sectionTwo", "sectionThree", "sectionFour"],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: "0px",
    sectionPaddingBottom: "50px",
    arrowNavigation: true,
    ScrollToTopOnMount: true,
  };
  return (
    <>
      <Header>{<Navbar />}</Header>
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        <Section>{<SectionOne />}</Section>
        <Section>{<SectionTwo />}</Section>
        <Section>{<SectionThree />}</Section>
        <Section>{<SectionFour />}</Section>
      </SectionsContainer>
      <Footer>{<FooterComponent />}</Footer>
    </>
  );
}

export default Landing;
