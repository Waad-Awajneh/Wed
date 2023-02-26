export const LoginPostConfig = {
  method: "post",
  url: "http://localhost:8000/api/login",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
};
export const LoginGooglePostConfig = {
  method: "post",
  url: "http://localhost:8000/api/googleLogin",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
};

export const SignUpPostConfig = {
  method: "post",
  url: "http://localhost:8000/api/register",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
};
export const SignUpGooglePostConfig = {
  method: "post",
  url: "http://localhost:8000/api/googleRegister",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
};
export const SignUpOrLogin = {
  method: "post",
  url: "http://localhost:8000/api/SignUpOrLogin",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
};

// const signInFunction = async (res) => {
//   await axios({
//     ...LoginGooglePostConfig,
//     data: { email: res.profileObj.email },
//   })
//     .then(function (response) {
//       console.log(response);
//       if (
//         signIn({
//           token: response.data.access_token,
//           expiresIn: 5000,
//           tokenType: "Bearer",
//           authState: {
//             user: response.data.data.user,
//             token: response.data.data.access_token,
//             role: response.data.data.user.role,
//           },
//         })
//       ) {
//         return navigate("/");
//       }
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       Swal.fire({
//         title: error.response.data.message,
//         text: "Try again, please ",
//         icon: "error",
//         width: 500,
//         showConfirmButton: true,
//         confirmButtonColor: "black",
//         showCloseButton: true,
//         closeButtonAriaLabel: "Close",
//       });
//       console.log(error.response.data.message);
//     });
// };
// const signUp = async (res) => {
//   await axios({
//     ...SignUpGooglePostConfig,
//     data: {
//       email: res.profileObj.email,
//       name: res.profileObj.name,
//       password: `${res.profileObj.googleId}-${res.profileObj.name}`,
//       profile_Img: res.profileObj.imageUrl,
//     },
//   })
//     .then(function (response) {
//       console.log(response.data.data.user);
//       if (
//         signIn({
//           token: response.data.access_token,
//           expiresIn: 5000,
//           tokenType: "Bearer",
//           authState: {
//             user: response.data.data.user,
//             token: response.data.data.access_token,
//             role: response.data.data.user.role,
//           },
//         })
//       ) {
//         setSuccess(true);
//         return navigate("/");
//       }
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       Swal.fire({
//         title: error.response.data.message,
//         text: "Try again, please ",
//         icon: "error",
//         width: 500,
//         showConfirmButton: true,
//         confirmButtonColor: "black",
//         showCloseButton: true,
//         closeButtonAriaLabel: "Close",
//       });
//       console.log(error.response.data.message);
//     });
// };
