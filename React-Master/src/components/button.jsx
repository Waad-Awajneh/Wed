function Button({page,color,name}) {
  return (
    <>
      {page == "profile" && (
        <button
          type="button"
          className="text-white bg-lnav w-28 h-10 hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol font-medium rounded-full text-sm px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
 

           >
          {name}
        </button>
      )}
      {color == "lnav" && (
        <button
          type="button"
          className="text-white bg-lnav w-24 h-10 hover:bg-lb focus:outline-none focus:ring-4 focus:ring-pcol font-medium rounded-full text-sm px-2 py-2.5 text-center mr-2 m-4 dark:bg-pcol dark:hover:bg-blue-700 dark:focus:ring-pcol"
        >
          {name}
        </button>
      )}
    </>
  );
}

export default Button;
