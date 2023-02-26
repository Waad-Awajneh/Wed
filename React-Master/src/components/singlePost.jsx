import React, { useEffect } from "react";

import { BsHeartFill, BsTrashFill } from "react-icons/bs";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getSinglePost } from "../Reducers/PostReducer";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllComments, getPostComments } from "../Reducers/commentReducer";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { AiFillEdit } from "react-icons/ai";
import {
  handelOpenModelToEditComment,
  handelOpenModelToEditPost,
} from "../Reducers/modalReducer";
import EditComment from "./Modal/EditComment";
import GetVideo from "./VideoPost/GetVideo";
import { handleDelete } from "../actions/handelDelete";
import EditPost from "./Modal/editPost";
import { Favorite } from "./generalComponent/Favorite";
import Navbar from "./Navbar";

function SinglePost() {
  let openPopOver = undefined;
  const { id } = useParams();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [loadingComment, setLoadingComment] = useState(true);
  const [updateFav, setUpdateFav] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
    post_id: id,
  });
  const { update } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();

  const { singlePost, postsData } = useSelector((state) => state.PostsData);
  const { allCommentData, postComments } = useSelector(
    (state) => state.CommentsData
  );
  console.log(postsData);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  useEffect(() => {
    dispatch(getAllComments());
  }, [comment, loadingComment, update]);

  useEffect(() => {
    if (postsData.length != 0) dispatch(getSinglePost(id));
  }, [postsData]);

  useEffect(() => {
    if (allCommentData?.length != 0) dispatch(getPostComments(id));
  }, [allCommentData, comment]);

  const handleComment = () => {
    const commentConfig = {
      method: "post",
      url: "http://127.0.0.1:8000/api/addComment",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${auth().token}`,
      },
      data: comment,
    };
    if (comment.comment === "") return null;
    axios(commentConfig)
      .then(function (res) {
        console.log(res.data);

        setComment((pervs) => ({
          ...pervs,
          comment: "",
        }));

        const text = document.getElementById("commentArea");

        text.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleDelete = (id, action) => {
  //   const config = {
  //     method: "delete",
  //     url: `http://127.0.0.1:8000/api/deleteComment/${id}`,
  //     headers: {
  //       Accept: "application/vnd.api+json",
  //       "Content-Type": "application/vnd.api+json",
  //       Authorization: `Bearer ${auth().token}`,
  //     },
  //   };
  //   axios(config).then((resp) => {
  //     console.log(resp);

  //     setLoadingComment(!loadingComment);
  //   });
  // };

  if (singlePost.length == 0) return console.log(singlePost);

  return (
    <>
      {isAuthenticated() ? <Header /> : <Navbar />}
      <div
        className="flex flex-wrap mt-6 justify-evenly md:m-10"
        style={{ width: "100vw", height: "75vh" }}
      >
        <div className="flex flex-wrap max-w-3xl p-1">
          <div className="flex flex-wrap max-[480px]:sm:hover:scale-100  bg-white  w-full dark:bg-[#18191c] shadow-black hover:shadow rounded-xl ">
            <div className="relative flex scale-100 flex-warp w-75">
              {/* <img
                className="rounded-xl ms:shrink-0"

                src={`data:image/jpeg;base64,${singlePost.images[0]?.image}`}
             
                alt="card image"
              /> */}

              {singlePost.images.length != 0 ? (
                <img
                  style={{ width: "100vw" }}
                  className="rounded-xl ms:shrink-0"
                  src={`data:image/jpeg;base64,${singlePost.images[0].image}`}
                  // src={
                  //   cardInfo.images.length != 0
                  //     ? "http://localhost:8000/storage/app/" +
                  //       cardInfo.images[0].image
                  //     : "https://i.pinimg.com/564x/4f/5e/58/4f5e58105db88213e0b0c7cfe169467b.jpg"
                  // }
                  alt={singlePost.post_id}
                />
              ) : (
                <GetVideo id={singlePost.videos[0]?.video_id} />
              )}

              <Favorite
                post={singlePost}
                setUpdate={setUpdateFav}
                update={updateFav}
              />
              {/*               
              <div className="absolute flex items-center space-x-2 bottom-3 left-4">
                <span className="p-1.5 rounded-lg bg-white hover:bg-red-500 flex items-center justify-center w-fit group duration-200">
                  <BsHeartFill className="text-sm text-red-500 group-hover:text-white" />
                </span>
              </div> */}
            </div>

            <div className="relative w-full p-4 ">
              <div className="flex justify-between">
                <Link to={`/profile/${singlePost.post_owner.id}`}>
                  <div className="flex items-center justify-evenly">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        singlePost.post_owner.profile_image != null
                          ? `data:image/jpeg;base64,${singlePost.post_owner.profile_image}`
                          : singlePost.post_owner.gender == "Female"
                          ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                          : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                      }
                      alt="Rounded avatar"
                    />
                    <h2 className="m-3 font-semibold">
                      {singlePost.post_owner.name}
                    </h2>
                  </div>
                </Link>
                <span className="absolute right-0 ">
                  {isAuthenticated() ? (
                    singlePost.post_owner.id == auth().user.user_id ? (
                      <div className="flex">
                        <Popover
                          color="red"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <PopoverHandler>
                            <IconButton variant="text" color="gray">
                              <BsTrashFill color="red" />
                            </IconButton>
                          </PopoverHandler>
                          <PopoverContent>
                            <h6>Are you sure?</h6>``
                            <p>You won't be able to revert this!</p>
                            <Button
                              size="sm"
                              color="red"
                              name="delete"
                              onClick={() => {
                                handleDelete(
                                  singlePost.post_id,
                                  "deletePost",
                                  `Bearer ${auth().token}`,
                                  setLoadingComment,
                                  loadingComment,
                                  navigate
                                );
                              }}
                            >
                              delete
                            </Button>
                          </PopoverContent>
                        </Popover>
                        <IconButton variant="text" color="gray">
                          <AiFillEdit
                            className="mx-3"
                            style={{
                              fontSize: 18,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              dispatch(handelOpenModelToEditPost(singlePost))
                            }
                          />
                        </IconButton>
                        <EditPost post={singlePost} />
                      </div>
                    ) : (
                      <div></div>
                    )
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <h1 className="text-lg font-normal dark:text-white mt-7">
                {singlePost.title}
              </h1>
              <div className="flex items-center my-2 text-sm font-semibold text-gray-800">
                <div className="flex-grow h-px mr-3 border-t"></div>
              </div>

              <small className="text-sm font-light text-primary dark:text-gray-400">
                {singlePost.post_content}
              </small>
              <div className="">
                <div>
                  <h1 className="mx-2 mt-4 text-lg font-semibold ">Comments</h1>
                </div>
                {postComments.length > 0 ? (
                  <div
                    id="scrollableDiv"
                    className="w-[99%] relative mt-8 flex flex-wrap flex-col h-48 bg-white  rounded-xl overflow-y-scroll scroll-my-0.5 scroll-smooth hover:scroll-auto scrollbar"
                  >
                    <div className="w-[99%] flex-wrap flex-col top-0 left-0 right-0 flex items-start justify-between bg-white py-4 ">
                      <InfiniteScroll
                        className="w-[99%] mt-0  "
                        dataLength={count}
                        next={() => setCount(3 + count)}
                        hasMore={count}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                      >
                        {postComments.length > count ? (
                          <p
                            className=" justify-end mb-2 flex w-full absolute right-0  top-[-21px] text-[13px] font-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setCount(3 + count);
                            }}
                          >
                            View More Comments
                          </p>
                        ) : null}

                        {postComments.length != 0
                          ? postComments
                              .slice(-count)
                              .reverse()
                              .map((comment, i) => {
                                return (
                                  <div className="bg-[#dcdcdc33] rounded-[20px] mb-2 w-[99%]} relative ">
                                    <div
                                      key={i}
                                      className="p-4 flex rounded-xl flex-wrap w-[99%]"
                                    >
                                      <img
                                        className="w-8 h-8 p-1 mr-3 overflow-visible rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                        src={`data:image/jpeg;base64,${comment.user_info.profile_image}`}
                                        alt=""
                                      />
                                      <span>
                                        <h5 className="font-medium text-primary dark:text-white text-l">
                                          {comment.user_info.name}
                                        </h5>
                                        <p className="mb-0 text-xs font-thin ">
                                          {comment.updated_at.split("T")[0]} at{" "}
                                          {comment.updated_at
                                            .split("T")[1]
                                            .slice(0, 5)}
                                        </p>
                                      </span>
                                      <span className="absolute right-0 ">
                                        {comment.user_info.id ==
                                        auth().user.user_id ? (
                                          <div className="flex">
                                            <Popover
                                              color="red"
                                              open={openPopOver}
                                              animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                              }}
                                            >
                                              <PopoverHandler>
                                                <IconButton
                                                  variant="text"
                                                  color="gray"
                                                >
                                                  <BsTrashFill color="red" />
                                                </IconButton>
                                              </PopoverHandler>
                                              <PopoverContent>
                                                <h6>Are you sure?</h6>
                                                <p>
                                                  You won't be able to revert
                                                  this!
                                                </p>
                                                <Button
                                                  size="sm"
                                                  color="red"
                                                  name="delete"
                                                  onClick={() => {
                                                    // handleDelete(
                                                    //   comment.comment_id,
                                                    //   "comment"
                                                    // );
                                                    openPopOver = false;
                                                    handleDelete(
                                                      comment.comment_id,
                                                      "deleteComment",
                                                      `Bearer ${auth().token}`,
                                                      setLoadingComment,
                                                      loadingComment
                                                    );
                                                    // setLoadingComment(!loadingComment);
                                                  }}
                                                >
                                                  delete
                                                </Button>
                                              </PopoverContent>
                                            </Popover>
                                            <IconButton
                                              variant="text"
                                              color="gray"
                                            >
                                              <AiFillEdit
                                                className="mx-3"
                                                style={{
                                                  fontSize: 18,
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  dispatch(
                                                    handelOpenModelToEditComment()
                                                  )
                                                }
                                              />
                                            </IconButton>
                                            <EditComment comment={comment} />
                                          </div>
                                        ) : (
                                          <div></div>
                                        )}
                                      </span>

                                      <small className="block w-full p-2 text-xs font-light text-primary dark:text-gray-400">
                                        {comment.comment_content}
                                      </small>
                                    </div>
                                  </div>
                                );
                              })
                          : null}
                      </InfiniteScroll>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="relative group my-7">
                <label
                  className="absolute top-0 left-0  flex items-center pl-[10px] duration-100 text-sm group-focus-within:text-xs group-focus-within:h-1/6 group-focus-within:-translate-y-full group-focus-within:pl-0"
                  htmlFor="label"
                >
                  Add Comments
                </label>

                <textarea
                  id="commentArea"
                  className="rounded-xl w-full h-[117px] cover:h-[66px] bg-gray-200 outline-none py-3 px-4 text-xs"
                  type="text"
                  onChange={(e) => {
                    setComment((pervs) => ({
                      ...pervs,
                      comment: e.target.value,
                    }));
                  }}
                />

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-lnav hover:bg-pcol focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      isAuthenticated() ? handleComment() : navigate("/login");
                    }}
                  >
                    Done
                  </button>
                  {comment.comment != "" ? (
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => {
                        setComment((pervs) => ({
                          ...pervs,
                          comment: "",
                        }));

                        const text = document.getElementById("commentArea");

                        text.value = "";
                      }}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
