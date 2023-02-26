import Swal from "sweetalert2";
import axios from "axios";
import { setUpdate, getPosts } from "../Reducers/PostReducer";
import { handelOpenModelToEditPost } from "../Reducers/modalReducer";
export const handleEdit = (post, id, dispatch, auth, flag) => {
  console.log(flag);
  const config = {
    method: "post",
    url: `http://127.0.0.1:8000/api/editPost/${id}`,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "multipart/form-data",
      Authorization: auth,
    },
    data: {
      content: post.content,
      title: post.title,
      post_img: flag ? post.image : base64toBlob(post.image),
    },
  };

  if (post.content == "") return null;
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
      dispatch(handelOpenModelToEditPost());
      dispatch(getPosts());
      dispatch(setUpdate());
    })
    .catch(function (error) {
      console.log(error);
    });
};

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
