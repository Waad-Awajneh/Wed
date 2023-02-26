import { useDispatch } from "react-redux";
import {  setUpdate, setUpdateImage } from "../Reducers/PostReducer";
import Swal from "sweetalert2";
import axios from "axios";



 export const handleEdit = (profile_Img,url,token,image_type) => {

    // if (profile_Img == "") return null;

    var FormData = require("form-data");
    var data = new FormData();
    data.append(image_type, profile_Img);

    var config = {
      method: "post",
      url:url,// "http://localhost:8000/api/editProfilePic",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {

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
          title: response.data.message,
        });

      })
      .catch(function (error) {
        console.log(error);
      });
 
  };
