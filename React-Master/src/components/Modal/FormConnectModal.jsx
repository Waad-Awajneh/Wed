import axios from "axios";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Radio,
  Textarea,
  TextInput,
} from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { handelOpenFormModel } from "../../Reducers/modalReducer";
import { isEmpty } from "../../validation/regex";

export default function FormConnectModal() {
  const dispatch = useDispatch();

  const { openFormModal } = useSelector((state) => state.ModalReducer);

  {
    /*************************************************************************** */
  }
  const id = useParams();
  const auth = useAuthUser();

  const [newMsg, setNewMsg] = useState({
    message: "",
    contact_method: "",
    address: "",
    event_date: "",
    name: "",
    phone_number: "",
    email: "",
  });

  const handleAddNewMsg = () => {
    const config = {
      method: "post",
      url: `http://localhost:8000/api/sendMessage/2`,
      // ${id},

      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${auth().token}`,
      },

      data: newMsg,
    };

    console.log(newMsg);

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
          title: "your Message send successfully",
        });
        dispatch(handelOpenFormModel());
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
  {
    /*************************************************************************** */
  }

  return (
    <React.Fragment>
      <Modal
        show={openFormModal}
        size="lg"
        position="center"
        popup={true}
        onClose={() => dispatch(handelOpenFormModel())}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Message Vendor
            </h3>
            <div className=" xss:cover:w-[48%]  xss:cover:inline-block  xss:cover:mr-[2%] block  ">
              <div className="block mb-2 ">
                <Label htmlFor="flName" value="First and Last Name" />
              </div>
              <TextInput
                id="flName"
                name="name"
                placeholder="First Last"
                required={true}
                onChange={(e) => {
                  setNewMsg((pervs) => ({ ...pervs, name: e.target.value }));
                }}
              />
            </div>
            <div className=" xss:cover:w-[47%]  xss:cover:inline-block block">
              <div className="block mb-2">
                <Label htmlFor="phone" value="Phone Number" />
              </div>
              <TextInput
                id="phone"
                name="phone_number"
                placeholder="07xxxxxxxx"
                required
                onChange={(e) => {
                  setNewMsg((pervs) => ({
                    ...pervs,
                    phone_number: e.target.value,
                  }));
                }}
              />
            </div>
            <div className=" xss:cover:w-[48%]  xss:cover:mr-[2%] xss:cover:inline-block  block">
              <div className="block mb-2">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
                placeholder="name@gmail.com"
                required
                onChange={(e) => {
                  setNewMsg((pervs) => ({ ...pervs, email: e.target.value }));
                }}
              />
            </div>
            <div className=" xss:cover:w-[48%]  xss:cover:mr-[2%] xss:cover:inline-block  block">
              <div className="block mb-2">
                <Label htmlFor="address" value="Your address" />
              </div>
              <TextInput
                id="address"
                name="address"
                placeholder="Amman , Jordan "
                required
                onChange={(e) => {
                  setNewMsg((pervs) => ({ ...pervs, address: e.target.value }));
                }}
              />
            </div>
            <div className=" xss:cover:w-[47%]  xss:cover:inline-block  block">
              <div className="block mb-2">
                <Label htmlFor="date" value="Event Date" />
              </div>
              <TextInput
                name="event_date"
                id="date"
                type="date"
                required={true}
                onChange={(e) => {
                  setNewMsg((pervs) => ({
                    ...pervs,
                    event_date: e.target.value,
                  }));
                }}
              />
            </div>

            <div id="textarea">
              <div className="block mb-2">
                <Label htmlFor="message" value="Your message" />
              </div>
              <Textarea
                id="message"
                placeholder="  Leave a message..."
                required
                rows={4}
                name="message"
                onChange={(e) => {
                  setNewMsg((pervs) => ({ ...pervs, message: e.target.value }));
                }}
              />
            </div>

            <fieldset className="flex gap-4" id="radio">
              <legend>Preferred contact method</legend>
              <div className="flex items-center gap-2">
                <Radio
                  required
                  id="phoneR"
                  name="contact_method"
                  value="phone"
                  defaultChecked={false}
                  onChange={(e) => {
                    setNewMsg((pervs) => ({
                      ...pervs,
                      contact_method: e.target.value,
                    }));
                  }}
                />
                <Label htmlFor="phoneR">Phone</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  required
                  id="email"
                  name="contact_method"
                  value="email"
                  defaultChecked={false}
                  onChange={(e) => {
                    setNewMsg((pervs) => ({
                      ...pervs,
                      contact_method: e.target.value,
                    }));
                  }}
                />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  required
                  id="video"
                  name="contact_method"
                  value="video"
                  defaultChecked={false}
                  onChange={(e) => {
                    setNewMsg((pervs) => ({
                      ...pervs,
                      contact_method: e.target.value,
                    }));
                  }}
                />
                <Label htmlFor="united-state">Video Chat</Label>
              </div>
            </fieldset>

            <div className="w-full text-center">
              {console.log(isEmpty(newMsg))}
              {console.log(newMsg)}
              {isEmpty(newMsg) ? (
                <button
                  disabled
                  // onClick={handleAddNewMsg}
                  className="text-white bg-gray-400 cursor-not-allowed   w-[11rem] h-[3.5rem]  font-[600]  focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
                >
                  Send
                </button>
              ) : (
                <button
                  className="text-white bg-lnav  w-[11rem] h-[3.5rem]  font-[600] hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol  rounded-full text-xl px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
                  onClick={handleAddNewMsg}
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
