import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { BsHeartFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getFavorite } from "../Reducers/UserReducer";

import { ReadMore } from "./generalComponent/ReadMore";
import GetVideo from "./VideoPost/GetVideo";

function Card(cards) {
  const cardInfo = cards.cards;
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const { favoritePostsId } = useSelector((state) => state.UserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandelAddToFavorite = (id) => {
    const config = {
      method: "post",
      url: `http://localhost:8000/api/addFavorite/${id}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${auth().token}`,
      },
    };

    axios(config)
      .then(function (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "green",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          color: "black",
          title: res.data,
        });

        const config = {
          method: "get",
          url: "http://localhost:8000/api/getFavorite",
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${auth().token}`,
          },
        };

        dispatch(getFavorite(config));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const HandelRemoveFromFavorite = (id) => {
    const config = {
      method: "delete",
      url: `http://localhost:8000/api/deleteFavorite/${id}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${auth().token}`,
      },
    };
    axios(config)
      .then(function (res) {
        const config = {
          method: "get",
          url: "http://localhost:8000/api/getFavorite",
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${auth().token}`,
          },
        };

        dispatch(getFavorite(config));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="   my-5 bg-white dark:bg-[#18191c] shadow-xl h-fit sm:auto hover:shadow duration-200 rounded-xl">
        <div className="relative w-full h-72  card:pm600:h-[26rem] xss:cover:h-[29rem] xsm:h-[25rem] pmi600:pm720:h-[28rem] pmi1400:h-[26rem] rounded-xl">
          <Link to={`/SinglePost/${cardInfo.post_id}`}>
            {cardInfo.images.length != 0 ? (
              <img
                className="rounded-2xl hover:scale-105 w-full duration-300 h-full "
                src={`data:image/jpeg;base64,${cardInfo.images[0].image}`}
                // src={
                //   cardInfo.images.length != 0
                //     ? "http://localhost:8000/storage/app/" +
                //       cardInfo.images[0].image
                //     : "https://i.pinimg.com/564x/4f/5e/58/4f5e58105db88213e0b0c7cfe169467b.jpg"
                // }
                alt={cardInfo.post_id}
              />
            ) : (
              <GetVideo isSingle={true} id={cardInfo.videos[0]?.video_id} />
            )}
          </Link>
          <div className="absolute bottom-3 left-4 flex items-center space-x-2">
            <span
              className={
                (favoritePostsId.includes(cardInfo.post_id)
                  ? "bg-red-500 "
                  : " bg-white ") +
                "p-1.5 rounded-lg  flex items-center justify-center w-fit duration-200 group   "
              }
              onClick={() => {
                if (isAuthenticated()) {
                  favoritePostsId.includes(cardInfo.post_id)
                    ? HandelRemoveFromFavorite(cardInfo.post_id)
                    : HandelAddToFavorite(cardInfo.post_id);
                } else navigate("/login");
              }}
            >
              <BsHeartFill
                className={
                  (favoritePostsId.includes(cardInfo.post_id)
                    ? " text-white "
                    : " text-red-500 ") + " text-sm   "
                }
              />
            </span>
            <Link to={`/SinglePost/${cardInfo.post_id}`}>
              <span className="p-1.5 rounded-lg bg-white hover:bg-blue-500 flex items-center justify-center w-fit duration-200 space-x-1 group">
                <RiMessage3Fill className="text-sm text-blue-500 group-hover:text-white" />
                <small className="text-blue-500 group-hover:text-white">
                  {cardInfo.comments.length}
                </small>
              </span>
            </Link>
          </div>
        </div>
        {console.log(cardInfo)}
        <div className="p-4 flex flex-wrap items-center h-fit min-h-[130px] ">
          <div className="flex flex-nowrap">
            <img
              className="p-1 mr-3 w-8 h-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={
                isAuthenticated()
                  ? cardInfo.post_owner.profile_image != null &&
                    (!auth().google ||
                      cardInfo.post_owner.profile_image.split(":")[0] !=
                        "https")
                    ? `data:image/jpeg;base64,${cardInfo.post_owner.profile_image}`
                    : auth().google
                    ? cardInfo.post_owner.profile_image
                    : cardInfo.post_owner.gender == "Female"
                    ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                    : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                  : cardInfo.post_owner.profile_image != null
                  ? `data:image/jpeg;base64,${cardInfo.post_owner.profile_image}`
                  : cardInfo.post_owner.gender == "Female"
                  ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                  : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
              }
              alt=""
            />
            {isAuthenticated() &&
            cardInfo.post_owner.id == auth().user.user_id ? (
              <Link to={`/profile`}>
                <h5 className="text-primary dark:text-white font-medium text-l">
                  {cardInfo.post_owner.name}
                </h5>
              </Link>
            ) : (
              <Link to={`/profile/${cardInfo.post_owner.id}`}>
                <h5 className="text-primary dark:text-white font-medium text-l">
                  {cardInfo.post_owner.name}
                </h5>
              </Link>
            )}
          </div>
          <small className=" p-2 text-left text-xs block w-full font-light text-primary dark:text-gray-400">
            {cardInfo.title.length < 30 ? (
              cardInfo.title
            ) : (
              <ReadMore>{cardInfo.title}</ReadMore>
            )}
          </small>
        </div>
      </div>
    </>
  );
}

export default Card;
