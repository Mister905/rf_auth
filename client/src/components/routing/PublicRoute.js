import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/* PrivateRoute accepts a component argument that, one of them is component, 
when we pass "component" as an argument to route it has the lower case c, 
but when we render the component it has to be "Component" to let JSX know 
that we want to render a component */
const PublicRoute = ({
  component: Component,
  auth: { is_authenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={function (props) {
      if (is_authenticated) {
        return <Redirect to="/products" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PublicRoute);
