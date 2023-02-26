import React from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link } from "react-router-dom";
import { Follow } from "./Follow";

export const UserCard = ({ info }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  console.log(info);
  return (
    <>
      <div className="flex flex-col md:flex-row items-center space-x-4 p-2 md:p-3 rounded-xl shadow-lg bg-white  xss:cover:mx-[20px]">
        <div className="relative w-fit hover:scale-105 duration-200 py-2 md:py-0">
          <img
            className="block dark:hidden w-[173px] h-[190px] max-w-none  sm:w-[230px] cover:w-[26rem] cover:h-[15rem] xl:w-[500px]] xl:h-[230px] xss:cover:w-[18rem] xsm:max-w-full rounded-3xl"
            src={
              info?.profile_Img != null
                ? `data:image/jpeg;base64,${info?.profile_Img}`
                : info.gender == "Female"
                ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
            }
            alt="avatar"
          />
        </div>
        <div className="flex flex-col space-y-1 py-2 md:py-0">
          <h1 className="text-primary dark:text-white font-bold  text-xl">
            {info.full_name}
          </h1>

          <h6 className="text-primary font-[Satisfy] dark:text-white font-medium text-lg">
            {info.major}
          </h6>
          <small className="text-xs font-lighttext-primary  dark:text-gray-400">
            {info.bio}
          </small>
          {/* <Link
            className="text-lg font-bold text-lnav font-[Satisfy]"
            to={`/SinglePost/${info.post_id}`}
          >
            <span>Check {info.full_name} profile</span>
          </Link> */}

          {isAuthenticated() && info.user_id == auth().user.user_id ? (
            <Link
              to={`/profile`}
              className="text-sm font-semibold rounded-lg w-fit p-2 text-lnav font-[Satisfy] shadow-lg hover:text-white hover:bg-lnav hover:scale-105 duration-200"
            >
              <span>Check {info.full_name} profile</span>
            </Link>
          ) : (
            <Link
              to={`/profile/${info.user_id}`}
              className="text-sm p-2 rounded-lg w-fit  font-semibold text-lnav font-[Satisfy] shadow-lg hover:text-white hover:bg-lnav hover:scale-105 duration-200"
            >
              <button>Check {info.full_name} profile</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
