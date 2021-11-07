import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout_user } from "../../actions/auth";

function Header() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { is_authenticated } = useSelector((state) => state.auth);

  function handle_logout() {
    dispatch(logout_user(history));
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {is_authenticated ? (
                <a onClick={handle_logout}>Logout</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
