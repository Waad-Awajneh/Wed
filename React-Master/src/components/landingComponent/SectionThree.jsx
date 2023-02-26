import React from "react";
import { Link } from "react-router-dom";
import Button from "./../button";

export default function SectionThree() {
  return (
    <div>
      <div className="container flex justify-center items-center   font-[Satisfy] ">
        <div className="flex flex-col lg:flex-row justify-center items-center py-12 mx-4 md:mx-6 ">
          <div className="lg:w-1/2 flex flex-warp flex-col justify-center items-center lg:items-start pt-24">
            <h1 className="text-2xl lg:text-2xl xl:text-3xl font-bold text-lnav text-center lg:text-left">
              Are You A wedding Planner ?
            </h1>
            <div className=" text-xl leading-normal text-gray-600 mt-4 md:w-8/12 lg:w-11/12 text-center lg:text-left">
              Are you ready to take your wedding business to new horizons?
              <br />
              <p className=" text-pcol font-bold text-xl">Advertise on WED</p>
              <br />
              <p className="text-xl">
                Where wedding businesses grow We help wedding professionals
                reach more engaged local couples, book more weddings and drive
                success to their businesses.
              </p>
              <br />
              <span className=" text-pcol font-bold text-xl">
                Reach today’s couples and book more weddings.
              </span>
            </div>
            <Link to="/signUp">
              <button className="text-white bg-lnav  w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol">
                Sign up
              </button>{" "}
            </Link>
          </div>
          <div className="w-11/12 xl:w-5/12 mx-5 mt-8 xl:mt-0 flex justify-end md:w-5/12  relative py-20">
            {/* <div className="h-4/5 w-4/5 mx-3"> */}
            <img
              tabIndex="0"
              role="img"
              aria-label="people smiling"
              className="mx-auto rounded-lg h-auto"
              src={require("./../../assests/img/13.jfif")}
              alt="people smiling"
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
