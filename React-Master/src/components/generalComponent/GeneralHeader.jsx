import { Link, useNavigate } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai/";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";

export default function GeneralHeader(props) {
  const isAuth = useIsAuthenticated();
  const auth = useAuthUser();
  const logout = useSignOut();
  const navigate = useNavigate();

  return (
    <>

      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close" />
        </div>
        <div className="search-btn search-switch">
          <i className="fa fa-search" />
        </div>
        <div className="header__top--canvas">
          <div className="ht-info">
            <ul>
              <li>
                <Link to={"/Blog"}>News</Link>
              </li>
              <li>
                <Link to={"/Community"}>Community</Link>
              </li>

              <li>
                <Link to={"/About"}>About us</Link>
              </li>
              <li>
                <Link to={"Contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="ht-links">
            <a href={"/https://www.facebook.com/HAYYA-107115075582816"}>
              <GrFacebookOption />{" "}
            </a>
            <a
              href={"https://www.linkedin.com/company/hayya/?viewAsMember=true"}
            >
              <AiFillLinkedin />
            </a>

            <a href={"https://twitter.com/jardat_rama"}>
              <AiFillTwitterCircle />{" "}
            </a>
            <a href={"https://www.youtube.com/@hayya3947"}>
              <AiOutlineYoutube />
            </a>
          </div>
        </div>
        <ul className="main-menu mobile-menu">
          <li className="active">
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/Contact"}>Contact Us</Link>
          </li>
          <li>
            <Link to={"/Profile"}>Profile</Link>
            <ul className="dropdown">
              <li
                className="text-danger"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <i class="fas fa-sign-out-alt"></i>Logout
              </li>
            </ul>
          </li>
        </ul>
        <div id="mobile-menu-wrap" />
      </div>

      <header className="header-section">
        <div className="header__top" style={{ height: 45 }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ht-info">
                  {isAuth() ? (
                    <ul>
                      <li>
                        <Link to={"/profile"}>
                          {auth().user.firstName} {auth().user.lastName}
                        </Link>
                      </li>
                      <li
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <i class="fas fa-sign-out-alt"></i> Logout
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <Link to={"login"}>Sign in</Link>
                      </li>

                      <li>
                        <Link to={"register"}>Register</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ht-links">
                  <a href={"/https://www.facebook.com/HAYYA-107115075582816"}>
                    <GrFacebookOption />{" "}
                  </a>
                  <a
                    href={
                      "https://www.linkedin.com/company/hayya/?viewAsMember=true"
                    }
                  >
                    <AiFillLinkedin />
                  </a>

                  <a href={"https://twitter.com/jardat_rama"}>
                    <AiFillTwitterCircle />{" "}
                  </a>
                  <a href={"https://www.youtube.com/@hayya3947"}>
                    <AiOutlineYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 align-self-center">
                <div className="logo">
                  <Link to={""}>
                    <img src="img/logo.png" alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="nav-menu">
                  <ul className="main-menu m-0">
                    <li className="active">
                      <Link to={""}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/Blog"} className="">
                        News
                      </Link>
                    </li>
                    {isAuth() ? (
                      <li>
                        <Link to={"/Community"}>Community</Link>
                      </li>
                    ) : (
                      ""
                    )}

                    <li>
                      <Link to={"/About"}>About us</Link>
                    </li>
                    <li>
                      <Link to={"Contact"}>Contact Us</Link>
                    </li>
                    {isAuth() ? (
                      <li>
                        <Link to={"/Profile"}>Profile</Link>
                        <ul className="dropdown">
                          <li>
                            <Link to={""} className="text-danger">
                              <i class="fas fa-sign-out-alt"></i> Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>

                </div>
              </div>
            </div>
            <div className="canvas-open">
              <i className="fa fa-bars" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
