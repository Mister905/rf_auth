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
import View_Product from "./components/view_product/View_Product";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
import PropTypes from 'prop-types';

// Actions
import { load_active_user } from "./actions/auth";

class App extends Component {
  componentDidMount = () => {
    this.props.load_active_user();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.auth.is_authenticated !== prevProps.auth.is_authenticated) {
      if (this.props.auth.is_authenticated) this.props.load_active_user();
    }
  };

  render() {

    const { display_modal } = this.props.modal;

    return (
      <div className="App">
        <Header />
        {display_modal && <Modal />}
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute
            exact
            path="/create_product"
            component={Create_Product}
          />
          <PrivateRoute
            exact
            path="/view_product/:id"
            component={View_Product}
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

App.propTypes = {
  auth: PropTypes.object,
  modal: PropTypes.object,
  display_modal: PropTypes.bool,
  is_authenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
});

export default compose(
  connect(mapStateToProps, { load_active_user }),
  withRouter
)(App);
