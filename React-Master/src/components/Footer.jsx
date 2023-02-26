import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

function FooterComponent() {
  return (
    <div className="flex flex-warp pt-3 mx-3 items-center bg-[#ffffff80] font-[Satisfy] justify-between text-lg hover:text-pcol ">
      <div className="flex ">
        <img
          src={require("./../assests/img/logo.png")}
          className="h-16 w-16"
          alt=" Logo"
        />
      </div>

      <ul className="px-15 text-lnav   flex font-[700] text-lg">
        <li className="px-5 text-lg hover:text-pcol ">
          <Link to="/landing">Home</Link>
        </li>
        <li className="px-5  hover:text-pcol">
          <Link to="/about">About</Link>
        </li>
        <li className="px-5  hover:text-pcol">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <span className="text-lnav text-lg mr-2 ">
        <Footer.Copyright href="/landing" by="WED" year={2022} />
      </span>
    </div>
  );
}

export default FooterComponent;
