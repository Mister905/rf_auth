import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { login_user } from "../../actions/auth";
import PropTypes from 'prop-types';


class Login extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Login</h1>
          </div>
        </div>
        <Form>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="email" className="active custom-label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={errors.email ? "invalid" : ""}
              />
              {errors.email && (
                <span className="custom-helper-error">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="password" className="active custom-label">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={errors.password ? "invalid" : ""}
              />
              {errors.password && (
                <span className="custom-helper-error">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4">
              <button type="submit" className="btn right">
                Login
              </button>
            </div>
          </div>
        </Form>
        <div className="row registration-row">
          <div className="col m12">
            <div className="center-align">
              New User?
              <Link to={"/register"} className="register-today">
                Register Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Password is Required"),
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    props.props.login_user(values, props.props.history);
  },
})(Login);

Login.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string
};

export default compose(connect(null, { login_user }), withRouter)(FormikForm);
