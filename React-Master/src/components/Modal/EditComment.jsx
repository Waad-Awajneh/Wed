import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelOpenModelToEditComment,
  handelUpdate,
} from "../../Reducers/modalReducer";

import { useAuthUser } from "react-auth-kit";
import Swal from "sweetalert2";
import axios from "axios";
const qs = require("qs");
export default function EditComment({ comment }) {

  const [commentContent, setCommentContent] = useState({
    content: comment.comment_content,
  });
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const { openEditComment } = useSelector((state) => state.ModalReducer);


  const config = {
    method: "put",
    url: `http://127.0.0.1:8000/api/editComment/${comment.comment_id}`,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${auth().token}`,
    },
    data: qs.stringify({
      comment: commentContent.content,
    }),
  };
  const handleEdit = () => {
    if (commentContent.content == "") return null;
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
          title: res.data.message,
        });

        dispatch(handelUpdate());

      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <Dialog
className={"min-w-[30%]"}
open={openEditComment}
        handler={() => dispatch(handelOpenModelToEditComment())}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Comment</DialogHeader>
        <DialogBody divider>
          <div className="d-flex flex-start w-full">
            <span className="flex">
      
              <img
                className="p-1 mr-3 w-8 h-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 overflow-visible"
          
                src={`data:image/jpeg;base64,${auth().user.profile_Img}`}
                                   
     
                alt="avatar"
                width="45"
                height="45"
              />
              <h5 className="text-primary dark:text-white font-medium text-l">
                {comment.user_info.name}
              </h5>
            </span>

            <textarea
              id="textAreaExample"
              label="Write your Post"
              className="rounded-xl w-full bg-gray-200 outline-none py-3 px-4 text-xs my-5"
              onChange={(e) => {
                setCommentContent((pervs) => ({
                  ...pervs,
                  content: e.target.value,
                }));
              }}
              value= {commentContent.content}
              // {comment.comment_content}
            />
{             console.log(comment)
}           
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setCommentContent((pervs) => ({
                ...pervs,
                content: comment.comment_content,
              }));
              dispatch(handelOpenModelToEditComment());
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="brown"
            onClick={() => {
              handleEdit();
              dispatch(handelOpenModelToEditComment());
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
