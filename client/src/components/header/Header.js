import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout_user } from "../../actions/auth";

class Header extends Component {
  handle_logout = () => {
    this.props.logout_user(this.props.history);
  };

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
                <a onClick={this.handle_logout}>Logout</a>
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

export default compose(
  connect(mapStateToProps, { logout_user }),
  withRouter
)(Header);
