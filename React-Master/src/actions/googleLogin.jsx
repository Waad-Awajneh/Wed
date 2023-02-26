import React, { useEffect } from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "./refreshToken";
// import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

import { CLIENT_ID } from "./../constant/googleLoginConstant";
import { LoginGooglePostConfig, SignUpGooglePostConfig } from "../api/axios";
import { useSignIn } from "react-auth-kit";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function LoginG() {
  //   const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);

  const signIn = useSignIn();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = async (response) => {
    console.log(response);

    refreshTokenSetup(response);
    await axios({
      ...LoginGooglePostConfig,
      data: {
        email: response.profileObj.email,
        name: response.profileObj.name,
        password: `${response.profileObj.googleId}-${response.profileObj.name}`,
        profile_Img: response.profileObj.imageUrl,
      },
    })
      .then(function (response) {
        console.log(response);
        if (
          signIn({
            token: response.data.access_token,
            expiresIn: 5000,
            tokenType: "Bearer",
            authState: {
              user: response.data.data.user,
              token: response.data.data.access_token,
              role: response.data.data.user.role,
              google: true,
            },
          })
        ) {
          setSuccess(true);
          return navigate("/");
        }
        console.log(response.data);
      })
      .catch(function (error) {
        signUp(error);
        // Swal.fire({
        //   title: error.response.data.message,
        //   text: "Try again, please ",
        //   icon: "error",
        //   width: 500,
        //   showConfirmButton: true,
        //   confirmButtonColor: "black",
        //   showCloseButton: true,
        //   closeButtonAriaLabel: "Close",
        // });
        // console.log(error.response.data.message);
      });
  };
  const signUp = async (error) => {
    console.log(error);
    // await axios({
    //   ...SignUpGooglePostConfig,
    //   data: {
    //     email: response.profileObj.email,
    //     name: response.profileObj.name,
    //     password: `${response.profileObj.googleId}-${response.profileObj.name}`,
    //     profile_Img: response.profileObj.imageUrl,
    //   },
    // }).then(function (response) {
    //   console.log(response.data.data.user);
    //   if (
    //     signIn({
    //       token: response.data.access_token,
    //       expiresIn: 5000,
    //       tokenType: "Bearer",
    //       authState: {
    //         user: response.data.data.user,
    //         token: response.data.data.access_token,
    //         role: response.data.data.user.role,
    //       },
    //     })
    //   ) {
    //     setSuccess(true);
    //     return navigate("/");
    //   }
    //   console.log(response.data);
    // });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        className="bg-white active:bg-gray-100 text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // cookiePolicy={"single_host_origin"}

        isSignedIn={true}
      />
    </div>
  );
}

export default LoginG;
