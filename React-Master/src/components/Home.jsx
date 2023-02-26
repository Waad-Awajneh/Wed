
import React from "react";

import CardInfo from "./CardInfo";
import FooterComponent from "./Footer";


export default function Home(openTap) {
  const openTabs = openTap.openTap;
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            <div className={openTabs === 1 ? "block" : "hidden"} id="rand">
              {<CardInfo open={"rand"} />}
            </div>
            <div className={openTabs === 2 ? "block" : "hidden"} id="follow">
              {<CardInfo open={"follow"} />}
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
