import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* PrivateRoute accepts a component argument that, one of them is component, 
when we pass "component" as an argument to route it has the lower case c, 
but when we render the component it has to be "Component" to let JSX know 
that we want to render a component */
const PrivateRoute = ({
  component: Component,
  auth: { is_authenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !is_authenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
