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
import PrivateRoute from "./components/routing/PrivateRoute";
// Actions
import { load_active_user } from "./actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.load_active_user();
  }

  render() {
    const { display_modal } = this.props.modal;
    return (
      <div className="App">
        <Header />
        {display_modal && <Modal />}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/products"
            component={Products}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default compose(
  connect(mapStateToProps, { load_active_user }),
  withRouter
)(App);
