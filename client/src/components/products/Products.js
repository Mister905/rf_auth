import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { get_products, clear_products } from "../../actions/products";
import { display_modal } from "../../actions/modal";
import { Link, withRouter } from "react-router-dom";
import Preloader from "../preloader/Preloader";

class Products extends Component {
  display_modal = () => {
    this.props.display_modal("Test Title", "Test Body", "Confirm", "Cancel");
  };

  componentDidMount() {
    this.props.clear_products();
  }

  componentDidUpdate(prevProps) {

    if (this.props.auth.is_authenticated !== prevProps.auth.is_authenticated) {
      // Simulate Async
      setTimeout(this.props.get_products, 5000);
    }
  }

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
                  <Link to={`/update_product/${product.id}`} className="btn">
                    Update Product
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { loading_products } = this.props.products;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12">Products</div>
        </div>
        <div className="row">
          <div className="col m6">
            {loading_products ? <Preloader /> : this.output_products()}
          </div>
        </div>
        <div className="row">
          <div className="col m12">
            <button onClick={this.display_modal} className="btn">
              Display Modal
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col m12">
            <Link to={"/create_product"} className="btn">
              Create Product
            </Link>
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
  connect(mapStateToProps, { get_products, clear_products, display_modal }),
  withRouter
)(Products);
