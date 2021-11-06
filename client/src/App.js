import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
// Actions
import { load_active_user } from "./actions/auth";


function App() {

  const dispatch = useDispatch();

  const is_authenticated = useSelector(state => state.auth.is_authenticated);

  const display_modal = useSelector(state => state.modal.display_modal);

  useEffect(() => {

    dispatch(load_active_user());

  }, [is_authenticated]);

  return (
    <div className="App">
      <Header />
      {display_modal && <Modal />}
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/create_product" component={Create_Product} />
        <PrivateRoute exact path="/view_product/:id" component={View_Product} />
        <PrivateRoute
          exact
          path="/update_product/:id"
          component={Update_Product}
        />
      </Switch>
    </div>
  );
}

export default App;
