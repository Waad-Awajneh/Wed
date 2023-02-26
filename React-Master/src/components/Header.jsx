import React, { Component } from "react";
import { Avatar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import ModalAddPost from "./Modal/ModalAddPost";
import { useState } from "react";
import { openModal } from "../Reducers/modalReducer";
import { getProfileData } from "../Reducers/PostReducer";
import { useEffect } from "react";
import { GoSearch } from "react-icons/go";

import {
  getPostSearchData,
  getUserSearchData,
  getSearchData,
  setSearch,
} from "../Reducers/SearchReducer";
import { GoogleLogout } from "react-google-login";
import { CLIENT_ID } from "../constant/googleLoginConstant";
import Logout from "../actions/googleLogout";

export default function Header() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [inputSearch, setInputSearch] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { userSearchData, postSearchData, search, allSearchData } = useSelector(
    (state) => state.SearchData
  );

  const { isOpen } = useSelector((state) => state.ModalReducer);
  const { profileData, update, isEdit } = useSelector(
    (state) => state.PostsData
  );
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      const config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/profile",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${auth().token}`,
        },
      };

      dispatch(getProfileData(config));
    }
  }, [update]);

  // console.log(postSearchData,userSearchData);

  useEffect(() => {
    console.log(searchTerm);
    dispatch(getSearchData());
    dispatch(getUserSearchData(searchTerm));
    dispatch(getPostSearchData(searchTerm));
  }, [searchTerm]);

  /**************************************** */

  const handleSearch = (event) => {
    // console.log(event.target.value);
    setSearchTerm(event.target.value);
    setSearchParams({ search: event.target.value });
    dispatch(setSearch(event.target.value));
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event);
    setSearchParams({ selected: event });
    dispatch(setSearch(event));
    navigate(`/search`);
  };

  const filteredOptionsUsers = allSearchData?.users?.filter((option) =>
    option?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOptionsPosts = allSearchData?.posts?.filter(
    (option) =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.post_owner.name.includes(searchTerm) ||
      option.post_content.includes(searchTerm)
  );

  /********************************************** */

  {
    console.log(allSearchData);
  }

  if (!allSearchData) return "mjjkjlkjkl";
  return (
    <>
      <nav
        className={
          "top-0  z-50  rounded-sm  bg-white shadow-lg flex flex-wrap items-center justify-between px-2 text-lnav"
        }
      >
        <div className="h-full w-full   flex items-center justify-between relative ">
          <div>
            <Link to={"/"}>
              <img
                src={require("./../assests/img/logo.png")}
                className="h-16 w-16 ml-3 mt-2"
                alt=" Logo"
              />
            </Link>
          </div>

          <div
            className={` md:flex items-center flex-wrap  rounded-xl w-[50%]  bg-gray-100  z-10 ${
              inputSearch
                ? "absolute top-28 left-[50%] translate-x-[-50%]  translate-y-[-50%] z-10 w-[250px]"
                : "absolute pmi720:relative pmi720:z-10 -z-10 top-0 pmi720:left-0 left-[50%] pmi720:translate-x-0 translate-x-[-50%] pmi720:translate-y-0 translate-y-[-50%]"
            }`}
            style={{ transition: "all 1s " }}
          >
            <div className=" rounded-[30px] bg-gray-100  text-sm w-full   h-12  ">
              <div className="flex items-center px-3 basis-full h-full w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  list="searchList"
                  type="text"
                  className="block  bg-transparent border-none w-full outline-0 p-2"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div>
                {searchTerm.trim() != "" ? (
                  <div className=" w-full z-30 py-2 px-3  rounded-md bg-[#e4dbd0cf] text-gray-900 placeholder-gray-500 border border-gray-300 ">
                    <div className="">
                      <h6 className="mb-1">People</h6>
                      {filteredOptionsUsers?.length != 0 ? (
                        filteredOptionsUsers?.slice(0, 3).map((option) => (
                          <div
                            key={option.user_id}
                            className="bg-white cursor-pointer text-gray-800 active:bg-lnav flex items-center py-1 px-2  hover:bg-blue-gray-400 "
                            onClick={(e) => {
                              handleOptionSelect(option.full_name);
                              e.target.parentNode.parentNode.style.display =
                                "none";
                            }}
                          >
                            <img
                              className="p-1 mr-3 w-8 h-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                              src={
                                option.profile_Img != null
                                  ? `data:image/jpeg;base64,${option.profile_Img}`
                                  : option.gender == "Female"
                                  ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                                  : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                              }
                              alt=""
                            />
                            {option.full_name}
                          </div>
                        ))
                      ) : (
                        <p className="bg-white cursor-pointer text-gray-800 active:bg-lnav p-2">
                          No People founded
                        </p>
                      )}
                    </div>
                    <div>
                      <h6 className="m-1">Posts</h6>
                      {filteredOptionsPosts?.length != 0 ? (
                        filteredOptionsPosts?.slice(0, 3).map((option) => (
                          <div
                            key={option.post_id}
                            className="bg-white cursor-pointer text-gray-800 active:bg-lnav flex items-center py-2 px-2 hover:bg-blue-gray-400"
                            onClick={() => {
                              handleOptionSelect(option.title);
                            }}
                          >
                            <GoSearch className="mr-2" />
                            {option.title}
                          </div>
                        ))
                      ) : (
                        <div
                          value=""
                          className="bg-white cursor-pointer text-gray-800 active:bg-lnav p-2"
                        >
                          No posts founded
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="flex text-lnav items-center  gap-3 ml-3   rounded-2xl">
            <button
              className="md:hidden "
              onClick={(e) => {
                setInputSearch(!inputSearch);
                setSearchTerm("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
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

            <button
              onClick={() => {
                dispatch(openModal(1));
              }}
            >
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
            </button>

            <Link to={"/Favorite"}>
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
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link to={"/profile"}>
                <Avatar
                  img={
                    profileData.profile_Img != null &&
                    ((auth() && !auth().google) ||
                      profileData.profile_Img.split(":"))[0] != "https"
                      ? `data:image/jpeg;base64,${profileData.profile_Img}`
                      : auth() && auth().google
                      ? profileData.profile_Img
                      : profileData.gender == "Female"
                      ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                      : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                  }
                  rounded={true}
                />
              </Link>
            </div>

            <div
              className="flex flex-wrap  "
              onClick={() => {
                signOut();
                navigate("/landing");
              }}
            >
              <Logout />
              {/* <MdOutlineLogout className="h-6 w-6 mx-2 cursor-pointer" /> */}
            </div>
          </div>
        </div>
      </nav>
      <ModalAddPost />
    </>
  );
}
