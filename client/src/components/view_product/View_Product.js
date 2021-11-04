import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { get_product, clear_product } from "../../actions/products";
import Preloader from "../preloader/Preloader";

class View_Product_Form extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <Form>
        <div className="row mt-50">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="name" className="active custom-label">
              Name
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              className={errors.name ? "invalid" : ""}
              disabled
            />
            {errors.name && (
              <span className="custom-helper-error">{errors.name}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="type" className="active custom-label">
              Type
            </label>
            <Field
              id="type"
              type="text"
              name="type"
              className={errors.type ? "invalid" : ""}
              disabled
            />
            {errors.type && (
              <span className="custom-helper-error">{errors.type}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="weight" className="active custom-label">
              Weight
            </label>
            <Field
              id="weight"
              type="text"
              name="weight"
              className={errors.weight ? "invalid" : ""}
              disabled
            />
            {errors.weight && (
              <span className="custom-helper-error">{errors.weight}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="inventory_count" className="active custom-label">
              Inventory Count
            </label>
            <Field
              id="inventory_count"
              type="number"
              name="inventory_count"
              className={errors.inventory_count ? "invalid" : ""}
              disabled
            />
            {errors.inventory_count && (
              <span className="custom-helper-error">
                {errors.inventory_count}
              </span>
            )}
          </div>
        </div>
      </Form>
    );
  }
}

const View_Product_HOC = withFormik({
  mapPropsToValues: (props) => {
    const { id, name, type, weight, inventory_count } =
      props.props.products.product;
    return {
      name: name || "",
      type: type || "",
      weight: weight || "",
      inventory_count: inventory_count || "",
    };
  },
})(View_Product_Form);

class View_Product extends Component {
  componentDidMount() {
    this.props.clear_product();
    this.props.get_product(this.props.match.params.id);
  }

  render() {
    const { loading_product, product } = this.props.products;
    if (loading_product) {
      return (
        <div className="container mt-100">
          <div className="row">
            <div className="col m12 center-align">
              <Preloader />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row mt-50">
            <div className="col m4 offset-m8">
              <Link to={`/update_product/${product.id}`} className="btn">
                Update
              </Link>
            </div>
          </div>
          <View_Product_HOC props={this.props} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default compose(
  connect(mapStateToProps, { get_product, clear_product }),
  withRouter
)(View_Product);
