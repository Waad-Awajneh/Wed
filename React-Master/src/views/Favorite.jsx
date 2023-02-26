import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import FooterComponent from "../components/Footer";
import Header from "../components/Header";
import { getFavoritePosts, getPosts } from "../Reducers/PostReducer";
import { getFavorite, getFavoritePostsId } from "../Reducers/UserReducer";

function Favorite(props) {
  const auth = useAuthUser();

  const dispatch = useDispatch();

  const { favoritePostsData, favoritePostsId } = useSelector(
    (state) => state.UserData
  );
  const { favoritePosts, postsData } = useSelector((state) => state.PostsData);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (favoritePostsData.length != 0) {
      dispatch(getPosts());
    }
  }, [favoritePostsData]);

  useEffect(() => {
    if (postsData.length != 0) {
      dispatch(getFavoritePostsId());
    }
  }, [postsData]);

  useEffect(() => {
    if (favoritePostsId.length != 0) {
      dispatch(getFavoritePosts(favoritePostsId));
    }
  }, [favoritePostsId]);

  // if (favoritePosts.length == 0) return "loading ....";
  return (
    <>
      <Header />
      <h1 className="mt-16  flex  font-medium text-center font-[Satisfy] text-black px-5 w-fit text-4xl">
        <BsHeartFill className="mx-2 text-red-600  " />
        {auth().user.full_name.charAt(0).toUpperCase() +
          auth().user.full_name.slice(1) +" "}
         Favorite
      </h1>
      <h3 className="mb-16 ml-16">Keep all of your wedding favorites here! Click the  to save your favorite vendors, engagement rings, and dresses, Real Weddings.</h3>
      <div className="m-5 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        { favoritePosts.length != 0? favoritePosts?.map((cardinfo) => (
          <Card key={cardinfo.id} cards={cardinfo} />
        )):
        <h3 className="mb-16 ml-16">No favorite yet !! <Link className="text-lg font-bold text-lnav font-[Satisfy]" to={"/"}><span>Add Now</span></Link> </h3>
      }
      </div>
      <FooterComponent />
    </>
  );
}

export default Favorite;
