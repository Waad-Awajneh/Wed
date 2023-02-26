import { RiImageEditFill } from "react-icons/ri";

function ImageComponent({image,gender,setProfilePic}) {
    return (
      <>
        <img
                        alt="..."
                        // src={require("../assests/img/pro.jpg")} //profile_Img
                        src={
                          image != null
                            ? `data:image/jpeg;base64,${image}`
                            : gender == "Female"
                            ? "https://media.istockphoto.com/vectors/default-placeholder-profile-icon-vector-id666545148?k=6&m=666545148&s=170667a&w=0&h=ycJvJHz6ZMWsErum0XpjVabgZsP8dib2feSIJ5dIWYk="
                            : "https://th.bing.com/th/id/OIP.P07J6hJbgyuIm-DlaSAlLQAAAA?pid=ImgDet&rs=1"
                        }
                        className="peer shadow-xl rounded-full h-auto align-middle border-none group-hover:block absolute -m-16 -ml-20 lg:-ml-16  top-[80px] 
                          "
                        style={{ maxWidth: "160px", width:"160px" ,height:"160px"}}
                      />
                   
                      <label
                        for="dropzone-file2"
                        className="peer-hover:visible hover:visible invisible   shadow-xl rounded-full h-auto  align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 top-[80px]
                        bg-gray-600 opacity-60  
                        " style={{ maxWidth: "160px", width:"160px" ,height:"160px"}}
                      >
                    {<RiImageEditFill className="hover:visible absolute w-40 h-16 top-12" color="#fff" />}
                 </label>
                      <input
                        id="dropzone-file2"
                        type="file"
                        class="hidden"
                        onChange={(e) => {
                          setProfilePic((pervs) => ({
                            ...pervs,
                            profile_Img: e.target.files[0],
                          }));
                        }}
                      />
      </>
    );
  }
  
  export default ImageComponent;
  