
import React from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const Tabs = ({ color }) => {
  const location = useLocation();

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <div className="flex flex-wrap  mx-auto  mt-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <ul
            className="flex  list-none flex-wrap xss:cover:flex-nowrap pt-3 pb-4 flex-row -mb-px"
            role="tablist"
          >
            <li className=" w-40 h-30 mx-5  last:mr-0 last:ml-0 text-center text-xl  xss:cover:w-[116px] font-[Satisfy] ">
              <Link
                className={
                  "  w-40 h-30 mr-3 ml-3 inline-block text-lg text-white hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4  font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active xss:cover:w-[116px]" +
                  (location.pathname == "/Home" || location.pathname == "/"
                    ? " text-white bg-" + color + " "
                    : " text-" + color + " bg-white")
                }
                data-toggle="tab"
                to="/Home"
                role="tablist"
              >
                For You
              </Link>
            </li>
            {isAuthenticated() ? (
              <li className="  w-40 h-30 mx-5 last:mr-0 last:ml-0  text-center text-xl font-[Satisfy] xss:cover:w-[116px] ">
                <Link
                  className={
                    " w-40 h-30 mr-3 ml-3 flex items-center text-white hover:text-gray-600  hover:border-gray-300 rounded-t-lg py-4 px-4 text-lg font-medium text-center border-transparent border-b-2 active xss:cover:w-[116px]" +
                    (location.pathname === "/follow"
                      ? " text-white bg-" + color + ""
                      : " text-" + color + " bg-white")
                  }
                  data-toggle="tab"
                  to="/follow"
                  role="tablist"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  Following
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs color="lnav" />
    </>
  );
}
