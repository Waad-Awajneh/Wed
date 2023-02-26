import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Email_REGEX,
  Phone_REGEX,
  PWD_REGEX,
  USER_REGEX,
} from "../validation/regex";
import { FaFacebookSquare } from "react-icons/fa";
import InputFiled from "./inputFiled";
import { BsGoogle } from "react-icons/bs";
import Checkbox from "./checkBox";
import FooterComponent from "./Footer";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { MdFace } from "react-icons/md";
import { SignUpPostConfig } from "../api/axios";
import { useSignIn } from "react-auth-kit";
import LoginG from "../actions/googleLogin";
import Swal from "sweetalert2";

function SignUp() {
  const signIn = useSignIn();
  const userRef = useRef();
  const errRef = useRef();
  const Navigate = useNavigate();

  const [validName, setValidName] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  const [validAddress, setValidAddress] = useState("none");

  const [validPhone, setValidPhone] = useState(false);

  const [validPwd, setValidPwd] = useState(false);

  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [signUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    phone_number: "",
    password_confirmation: "",
    profile_image: "",
  });

  useEffect(() => {
    setValidName(USER_REGEX.test(signUpUser.name));
    setValidPhone(Phone_REGEX.test(signUpUser.phone_number));
    setValidEmail(Email_REGEX.test(signUpUser.email));
    setValidPwd(PWD_REGEX.test(signUpUser.password));
    setValidMatch(signUpUser.password === signUpUser.password_confirmation);
    setErrMsg("");
  }, [signUpUser]);

  const onChange = (e) => {
    setSignUpUser({
      ...signUpUser,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName) {
      Swal.fire({
        title: "Invalid name must be more than 4 characters long",
        text: "Try again, please ",
        icon: "error",
        width: 500,
        showConfirmButton: true,
        confirmButtonColor: "black",

        showCloseButton: true,
        closeButtonAriaLabel: "Close",
      });
      return;
    }
    if (!validEmail || !validPwd) {
      setErrMsg();
      Swal.fire({
        title: "Invalid email or password ",
        text: "Try again, please ",
        icon: "error",
        width: 500,
        showConfirmButton: true,
        confirmButtonColor: "black",

        showCloseButton: true,
        closeButtonAriaLabel: "Close",
      });
      return;
    }
    if (!validPhone) {
      setErrMsg("Invalid Phone number");
      Swal.fire({
        title: "Invalid Phone number",
        text: "Try again, please ",
        icon: "error",
        width: 500,
        showConfirmButton: true,
        confirmButtonColor: "black",

        showCloseButton: true,
        closeButtonAriaLabel: "Close",
      });
      return;
    }
    if (!validMatch) {
      setErrMsg("Unmatched password");
      Swal.fire({
        title: "Unmatched password",
        text: "Try again, please ",
        icon: "error",
        width: 500,
        showConfirmButton: true,
        confirmButtonColor: "black",

        showCloseButton: true,
        closeButtonAriaLabel: "Close",
      });
      return;
    }

    await axios({ ...SignUpPostConfig, data: signUpUser })
      .then(function (response) {
        if (
          signIn({
            token: response.data.token,
            expiresIn: 1000,
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
      })
      .catch(function (error) {
        console.log(error);
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
      });
  };

  return (
    <>
      <Navbar />
      {success ? (
        Navigate("/")
      ) : (
        <section className="relative w-full h-full z-0">
          <div
            className="absolute top-0 w-full h-[92%] bg-gray-900"
            style={{
              backgroundImage: "url(" + require("./../assests/img/1.jpg") + ")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="container cover:max-w-full md:mx-auto px-4 py-6 h-full ">
            <div className="flex content-center items-center justify-end h-full ">
              <div className="w-full 2xl:w-5/12 xl:w-6/12  lg:w-8/12 xss: px-4">
                <div className=" relative  flex flex-col  break-words w-full mb-6 border-0 my-5 bg-white dark:bg-[#18191c] shadow-xl hover:shadow   rounded-xl">
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
                        placeholder={"First Name "}
                        type={"text"}
                        icon={"MdFace"}
                        validName={validName}
                        name="name"
                        onChange={onChange}
                      />
                      <InputFiled
                        placeholder={"Email "}
                        type={"email"}
                        icon={"AiTwotoneMail"}
                        validName={validEmail}
                        name="email"
                        onChange={onChange}
                      />

                      <span className=" mb-3 w-full p-1 rounded-lg bg-white hover:bg-lnav flex items-center justify-center  duration-200 group">
                        <MdFace className="text-2xl group-hover:text-white m-2" />
                        <select
                          className="border-0 px-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          aria-label="Default select example"
                          style={{ transition: "all .15s ease" }}
                          onChange={onChange}
                          name="gender"
                        >
                          <option defaultValue="Female">Gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                      </span>
                      <InputFiled
                        placeholder={"Address"}
                        type={"text"}
                        icon={"HiLocationMarker"}
                        validName={validAddress}
                        name="address"
                        onChange={onChange}
                      />
                      <InputFiled
                        placeholder={"Phone Number"}
                        type={"text"}
                        icon={"MdPhoneIphone"}
                        validName={validPhone}
                        name="phone_number"
                        onChange={onChange}
                      />
                      <InputFiled
                        placeholder={"Password "}
                        type={"password"}
                        icon={"RiLockPasswordFill"}
                        validName={validPwd}
                        name="password"
                        onChange={onChange}
                      />
                      <InputFiled
                        placeholder={"Confirm Password "}
                        type={"password"}
                        icon={"RiLockPasswordFill"}
                        validName={validMatch}
                        name="password_confirmation"
                        onChange={onChange}
                      />
                      {/* <Checkbox
                        data="I agree to the terms and conditions.
"
                      /> */}
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                          // disabled={
                          //   !validName || !validPwd || !validMatch
                          //     ? true
                          //     : false
                          // }
                        >
                          SignUp
                        </button>
                      </div>
                    </form>
                    <div className="flex flex-wrap mt-6">
                      <div className="w-1/2">
                        {/* <Link
                          href="#pablo"
                          className="text-gray-800 hover:shadow-lg"
                        >
                          <small>Forgot password?</small>
                        </Link> */}
                      </div>
                      <div className="w-1/2 text-right">
                        <Link
                          to="/login"
                          className="text-gray-800 hover:shadow-lg"
                        >
                          <small>Already Have account</small>
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

export default SignUp;
