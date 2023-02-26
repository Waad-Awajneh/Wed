import React from "react";
import Button from "./../button";
import { Link } from "react-router-dom";
function SectionFour() {
  return (
    <div className="xl:flex xl:justify-end pt-10  w-full font-[Satisfy]">
      <div className="container lg:mx-auto w-[80%]">
        <div className="block xl:flex justify-between xl:items-center lg:items-center md:flex">
          <div className="xl:mx-0 md:w-5/12  text-center items-center justify-center flex flex-col">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium text-lnav text-center lg:text-left">
              Connecting couples and vendors around the world
            </h1>
            <p className="text-xl  font-normal text-gray-700 text-center lg:text-left">
              Sign up to share and find and share Awesome ideas
            </p>

            <Link to="/signUp">
              <button className="text-white bg-lnav  w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol">
                Sign up
              </button>
            </Link>
          </div>

          <div className="w-11/12 xl:w-4/12 mx-5 mt-8 xl:mt-0 flex justify-end md:w-5/12  bg-lb relative py-20">
            {/* <div className="h-4/5 w-4/5 mx-3"> */}
            <img
              tabIndex="0"
              role="img"
              aria-label="people smiling"
              className="mx-auto  w-full overflow-hidden object-cover relative z-10 xl:-ml-56 lg:-ml-32 sm:-ml-20 -ml-12 md:-ml-20 rounded"
              src={require("./../../assests/img/5.jpg")}
              alt="people smiling"
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionFour;
