import React from "react";
import FooterComponent from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      {<Navbar />}
      <div className="px-4 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9">
        <div className="w-full lg:w-10/12">
          <p className="text-sm font-normal leading-3 cursor-pointer text-lnav hover:text-pcol">
            About
          </p>
          <h2 className="w-full mt-2 text-3xl font-bold leading-9 xl:w-8/12 lg:w-10/12 text-pcol lg:text-4xl lg:leading-10">
            Who We Are
          </h2>
          <p className="mt-6 text-base font-normal leading-6 text-gray-600">
            Wed is the largest and most trusted global marketplace connecting
            engaged couples with local wedding professionals. Millions of
            couples around the world are able to search, compare and book from a
            directory of over 500,000 vendors. Wed's portfolio of sites help
            couples and businesses in different countries.
          </p>
        </div>

        <div className="mt-12 lg:mt-14 sm:mt-10">
          <img
            className="hidden w-full lg:block"
            src="https://i.ibb.co/GvwJnvn/Group-736.png"
            alt="Group of people Chilling"
          />
          <img
            className="hidden w-full lg:hidden sm:block"
            src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
            alt="Group of people Chilling"
          />
          <img
            className="block w-full sm:hidden"
            src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
            alt="Group of people Chilling"
          />
        </div>

        <div className="flex flex-col justify-between gap-12 mt-16 lg:mt-16 sm:mt-12 lg:flex-row lg:gap-8">
          <div className="w-full xl:w-5/12 lg:w-6/12">
            <h2 className="text-3xl font-bold leading-7 lg:text-4xl lg:leading-9 text-pcol"></h2>
            <p className="mt-4 text-base font-normal leading-6 text-gray-600">
              <span className="text-lnav font-[Satisfy] font-bold">
                VENDORS
              </span>
              Get exposure to millions of couples through a premium WeddingWire
              listing. Our features and benefits will drive leads and bookings
              to businesses, highlight consumer reviews and more.
            </p>
            <p className="mt-6 text-base font-normal leading-6 text-gray-600">
              <span className="text-lnav font-[Satisfy] font-bold">
                ENGAGED COUPLES
              </span>
              Our comprehensive directory of wedding professionals, from venues
              to photographers, features millions of consumer reviews, detailed
              pricing and availability information, payments and more.
            </p>
          </div>
          <div className="items-center w-full lg:flex lg:w-1/2 ">
            <img
              className="hidden w-full lg:block"
              src="https://i.ibb.co/2kxWpNm/Group-740.png"
              alt="people discussing on board"
            />
            <img
              className="hidden w-full lg:hidden sm:block h-3/4"
              src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
              alt="people discussing on board"
            />
            <img
              className="block w-full sm:hidden"
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
