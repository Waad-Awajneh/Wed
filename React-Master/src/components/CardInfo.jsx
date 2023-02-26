// import React from "react";
import { useEffect } from "react";

import HomeGallery from "./HomeGallery";

import { useDispatch, useSelector } from "react-redux";
import { getFollowing, getPosts } from "../Reducers/PostReducer";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useLocation } from "react-router-dom";

import { getFavorite, getFavoritePostsId } from "../Reducers/UserReducer";

function CardInfo({ open }) {
  const location = useLocation();

  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const dispatch = useDispatch();

  const { followingPostData, postsData } = useSelector(
    (state) => state.PostsData
  );
  const { favoritePostsData } = useSelector((state) => state.UserData);

  useEffect(() => {
    if (isAuthenticated()) {
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
    }
  }, []);

  useEffect(() => {
    if (favoritePostsData.length != 0) dispatch(getFavoritePostsId());
  }, [favoritePostsData]);

  useEffect(() => {
    if (open == "follow") {
      if (isAuthenticated()) {
        const config = {
          method: "get",
          url: `http://localhost:8000/api/following/${auth().user.user_id}`,
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${auth().token}`,
          },
        };

        dispatch(getFollowing(config));
      }
    } else if (open == "rand") {
      dispatch(getPosts());
    }
  }, []);

  // if (postsData.length == 0 && followingPostData.length == 0)
  //   return "loading ....";
  return (
    <>
      {location.pathname == "/Home" || location.pathname == "/" ? (
        <HomeGallery data={postsData} profile={open} />
      ) : (
        <HomeGallery data={followingPostData} profile={open} />
      )}
    </>
  );
}

export default CardInfo;
