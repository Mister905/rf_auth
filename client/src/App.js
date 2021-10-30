import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
// Components
import Landing from "./components/landing/Landing";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Create_Product from "./components/create_product/Create_Product";
import Update_Product from "./components/update_product/Update_Product";
import PrivateRoute from "./components/routing/PrivateRoute";
// Actions
import { load_active_user } from "./actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.load_active_user();
  }

  render() {
    const { display_modal } = this.props.modal;
    const { is_authenticated } = this.props.auth;

    return (
      <div className="App">
        <Header />
        {display_modal && <Modal />}
        <Switch>
          <Route
            exact
            path="/"
            component={is_authenticated ? Products : Landing}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute
            exact
            path="/create_product"
            component={Create_Product}
          />
          <PrivateRoute
            exact
            path="/update_product/:id"
            component={Update_Product}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
});

export default compose(
  connect(mapStateToProps, { load_active_user }),
  withRouter
)(App);
