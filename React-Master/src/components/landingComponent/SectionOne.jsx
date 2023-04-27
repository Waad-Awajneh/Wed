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
        </div>
      </div>
    </div>
  );
};
export default SectionOne;
