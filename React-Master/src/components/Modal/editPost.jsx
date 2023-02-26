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
  handelOpenModelToEditPost,
  handelUpdate,
} from "../../Reducers/modalReducer";

import { useAuthUser } from "react-auth-kit";
import Swal from "sweetalert2";
import axios from "axios";
import AddPost from "../addPost";
const qs = require("qs");
export default function EditPost({ post }) {

  const [commentContent, setCommentContent] = useState({
    // content: comment.comment_content,
  });
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const { openEditPost } = useSelector((state) => state.ModalReducer);

console.log(post);
  return (
    <Fragment>
      <Dialog
    
      className={"min-w-[30%]"}
       open={openEditPost}
        handler={() => dispatch(handelOpenModelToEditPost())}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {/* <DialogHeader>Edit Post</DialogHeader>
        <DialogBody divider>
          <div className="w-full d-flex flex-start">
            <span className="flex">
      
              <img
                className="w-8 h-8 p-1 mr-3 overflow-visible rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          
                src={`data:image/jpeg;base64,${auth().user.profile_Img}`}
                                   
     
                alt="avatar"
                width="45"
                height="45"
              />
              <h5 className="font-medium text-primary dark:text-white text-l">
                {comment.user_info}
              </h5>
            </span>

            <textarea
              id="textAreaExample"
              label="Write your Post"
              className="w-full px-4 py-3 my-5 text-xs bg-gray-200 outline-none rounded-xl"
              onChange={(e) => {
                setCommentContent((pervs) => ({
                  ...pervs,
                  content: e.target.value,
                }));
              }}
              value= {comment.comment_content}
            />
             
           
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
        </DialogFooter> */}
        <AddPost isEdit={true} post={post} />
      </Dialog>
    </Fragment>
  );
}
