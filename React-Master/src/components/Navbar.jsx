import React from "react";
import { Avatar } from "flowbite-react";
import Button from "./button";
import { Link, NavLink } from "react-router-dom";
import { GoGrabber } from "react-icons/go";
import { useState } from "react";

export default function Navbar(props) {
  const [brgier, setBrgier] = useState(false);

  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative  bg-white shadow-lg") + "  "
        }
      >
        <div className="h-full  ">
          {props.page == "profile" ? (
            <>
              <Link to={"/profile"}>
                <div>
                  <img
                    src={require("./../assests/img/logo.png")}
                    className="h-16 w-16 ml-3 mt-2"
                    alt=" Logo"
                  />
                </div>
              </Link>
              <div className="flex text-lnav items-center">
                <Link to={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>

                <Link to={"/addpost"}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </Link>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-2 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    ></path>
                  </svg>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <Link to={"/profile"}>
                  {" "}
                  <div className="flex flex-wrap gap-2">
                    <Avatar
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded={true}
                    />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="md:hidden flex justify-between relative ">
                <img
                  src={require("./../assests/img/logo.png")}
                  className="h-16 w-16 ml-3 block"
                  alt=" Logo"
                />
                <button
                  onClick={() => {
                    setBrgier(!brgier);
                  }}
                >
                  <GoGrabber size={30} />
                </button>
                <ul
                  className={`${
                    brgier ? "flex" : "hidden"
                  } absolute w-full z-10 top-16  text-white items-center flex-col bg-lb  font-[Satisfy] font-[700] text-lg `}
                >
                  <li className=" mx-5 cursor-pointer">
                    <NavLink to={"/landing"}>Home</NavLink>
                  </li>
                  <li className=" mx-5 cursor-pointer py-3 ">
                    <NavLink to={"/"}>Discover</NavLink>
                  </li>
                  <li className=" mx-5 cursor-pointer py-3">
                    <NavLink to={"/about"}>About US</NavLink>
                  </li>
                  <li className="mx-5 cursor-pointer py-3">
                    <NavLink to={"/contact"}>Contact</NavLink>
                  </li>
                  <li className="mx-5 ml-5 cursor-pointer py-3">
                    <div className="flex flex-wrap ">
                      <NavLink to={"/login"}>
                        <Button color={"lnav"} name={"login"} />
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="hidden md:flex justify-between  ">
                <img
                  src={require("./../assests/img/logo.png")}
                  className="h-16 w-16 ml-3"
                  alt=" Logo"
                />
                <ul className="flex text-lnav items-center justify-around font-[Satisfy] font-[700] text-lg  ">
                  <li className=" mx-5 cursor-pointer">
                    <NavLink to={"/landing"}>Home</NavLink>
                  </li>
                  <li className=" mx-5 cursor-pointer">
                    <NavLink to={"/"}>Discover</NavLink>
                  </li>
                  <li className=" mx-5 cursor-pointer">
                    <NavLink to={"/about"}>About US</NavLink>
                  </li>
                  <li className="mx-5 cursor-pointer">
                    <NavLink to={"/contact"}>Contact</NavLink>
                  </li>
                  <li className="mx-5 ml-5 cursor-pointer">
                    <div className="flex flex-wrap ">
                      <NavLink to={"/login"}>
                        <Button color={"lnav"} name={"login"} />
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
