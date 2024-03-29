import { Link } from "react-router-dom";
import FooterComponent from "../components/Footer";
import Header from "../components/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <section className="flex items-center h-[86vh] p-16 dark:bg-gray-900 dark:text-gray-100 font-[Satisfy]">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-lg text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>4
              <span className="text-lb">0</span>4
            </h2>
            <p className="text-3xl font-semibold md:text-4xl">
              Looks like you've found the doorway to the great nothing
            </p>
            <p className="mt-4 mb-8 text-xl font-semibold dark:text-gray-400 text-lnav">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link to={"/"}>
              <button className="px-8 py-3 font-semibold rounded shadow-xl bg-lb hover:bg-lnav dark:bg-violet-400 dark:text-gray-900">
                Back to homepage
              </button>
            </Link>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
};
export default NotFoundPage;
