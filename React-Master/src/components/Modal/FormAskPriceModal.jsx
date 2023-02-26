import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { MdFace } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { handelOpenPriceModel } from "../../Reducers/modalReducer";
import { getProfileData, setUpdate } from "../../Reducers/PostReducer";
import InputFiled from "../inputFiled";

export default function FormAskPriceModal() {
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const [flag, setFlag] = useState(false);
  const { profileData, update } = useSelector((state) => state.PostsData);

  const { openFormPriceModal } = useSelector((state) => state.ModalReducer);
  const [editUser, setEditUser] = useState({});
  // {
  // full_name: profileData.full_name,
  //   email:profileData.email,
  //   old_password: "********",
  //   address: profileData.address,
  //   gender:profileData.gender,
  //   phone_number: profileData.phone_number,
  //   new_password: "********",
  //   bio: profileData.bio,
  //   major: profileData.major,
  // });

  useEffect(() => {
    setEditUser({
      full_name: profileData.full_name,
      email: profileData.email,
      old_password: "********",
      address: profileData.address,
      gender: profileData.gender,
      phone_number: profileData.phone_number,
      password: "********",
      bio: profileData.bio,
      major: profileData.major,
    });
  }, [profileData]);

  let withoutPassword = false;

  console.log(editUser);
  console.log(profileData);
  const onChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const handleSubmit = async () => {
    console.log(editUser);

    if (
      editUser.password === "********" ||
      editUser.old_password === "********"
    )
      withoutPassword = true;

    const config = {
      method: "post",
      url: `http://127.0.0.1:8000/api/updateData`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth().token}`,
      },

      // data: type[0] == "image" ? newPost : data1,
      data: editUser,
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
          title: "your data edit successfully",
        });

        dispatch(setUpdate());

        dispatch(handelOpenPriceModel());
      })
      .catch(function (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "red",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  return (
    <React.Fragment>
      <Modal
        show={openFormPriceModal}
        size="lg"
        position="center"
        popup={true}
        onClose={() => dispatch(handelOpenPriceModel())}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="px-6 pb-4  sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit User Data
            </h3>
            <InputFiled
              placeholder={"First Name "}
              type={"text"}
              icon={"MdFace"}
              name="full_name"
              value={editUser.full_name}
              onChange={onChange}
              validName={"none"}
            />{" "}
            <InputFiled
              placeholder={"Bio"}
              type={"text"}
              icon={"SiAboutdotme"}
              name="bio"
              value={editUser.bio}
              onChange={onChange}
              validName={"none"}
            />{" "}
            <InputFiled
              placeholder={"Major "}
              type={"text"}
              icon={"BsFillBriefcaseFill"}
              name="major"
              value={editUser.major}
              onChange={onChange}
              validName={"none"}
            />
            <InputFiled
              placeholder={"Email "}
              type={"email"}
              icon={"AiTwotoneMail"}
              name="email"
              value={editUser.email}
              onChange={onChange}
              validName={"none"}
            />
            <InputFiled
              placeholder={"Address"}
              type={"text"}
              icon={"HiLocationMarker"}
              name="address"
              value={editUser.address}
              onChange={onChange}
              validName={"none"}
            />
            <InputFiled
              placeholder={"Phone Number"}
              type={"text"}
              icon={"MdPhoneIphone"}
              name="phone_number"
              value={editUser.phone_number}
              onChange={onChange}
              validName={"none"}
            />
            <span className="flex items-center justify-center w-full p-1 mb-3 duration-200 bg-white rounded-lg hover:bg-lnav group">
              <MdFace className="m-2 text-2xl group-hover:text-white" />
              <select
                className="w-full px-2 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                aria-label="Default select example"
                style={{ transition: "all .15s ease" }}
                name="gender"
                onChange={onChange}
              >
                <option defaultValue={editUser.gender}>
                  {editUser.gender}
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </span>
            <InputFiled
              placeholder={"Old Password "}
              type={"password"}
              icon={"RiLockPasswordFill"}
              name="old_password"
              // value={editUser.old_password}
              onChange={onChange}
              validName={"none"}
            />{" "}
            <InputFiled
              placeholder={"New Password "}
              type={"password"}
              icon={"RiLockPasswordFill"}
              name="password"
              // value={editUser.password}
              onChange={onChange}
              validName={"none"}
            />
            <div className="w-full text-center">
              <button
                className="text-white bg-lnav   w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
