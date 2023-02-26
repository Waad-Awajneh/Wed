import React from "react";
import { MdFace } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { MdPhoneIphone } from "react-icons/md";

import { AiTwotoneMail } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { SiAboutdotme } from "react-icons/si";

function InputFiled(props) {
  return (
    <div className="relative w-full mb-3">
      <span className="flex items-center justify-center w-full p-1 duration-200 bg-white rounded-lg hover:bg-lnav group">
        {props.icon == "RiLockPasswordFill" ? (
          <RiLockPasswordFill className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "AiTwotoneMail" ? (
          <AiTwotoneMail className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "MdFace" ? (
          <MdFace className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "HiLocationMarker" ? (
          <HiLocationMarker className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "MdPhoneIphone" ? (
          <MdPhoneIphone className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "BsFillBriefcaseFill" ? (
          <BsFillBriefcaseFill className="m-2 text-2xl group-hover:text-white" />
        ) : props.icon == "SiAboutdotme" ? (
          <SiAboutdotme className="m-2 text-2xl group-hover:text-white" />
        ) : (
          ""
        )}
        <input
          type={props.type}
          className={
            "border-0 px-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" +
            (props.validName == "none"
              ? "   focus:ring-blue-gray-800 "
              : props.validName
              ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
              : "bg-red-50 border border-red-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400")
          }
          placeholder={props.placeholder}
          style={{ transition: "all .15s ease" }}
          name={props.name}
          onChange={(e) => props.onChange(e)}
          value={props.value}
        />
      </span>
    </div>
  );
}

export default InputFiled;
