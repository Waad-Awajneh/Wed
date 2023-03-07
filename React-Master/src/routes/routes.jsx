// static imports
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import FormAskPriceModal from "../components/Modal/FormAskPriceModal";
import FormConnectModal from "../components/Modal/FormConnectModal";
// dynamic imports
const App = lazy(() => import("../App"));
const Profile = lazy(() => import("../views/Profile"));
const UserProfile = lazy(() => import("../views/UserProfile"));
const Contact = lazy(() => import("../views/contact"));
const Login = lazy(() => import("../components/login"));
const About = lazy(() => import("../views/about"));
const Landing = lazy(() => import("../views/landing"));
const AddPost = lazy(() => import("../components/addPost"));
const Favorite = lazy(() => import("../views/Favorite"));
const Search = lazy(() => import("../views/Search"));
const SinglePost = lazy(() => import("../components/singlePost"));
const SignUp = lazy(() => import("../components/signUp"));
const NotFound = lazy(() => import("../views/notFoundPage"));

export const AllRoutes = (params) => {
  return (
    <BrowserRouter>
      <FormConnectModal />
      <FormAskPriceModal />

      <Suspense fallback={"Loading ....."}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home openTap={1} />} />
            <Route path="Home" element={<Home openTap={1} />} />
            <Route path="follow" element={<Home openTap={2} />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="/search" element={<Search />} />
          <Route path="/SinglePost/:id" element={<SinglePost />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
