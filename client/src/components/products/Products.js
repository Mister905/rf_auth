import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { get_products } from "../../actions/products";
import { display_modal } from "../../actions/modal";
import { withRouter } from "react-router-dom";

class Products extends Component {

  display_modal = () => {
    this.props.display_modal("Test Title", "Test Body", "Confirm", "Cancel");
  };

  componentDidMount() {
    console.log("TEST");
    // this.props.get_products();
  }

  render() {
    return (
      <div>
        Products
        <button onClick={this.display_modal} className="btn">
          Display Modal
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
});

export default compose(
  connect(mapStateToProps, { get_products, display_modal }),
  withRouter
)(Products);
