import { lazy, Suspense } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import App from "../App";
// import AddPost from "../components/addPost";
import Home from "../components/Home";
// import Login from "../components/login";
import FormAskPriceModal from "../components/Modal/FormAskPriceModal";
import FormConnectModal from "../components/Modal/FormConnectModal";
// import SignUp from "../components/signUp";
// import SinglePost from "../components/singlePost";
// import About from "../views/about";
// import Contact from "../views/contact";
// import Favorite from "../views/Favorite";
// import Landing from "../views/landing";
// import { NotFound } from "../views/notFoundPage";
// import Profile from "../views/Profile";
// import Search from "../views/Search";
// import UserProfile from "../views/UserProfile";

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
  const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      <FormConnectModal />
      <FormAskPriceModal />

      <Suspense fallback={"Loading ....."}>
        <Routes>
          <Route exact path="/" element={<App />}>
            <Route exact index element={<Home openTap={1} />} />
            <Route exact path="Home" element={<Home openTap={1} />} />
            <Route exact path="follow" element={<Home openTap={2} />} />
          </Route>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/:id" element={<UserProfile />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/Landing" element={<Landing />} />
          <Route exact path="/AddPost" element={<AddPost />} />
          <Route exact path="/Favorite" element={<Favorite />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/SinglePost/:id" element={<SinglePost />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
