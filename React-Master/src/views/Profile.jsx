import React from "react";

import FooterComponent from "../components/Footer";

import Button from "../components/button";
import { useEffect } from "react";
import { getProfileData, setIsEdit, setUpdate } from "../Reducers/PostReducer";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "react-auth-kit";
import HomeGallery from "../components/HomeGallery";
import Header from "../components/Header";

import { RiImageEditFill, RiRoadMapLine } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  handelOpenFormModel,
  handelOpenPriceModel,
  openModal,
} from "../Reducers/modalReducer";
import { AiOutlineComment } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { SiStackexchange } from "react-icons/si";
import { SlBriefcase } from "react-icons/sl";
import { handleEdit } from "../actions/editImage";

export default function Profile() {
  const auth = useAuthUser();
  const { profileData, update, isEdit } = useSelector(
    (state) => state.PostsData
  );
  console.log(profileData);
  const dispatch = useDispatch();
  /******************************************************* */
  const [profilePic, setProfilePic] = useState({
    profile_Img: undefined,
  });

  const [coverPic, setCoverPic] = useState({
    cover_Img: undefined,
  });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
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
  }, [update, flag]);

  useEffect(() => {
    if (profilePic.profile_Img != undefined) {
      handleEdit(
        profilePic.profile_Img,
        "http://localhost:8000/api/editProfilePic",
        auth().token,
        "profile_Img"
      );
      setFlag(false);
      dispatch(setIsEdit());
      dispatch(setUpdate());
    }
  }, [profilePic]);

  useEffect(() => {
    if (coverPic.cover_Img != undefined) {
      handleEdit(
        coverPic.cover_Img,
        "http://localhost:8000/api/editCoverPic",
        auth().token,
        "cover_Img"
      );
      dispatch(setUpdate());
      setFlag(false);
    }
  }, [coverPic]);

  // const handleEdit = () => {
  //   if (profilePic.profile_Img == "") return null;

  //   var FormData = require("form-data");
  //   var data = new FormData();
  //   data.append("profile_Img", profilePic.profile_Img);

  //   var config = {
  //     method: "post",
  //     url: "http://localhost:8000/api/editProfilePic",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Accept: "application/vnd.api+json",
  //       Authorization: `Bearer ${auth().token}`,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {

  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "top-right",
  //         iconColor: "green",
  //         customClass: {
  //           popup: "colored-toast",
  //         },
  //         showConfirmButton: false,
  //         timer: 1500,
  //         timerProgressBar: true,
  //       });
  //       Toast.fire({
  //         icon: "success",
  //         title: response.data.message,
  //       });

  //       dispatch(setUpdate());

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  /********************************************************** */

  if (profileData.length == 0) return "LOADING";
  return (
    <>
      <Header />

      <main className="profile-page h-fit">
        <section className="relative block h-[500px] sm:h-[370px] cover:h-[400px]">
          {/* <img
            src={require("./../assests/img/1.jpg")} //cover_Img
            className="absolute top-0 w-full h-full bg-center bg-cover cover:h-auto"
            alt=" Logo"
          /> */}
          {/************************************************************************************** */}
          {profileData.cover_Img != null ? (
            <img
              alt="..."
              // src={require("../assests/img/pro.jpg")} //profile_Img
              src={
                // profileData.cover_Img != null
                // ?
                `data:image/jpeg;base64,${profileData.cover_Img}`
                // : require("../assests/img/defaultCover.jpg")
              }
              // className="peer shadow-xl rounded-full h-auto align-middle border-none group-hover:block absolute -m-16 -ml-20 lg:-ml-16  top-[80px]  "
              className="absolute top-0 w-full h-full bg-center bg-cover peer cover:h-auto"
              // style={{ maxWidth: "160px", width:"160px" ,height:"160px"}}
            />
          ) : (
            <div className="absolute top-0 w-full h-full bg-center bg-cover peer cover:h-auto bg-[#dad1c54d]"></div>
          )}
          <label
            for="dropzone-file2"
            className="peer-hover:visible hover:visible invisible   shadow-xl rounded-full   align-middle border-none absolute  bottom-1 right-1 pm600:top-0 pm600:w-[75px] pm600:h-[75px]
                        bg-gray-600 opacity-60  w-[75px] h-[75px] max-w-[75px]
                        "
          >
            {
              <RiImageEditFill
                className="hover:visible absolute w-[40px] h-[40px] right-[1.1rem]  top-4 pm600:w-20 pm600:h-10 pm600:right-[-2px]"
                color="#fff"
              />
            }
          </label>
          <input
            id="dropzone-file2"
            type="file"
            class="hidden"
            onChange={(e) => {
              setFlag(true);
              setCoverPic((pervs) => ({
                ...pervs,
                cover_Img: e.target.files[0],
              }));
            }}
          />
          {/************************************************************************************** */}
          {/* <div
            className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none"

          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg> 
          </div>*/}
        </section>
        <section className="relative pb-16">
          <div className=" w-[93%]   ml-14  pl-4  pm900:w-full pm900L:pl-0 pmi900:pm1400:ml-5 pm900:ml-5 flex pm600:flex-wrap  ">
            <div className="relative h-fit   bg-[#ffffff80] flex basis-[25%] flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 pmi900:pm1400:basis-[40%]  pm900:basis-[50%] pm600:basis-[92%]  xsm:basis-[84%]  ">
              <div className="px-6 pm900:p-0 ">
                <div className="flex flex-wrap w-full">
                  <div className="relative flex items-center justify-center w-full px-4 lg:order-2 ">
                    {/*************************************************************** */}
                    {/* <ImageComponen image={profileData.profile_Img} gender={profileData.gender} setProfilePic={setProfilePic}/> */}

                    <img
                      alt="..."
                      // src={require("../assests/img/pro.jpg")} //profile_Img
                      src={
                        profileData.profile_Img != null &&
                        (!auth().google ||
                          profileData.profile_Img.split(":"))[0] != "https"
                          ? `data:image/jpeg;base64,${profileData.profile_Img}`
                          : auth().google
                          ? profileData.profile_Img
                          : profileData.gender == "Female"
                          ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                          : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                      }
                      className="peer shadow-xl rounded-full h-auto align-middle border-none group-hover:block absolute -m-16 -ml-20 lg:-ml-16  top-[80px] 
                          "
                      style={{
                        maxWidth: "160px",
                        width: "160px",
                        height: "160px",
                      }}
                    />
                    <label
                      for="dropzone-file1"
                      className="peer-hover:visible hover:visible invisible   shadow-xl rounded-full h-auto  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 top-[80px]
                        bg-gray-600 opacity-60  
                        "
                      style={{
                        maxWidth: "160px",
                        width: "160px",
                        height: "160px",
                      }}
                    >
                      {
                        <RiImageEditFill
                          className="absolute w-40 h-16 hover:visible top-12"
                          color="#fff"
                        />
                      }
                    </label>
                    <input
                      id="dropzone-file1"
                      type="file"
                      class="hidden"
                      onChange={(e) => {
                        setFlag(true);
                        setProfilePic((pervs) => ({
                          ...pervs,
                          profile_Img: e.target.files[0],
                        }));
                      }}
                    />
                    {/*************************************************************** */}
                    <div className="text-center  mt-[14rem] w-full">
                      <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-800">
                        {profileData.full_name.charAt(0).toUpperCase() +
                          profileData.full_name.slice(1)}
                      </h3>
                      <div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-500 uppercase">
                        {/* <SlBriefcase size={"25px"}  color={"#D9AD90"}/> */}
                        {profileData.major}
                      </div>
                      <div className="mt-10 mb-2 text-gray-700">
                        {profileData.bio}
                      </div>
                      <div className="flex justify-center px-3 mb-3 font-semibold text-gray-700">
                        <RiRoadMapLine size={"25px"} color={"#D9AD90"} />
                        <span className="px-3 "> {profileData.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="w-full px-4 ">
                    <div className="py-6  pmi1400:mt-14  sm:mt-0 flex flex-col items-center font-[Satisfy] ">
                      {/* <Button isClick={true} page={"profile"} name={"Connect"} /> */}
                      <button
                        type="button"
                        className=" text-white bg-lnav w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
                        onClick={() => dispatch(handelOpenFormModel())}
                      >
                        Connect
                      </button>
                      <button
                        type="button"
                        className="text-white bg-lnav  w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
                        onClick={() => dispatch(handelOpenPriceModel())}
                      >
                        Edit information{" "}
                      </button>
                      {/* <Button page={"profile"} name={"ASK Price"} /> */}
                    </div>
                  </div>{" "}
                  {/* 
element.style {
    font-size: 12px;
    font-weight: 900;
    line-height: 4px; */}
                  <div className="w-full p-4 lg:order-1 ">
                    <div className="flex items-center gap-8  justify-between align-middle  font-[Satisfy]  ">
                      <div className="flex justify-center w-full text-center ">
                        {/* <span className="text-base w-[90px] text-[12px] font-[900]   text-left uppercase text-black "></span> */}
                        <span className="text-base text-center text-[12px] font-[900]  block uppercase w-[50px] tracking-wide text-black">
                          <SiStackexchange size={"25px"} color={"#D9AD90"} />{" "}
                          {profileData.posts?.length}
                        </span>
                      </div>
                      <div className="flex justify-center w-full text-center ">
                        {/* <span className="text-base text-[12px] font-[900]   w-[90px] text-left uppercase  text-black"></span> */}
                        <span className="text-base text-[12px] font-[900]   block uppercase tracking-wide w-[50px] text-black">
                          <HiUserGroup size={"25px"} color={"#D9AD90"} />{" "}
                          {profileData.follower_info.length}
                          {console.log(profileData)}
                        </span>
                      </div>

                      <div className="flex justify-center w-full text-center ">
                        {/* <span className="text-base w-[90px] text-[12px] font-[900]   text-left uppercase  text-black "></span> */}
                        <span className="text-base   block text-[12px] font-[900] uppercase tracking-wide w-[50px] text-black">
                          <AiOutlineComment size={"25px"} color={"#D9AD90"} />{" "}
                          {profileData.comments == null
                            ? 0
                            : profileData.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" py-10  text-center basis-[95%] sm:basis-[70%] pm600:basis-[95%] m-14 pmi900:pm1400:m-0 pm900:m-0 sm:mx-10 sm:pt-0  ">
              <div className="flex flex-wrap justify-end">
                <div className="w-full px-4 overflow-hidden xsm:px-0">
                  {console.log(profileData.posts.length)}
                  {profileData.posts.length ? (
                    <HomeGallery data={profileData.posts} profile={"profile"} />
                  ) : (
                    <>
                      <h3 className="mb-16 card:mt-16">
                        Share your creative work with the world by uploading
                        your first post now.
                        <span
                          onClick={() => {
                            dispatch(openModal(1));
                          }}
                          className="text-lg ml-2 font-bold text-lnav font-[Satisfy]"
                        >
                          <span>Add Now</span>
                        </span>
                      </h3>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </>
  );
}
