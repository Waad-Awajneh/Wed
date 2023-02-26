import { Link } from "react-router-dom";

const SectionOne = () => {
  return (
    <div
      className="w-full h-full mb-10 pb-10 px-6 xl:px-0 "
      style={{
        backgroundImage: `url(${require("./../../assests/img/10.jpg")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-5xl mx-auto sm:max-w-xl md:max-w-2xl">
        <div className="text-center">
          <div className="flex -w-xl  pt-80 mb-5 md:mx-auto sm:text-center md:mb-7 bg-[#ffffff80]">
            <span className="relative inline-block left-16">
              <img
                alt="..."
                src={require("./../../assests/img/logo.png")}
                className="absolute top-10 left-24 z-0 hidden w-32 -mt-28  text-blue-gray-100 lg:w-54 lg:-ml-28 lg:-mt-10 sm:block shadow-xl rounded-full h-auto align-middle border-none   "
                style={{ maxWidth: "200px" }}
              />
            </span>
            <span className=" w-xl my-10 font-serif text-5xl font-bold leading-none tracking-tight text-pcol sm:text-4xl md:mx-auto">
              <h2>WED</h2>
              <p className=" text-4xl text-pcol ml-5 mb-5 ">
                Wedding Planner Hub
              </p>
            </span>
          </div>

          {/* <Link
            to="/landing#sectionTwo"
            aria-label="Scroll down"
            className="flex flex-warp items-center justify-center w-14 h-14 flex-col mx-auto text-lnav duration-300 transform border border-lnav rounded-full hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 hover:shadow hover:scale-110"
          >
            <div className=" text-xs h-4 items-center text-center font-bold text-lnav">
              Explore
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
            </svg>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default SectionOne;
