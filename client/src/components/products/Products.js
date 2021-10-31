import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  get_products,
  clear_products,
  delete_product,
} from "../../actions/products";
import { load_active_user } from "../../actions/auth";
import { display_modal } from "../../actions/modal";
import { Link, withRouter } from "react-router-dom";
import Preloader from "../preloader/Preloader";

class Products extends Component {
  display_modal = () => {
    this.props.display_modal("Test Title", "Test Body", "Confirm", "Cancel");
  };

  componentDidMount() {
    // console.log(this.props.auth);

    // if (this.props.auth.is_authenticated) {
    //   console.log("TEST");
    //   this.props.load_active_user();
    // }

    this.props.clear_products();

    // if (this.props.auth.is_authenticated) {
    //   // Simulate Async
    setTimeout(this.props.get_products, 5000);
    // }
  }

  componentDidUpdate(prevProps) {
    // console.log("TEST1");
    // if (this.props.auth.is_authenticated !== prevProps.auth.is_authenticated) {
    //   console.log("TEST2");
    //   // Simulate Async
    //   setTimeout(this.props.get_products, 5000);
    // }

    if (this.props.products.products !== prevProps.products.products) {
      console.log("TEST3");
      this.props.get_products();
    }
  }

  handle_delete_product = (product_id) => {
    this.props.delete_product(product_id);
  };

  output_products = () => {
    const { product_list } = this.props.products;

    return (
      <ul className="collection">
        {product_list.map(function (product) {
          return (
            <li className="collection-item" key={product.id}>
              <div className="row">
                <div className="col m6">{product.name}</div>
                <div className="col m6">
                  <div className="row">
                    <div className="col m6">
                      <Link
                        to={`/update_product/${product.id}`}
                        className="btn"
                      >
                        Update
                      </Link>
                    </div>
                    <div className="col m6">
                      <button
                        className="btn"
                        onClick={(e) => this.handle_delete_product(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        }, this)}
      </ul>
    );
  };

  render() {
    const { loading_products } = this.props.products;
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m4 offset-m8">
            <div className="row">
              <div className="col m6">
                <button onClick={this.display_modal} className="btn">
                  Display Modal
                </button>
              </div>
              <div className="col m6">
                <Link to={"/create_product"} className="btn">
                  Create Product
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 align-center">
            {loading_products ? <Preloader /> : this.output_products()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, {
    get_products,
    clear_products,
    display_modal,
    delete_product,
    load_active_user,
  }),
  withRouter
)(Products);
