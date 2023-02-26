import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../Reducers/modalReducer";

import { AiOutlineClose } from "react-icons/ai";

import AddPost from "../addPost";

export default function ModalAddPost({ open }) {
  const { isOpen } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();


  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(closeModal())}
          
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#00000099] backdrop-blur-sm " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex flex-wrap-reverse items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel  className="flex flex-row-reverse p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl  cover:p-0 cover:pt-6 rounded-2xl">
                  {
                    // <div   className="flex items-center justify-center w-12 h-12 rounded-full  bg-pcol gard">
                           <AiOutlineClose
                    size={"30px"}
                   className="items-center hover:text-red-700 "
                   onClick={() => dispatch(closeModal())}
                      
                    />
                    // </div>
               
                  }

                  {<AddPost isEdit={false} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
