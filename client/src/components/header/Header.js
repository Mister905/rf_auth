import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Header extends Component {
  render() {
    const { is_authenticated } = this.props.auth;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {is_authenticated ? (
                <Link to={"/logout"}>Logout</Link>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, null), withRouter)(Header);
