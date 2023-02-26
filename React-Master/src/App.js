import TabsRender from "./components/TabsRender";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import CardInfo from "./components/CardInfo";
import Home from "./components/Home";
import GeneralHeader from "./components/generalComponent/GeneralHeader";
import { useIsAuthenticated } from "react-auth-kit";
import Navbar from "./components/Navbar";

function App(props) {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      {isAuthenticated() ? <Header /> : <Navbar />}

      <TabsRender />
      <Outlet />
    </>
  );
}

export default App;
