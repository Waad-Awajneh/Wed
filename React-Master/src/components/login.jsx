import React from "react";
import axios from "axios";
import { LoginPostConfig } from "../api/axios";
import { FaFacebookSquare } from "react-icons/fa";
import FooterComponent from "./Footer";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import InputFiled from "./inputFiled";
import { BsGoogle } from "react-icons/bs";
import Checkbox from "./checkBox";
import { useEffect, useState } from "react";
import { Email_REGEX, PWD_REGEX } from "../validation/regex";
import { useSignIn } from "react-auth-kit";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import LoginG from "../actions/googleLogin";

function Login() {
  const signIn = useSignIn();
  const [validPwd, setValidPwd] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loginUser, setLoginUser] = useState({ password: "", email: "" });
  const Navigate = useNavigate();

  useEffect(() => {
    setValidEmail(Email_REGEX.test(loginUser.email));
    setValidPwd(PWD_REGEX.test(loginUser.password));
    setErrMsg("");
  }, [loginUser]);

  const onChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios({ ...LoginPostConfig, data: loginUser })
      .then(function (response) {
        console.log(response.data.data.user);
        if (
          signIn({
            token: response.data.access_token,
            expiresIn: 5000,
            tokenType: "Bearer",
            authState: {
              user: response.data.data.user,
              token: response.data.data.access_token,
              role: response.data.data.user.role,
              google: false,
            },
          })
        ) {
          setSuccess(true);
          return Navigate("/");
        }
        console.log(response.data);
      })
      .catch(function (error) {
        Swal.fire({
          title: error.response.data.message,
          text: "Try again, please ",
          icon: "error",
          width: 500,
          showConfirmButton: true,
          confirmButtonColor: "black",

          showCloseButton: true,
          closeButtonAriaLabel: "Close",
        });
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Navbar />
      {success ? (
        Navigate("/")
      ) : (
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage: "url(" + require("./../assests/img/1.jpg") + ")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full ">
            <div className="flex content-center items-center justify-end h-full ">
              <div className="w-full 2xl:w-4/12 xl:w-5/12  lg:w-6/12 px-4">
                <div className="  relative flex flex-col min-w-0 break-words w-full mb-6 border-0 my-5 bg-white dark:bg-[#18191c] shadow-xl hover:shadow duration-200 rounded-xl">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-5">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      {/* <button
                        className="bg-white active:bg-gray-100 text-gray-800  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <BsGoogle className="w-5 mr-1" />
                        Google
                      </button> */}
                      <LoginG />
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or Be Classical</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <InputFiled
                        placeholder={"Email "}
                        type={"email"}
                        icon={"AiTwotoneMail"}
                        validName={"none"}
                        name="email"
                        onChange={onChange}
                      />
                      <InputFiled
                        placeholder={"Password "}
                        type={"password"}
                        icon={"RiLockPasswordFill"}
                        validName={"none"}
                        name="password"
                        onChange={onChange}
                      />

                      {/* <Checkbox data="Remember me" /> */}
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-wrap mt-6">
                      <div className="w-1/2 text-right">
                        <Link
                          to="/signup"
                          className="text-gray-800 hover:shadow-lg"
                        >
                          <small>Create new account</small>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {<FooterComponent />}
        </section>
      )}
    </>
  );
}

export default Login;
