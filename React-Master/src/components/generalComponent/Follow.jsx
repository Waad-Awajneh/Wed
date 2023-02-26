import {
    getFollowers,
    getFollowersId,
    getUserProfileData,
  } from "../../Reducers/UserReducer";
  import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";


  export const Follow = ({ id }) => {
    const dispatch = useDispatch ();
const { userProfileData, followersId, followersData } = useSelector(
    (state) => state.UserData
  );
console.log(followersData);
  const isAuthenticated = useIsAuthenticated();

  const auth = useAuthUser();
 const navigate = useNavigate();
 const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const config = {
        method: "get",
        url: `http://localhost:8000/api/getFollowers/${id}`,
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          //   Authorization: `Bearer ${auth().token}`,
        },
      };
  
      dispatch(getFollowers(config));
    }, [refresh]);
  
    useEffect(() => {
      if (followersData.length != 0) dispatch(getFollowersId());
    }, [followersData, refresh]);
  
    // useEffect(() => {
    //   const config = {
    //     method: "get",
    //     url: `http://127.0.0.1:8000/api/userProfile/${id}`,
    //     headers: {
    //       Accept: "application/vnd.api+json",
    //       "Content-Type": "application/vnd.api+json",
    //     },
    //   };
  
    //   dispatch(getUserProfileData(config));
    // }, [followersId, followersData, refresh]);
  
    /****************************************************************************************************************** */
    const HandelAddFollow = (id) => {
      const config = {
        method: "post",
        url: `http://localhost:8000/api/follow/${id}`,
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${auth().token}`,
        },
      };
  
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
            color: "black",
            title: res.data,
          });
       
          setRefresh(!refresh);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    /************************************************************************************************ */
    const HandelRemoveFollow = (id) => {
  
      const config = {
        method: "delete",
        url: `http://localhost:8000/api/unFollow/${id}`,
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${auth().token}`,
        },
      };
      axios(config)
        .then(function (res) {
          console.log(res.data);
  
          
          setRefresh(!refresh);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return (
        <button
        type="button"
        class="text-white bg-lnav w-28 h-10 hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
        onClick={() => {
          if (isAuthenticated()) {
            console.log(followersId,auth().user.user_id);
            followersId.includes(auth().user.user_id)
              ? HandelRemoveFollow(id)
              : HandelAddFollow(id);
          } else {
            navigate("/login");
          }
        }}
      >
        {isAuthenticated()
          ? followersId.includes(auth().user.user_id)
            ? "UnFollow"
            : "Follow"
          : "Follow"}
      </button>
    );
  };
  

