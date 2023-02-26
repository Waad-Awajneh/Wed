import React from "react";
import FooterComponent from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      {<Navbar />}
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="lg:w-10/12 w-full">
          <p className="font-normal text-sm leading-3 text-lnav hover:text-pcol cursor-pointer">
            About
          </p>
          <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-pcol lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
            Who We Are
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-6">
            Wed is the largest and most trusted global marketplace connecting
            engaged couples with local wedding professionals. Millions of
            couples around the world are able to search, compare and book from a
            directory of over 500,000 vendors. Wed's portfolio of sites help
            couples and businesses in different countries.
          </p>
        </div>

        <div className="lg:mt-14 sm:mt-10 mt-12">
          <img
            className="lg:block hidden w-full"
            src="https://i.ibb.co/GvwJnvn/Group-736.png"
            alt="Group of people Chilling"
          />
          <img
            className="lg:hidden sm:block hidden w-full"
            src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
            alt="Group of people Chilling"
          />
          <img
            className="sm:hidden block w-full"
            src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
            alt="Group of people Chilling"
          />
        </div>

        <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
          <div className="w-full xl:w-5/12 lg:w-6/12">
            <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-pcol"></h2>
            <p className="font-normal text-base leading-6 text-gray-600 mt-4">
              <span className="text-lnav font-[Satisfy] font-bold">
                VENDORS
              </span>{" "}
              Get exposure to millions of couples through a premium WeddingWire
              listing. Our features and benefits will drive leads and bookings
              to businesses, highlight consumer reviews and more.
            </p>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">
              <span className="text-lnav font-[Satisfy] font-bold">
                ENGAGED COUPLES{" "}
              </span>
              Our comprehensive directory of wedding professionals, from venues
              to photographers, features millions of consumer reviews, detailed
              pricing and availability information, payments and more.
            </p>
          </div>
          <div className="lg:flex items-center w-full lg:w-1/2 ">
            <img
              className="lg:block hidden w-full"
              src="https://i.ibb.co/2kxWpNm/Group-740.png"
              alt="people discussing on board"
            />
            <img
              className="lg:hidden sm:block hidden w-full h-3/4"
              src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
              alt="people discussing on board"
            />
            <img
              className="sm:hidden block w-full"
              src="https://i.ibb.co/9g2R7Xr/Group-803.png"
              alt="people discussing on board"
            />
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default About;
