import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

/* PrivateRoute accepts a component argument that, one of them is component, 
when we pass "component" as an argument to route it has the lower case c, 
but when we render the component it has to be "Component" to let JSX know 
that we want to render a component */
const PrivateRoute = ({
  component: Component,
  auth: { is_authenticated, loading_user },
  ...rest
}) => (
  <Route
    {...rest}
    render={function (props) {
      if (loading_user || !is_authenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object,
  is_authenticated: PropTypes.bool,
  loading_user: PropTypes.bool,
  component: PropTypes.element
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
