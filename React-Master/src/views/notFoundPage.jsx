
import { Button, Footer } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../components/Footer";
import Header from "../components/Header";

export const NotFound = ({ children }) => {

  return (
    <>
    <Header/>
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100 font-[Satisfy]">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-lg text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>4<span className="text-lb">0</span>4
			</h2>
			<p className="text-3xl font-semibold  md:text-4xl">Looks like you've found the
          doorway to the great nothing
</p>
			<p className="mt-4 mb-8 dark:text-gray-400 text-lnav text-xl font-semibold">
                But don't worry, you can find plenty of other things on our homepage.</p>
	    <Link to={"/"}  
  >	<button  className="px-8 bg-lb hover:bg-lnav   shadow-xl py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
Back to homepage
	</button>		
    </Link>
    </div>
	</div>
</section>
<FooterComponent/>
</>
  );
};
