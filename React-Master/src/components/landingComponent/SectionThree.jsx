import React from "react";
import { Link } from "react-router-dom";

export default function SectionThree() {
  return (
    <div>
      <div className="container flex justify-center items-center   font-[Satisfy] ">
        <div className="flex flex-col items-center justify-center py-12 mx-4 lg:flex-row md:mx-6 ">
          <div className="flex flex-col items-center justify-center pt-24 lg:w-1/2 flex-warp lg:items-start">
            <h1 className="text-2xl font-bold text-center lg:text-2xl xl:text-3xl text-lnav lg:text-left">
              Are You A wedding Planner ?
            </h1>
            <div className="mt-4 text-xl leading-normal text-center text-gray-600  md:w-8/12 lg:w-11/12 lg:text-left">
              Are you ready to take your wedding business to new horizons?
              <br />
              <p className="text-xl font-bold  text-pcol">Advertise on WED</p>
              <br />
              <p className="text-xl">
                Where wedding businesses grow We help wedding professionals
                reach more engaged local couples, book more weddings and drive
                success to their businesses.
              </p>
              <br />
              <span className="text-xl font-bold  text-pcol">
                Reach today’s couples and book more weddings.
              </span>
            </div>
            <Link to="/signUp">
              <button className="text-white bg-lnav  w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol">
                Sign up
              </button>{" "}
            </Link>
          </div>
          <div className="relative flex justify-end w-11/12 py-20 mx-5 mt-8 xl:w-5/12 xl:mt-0 md:w-5/12">
            <img
              tabIndex="0"
              role="img"
              aria-label="people smiling"
              className="h-auto mx-auto rounded-lg"
              src={require("./../../assests/img/13.jfif")}
              alt="people smiling"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
