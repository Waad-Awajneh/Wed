import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { RiImageEditFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { handleEdit } from "../actions/handelEdit";
import {
  closeModal,
  handelOpenModelToEditPost,
} from "../Reducers/modalReducer";
import { getPosts, setUpdate } from "../Reducers/PostReducer";

function AddPost({ isEdit, post }) {
  const auth = useAuthUser();
  const [flag, setFlag] = useState(false);
  // const {post} = useSelector((state) => state.ModalReducer);
  console.log(post);
  const [newPost, setNewPost] = useState({
    content: isEdit ? post.post_content : "",
    title: isEdit ? post.title : "",
    image: isEdit ? post.images[0].image : "",
  });
  const dispatch = useDispatch();

  const handleAddNewPost = () => {
    if (newPost.content === "") return null;
    let type = newPost.image.type.split("/");

    const config = {
      method: "post",
      url:
        type[0] == "image"
          ? `http://127.0.0.1:8000/api/addPost`
          : "http://localhost:8000/api/addVideo",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth().token}`,
      },

      // data: type[0] == "image" ? newPost : data1,
      data: newPost,
    };

    console.log(config.data);
    axios(config)
      .then(function (res) {
        console.log(res.data);
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
          title: "your post published successfully",
        });
        dispatch(getPosts());
        dispatch(setUpdate());
        setNewPost((pervs) => ({ ...pervs, content: "" }));
        dispatch(closeModal());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex  flex-wrap lg:flex-nowrap md:flex-nowrap bg-white justify-center items-center  dark:bg-[#18191c] ">
        {newPost.image == "" ? (
          <div className="flex justify-center items-center mr-16 pm720:mr-0 pm720:p-0 border-2 p-6 border-gray-400 text-center w-[50%] pm720:w-auto  pm720:h-auto h-full  ">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center bg-gray-100 border-4 border-gray-500 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center p-5 pm720:p-0">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm font-[Satisfy] text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-sm font-[Satisfy] text-gray-600 cover:hidden">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                // value={post.image}
                onChange={(e) => {
                  setNewPost((pervs) => ({
                    ...pervs,
                    image: e.target.files[0],
                  }));
                }}
              />
            </label>
          </div>
        ) : (
          // console.log(newPost.image)
          <>
            {" "}
            <img
              className=" relative flex justify-center items-center mr-16 pm720:mr-0 cover:w-[150px] cover:h-[150px] rounded-lg pm720:p-0 border-2 p-6 border-gray-400 text-center w-[50%] h-[25rem]  "
              src={
                isEdit && !flag
                  ? `data:image/jpeg;base64,${newPost.image}`
                  : URL.createObjectURL(newPost.image)
              }
              alt="Rounded avatar"
            />
            <label
              for="dropzone-file5"
              className=" absolute    shadow-xl rounded-full   align-middle border-none left-[14rem]  bottom-[6.25rem]  pm600:top-0 pm600:w-[75px] pm600:h-[75px]
                        bg-gray-600  opacity-95  w-[75px] h-[75px] max-w-[75px]
                        "
            >
              {
                <RiImageEditFill
                  className=" absolute w-[40px] h-[40px]  right-5 top-4 pm600:w-20 pm600:h-10 pm600:right-[-2px]"
                  color="#fff"
                />
              }
            </label>
            <input
              id="dropzone-file5"
              type="file"
              class="hidden"
              onChange={(e) => {
                setNewPost((pervs) => ({ ...pervs, image: e.target.files[0] }));

                isEdit ? setFlag(true) : setFlag(false);
              }}
            />
          </>
        )}
        <div className=" relative  flex  flex-col w-[24rem] pm720:w-full cover:pl-5 ">
          <div className="relative z-0 flex flex-col m-5 mb-6 group ">
            <input
              type="text"
              name="title"
              className="block font-[Satisfy] py-2.5 px-0 rounded-xl text-lg   text-gray-800 bg-transparent border-0 border-b-4 border-lb focus:border-pcol appearance-none focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
              value={newPost.title}
              onChange={(e) => {
                setNewPost((pervs) => ({ ...pervs, title: e.target.value }));
              }}
            />
            <label
              for="title"
              className="absolute text-lg font-[Satisfy] focus:text-lg  font-medium text-gray-800  duration-300 transform -translate-y-8 scale-75 top-4 left-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-800  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-7"
            >
              Add Your Title
            </label>
          </div>
          <div className="relative flex ">
            <div className="flex items-center mb-10 ml-9 justify-evenly">
              <img
                className="w-[60px] h-[60px] rounded-full"
                src={
                  auth().user.profile_Img != null
                    ? `data:image/jpeg;base64,${auth().user.profile_Img}`
                    : auth().user.gender == "Female"
                    ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                    : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                }
                alt="Rounded avatar"
              />
              <h2 className="m-5  font-semibold text-gray-800 text-2xl font-[Satisfy]">
                {" "}
                {auth().user.full_name.charAt(0).toUpperCase() +
                  auth().user.full_name.slice(1)}
              </h2>
            </div>
          </div>

          <form className="relative group">
            {newPost.content == "" ? (
              <label
                className="  font-[Satisfy] absolute cover:text-base cover:top-[4rem] top-[5rem] left-0 items-center flex  pl-[10px] duration-200 text-xl font-base text-gray-800 group-focus-within:text-lg group-focus-within:h-[55%] group-focus-within:-translate-y-full group-focus-within:pl-0 "
                htmlFor="label"
              >
                Tell everyone what your Post is about
              </label>
            ) : (
              ""
            )}

            <textarea
              id="label"
              className={
                (newPost.content?.trim() == "" ? " " : " border-t-4 ") +
                "peer  font-[Satisfy] w-full  focus:border-pcol h-[87%] mt-11 bg-white border-0 border-b-4 focus:border-t-4 empty:b-t-4 border-lb outline-none py-3 px-4 text-lg "
              }
              type="text"
              value={newPost.content}
              onChange={(e) => {
                setNewPost((pervs) => ({ ...pervs, content: e.target.value }));
              }}
            />
          </form>
          <div className="flex justify-end py-8 mt-5 ">
            <button
              type="button"
              className="ml-6 w-[100px] h-[40px] inline-flex justify-center
                  border-2 bg-white shadow-sm  border-pcol
                   text-center font-medium text-gray-700 leading-[2.5rem]
                    hover:bg-red-700 focus:outline-none focus:ring-2   hover:text-white
                     focus:ring-offset-2 focus:ring-black rounded-3xl font-[Satisfy]  text-xl
                  "
              onClick={() => {
                isEdit
                  ? dispatch(handelOpenModelToEditPost())
                  : dispatch(closeModal());
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-[100px] h-[40px] inline-flex justify-center rounded-3xl
                   border border-transparent shadow-lg  mx-4 bg-lb
                    text-center text-gray-700 hover:bg-pcol   hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-offset-2  leading-[2.5rem]
                     focus:ring-black font-[Satisfy] text-xl "
              onClick={() => {
                isEdit
                  ? handleEdit(
                      newPost,
                      post.post_id,
                      dispatch,
                      `Bearer ${auth().token}`,
                      flag
                    )
                  : handleAddNewPost();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPost;
