import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";

function HomeGallery({ data, profile }) {
  const profileData = [...data].reverse();
  const [items, setItems] = useState([]);

  const { update } = useSelector((state) => state.PostsData);
  const [page, setPage] = useState(4);

  useEffect(() => {
    fetchData(page);
  }, [page, update]);

  const fetchData = (page) => {
    const newItems = [];

    if (page <= profileData.length) {
      for (let i = 0; i < page; i++) {
        newItems.push(profileData[i]);
      }
    } else {
      for (let i = 0; i < profileData.length; i++) {
        newItems.push(profileData[i]);
      }
    }

    setItems([...newItems]);
  };
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 4);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items, update]);

  if (items.length == 0 && data.length == 0)
    return (
      <>
        <h3 className="mb-16 card:mt-16">
          Expand your network and stay informed by following others.
          <Link
            to={"/"}
            className="text-lg ml-2 font-bold text-lnav font-[Satisfy]"
          >
            <span>Follow now</span>
          </Link>
        </h3>
      </>
    );

  return (
    <>
      {profile == "profile" ? (
        <>
          <div className="m-5 grid grid-flow-row overflow-scroll scroll-my-0.5 scroll-smooth hover:scroll-auto scrollbar cover:gap-1 gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pmi900:pm1400:grid-cols-3 xl:grid-cols-4 ">
            {items.slice(-page).map((cardinfo) => (
              <Card key={cardinfo.id} cards={cardinfo} />
            ))}
          </div>
          {page <= data.length ? (
            <Link
              className="font-normal text-lnav shadow-lg hover:text-pcol p-2"
              onClick={() => setPage((prev) => prev + 4)}
            >
              Show more
            </Link>
          ) : (
            <Link
              className="font-normal text-lnav shadow-lg hover:text-pcol p-2"
              onClick={() => window.scroll(0, 0)}
            >
              Return Top
            </Link>
          )}
        </>
      ) : (
        // <div className="m-5 grid grid-flow-row gap-8 text-neutral-600 cover:gap-3  cover:grid-cols-2 cover:m-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div className="m-5 grid grid-flow-row gap-8 text-neutral-600 cover:gap-4  cover:grid-cols-1 cover:m-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  pmi1400:grid-cols-5">
          {data.map((cardinfo) => (
            <Card key={cardinfo.id} cards={cardinfo} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomeGallery;
