import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { create_product } from "../../actions/products";
import PropTypes from 'prop-types';


class Create_Product extends Component {

  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Create Product</h1>
          </div>
        </div>
        <Form>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="name" className="active custom-label">
                Name
              </label>
              <Field
                id="name"
                type="text"
                name="name"
                className={errors.name ? "invalid" : ""}
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
              />
              {errors.inventory_count && (
                <span className="custom-helper-error">
                  {errors.inventory_count}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4">
              <button type="submit" className="btn right">
                Create
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({ name, type, weight, inventory_count }) {
    return {
      name: name || "",
      type: type || "",
      weight: weight || "",
      inventory_count: inventory_count || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name field is Required"),
    type: Yup.string().required("Type field is Required"),
    weight: Yup.string().required("Weight field is Required"),
    inventory_count: Yup.string().required("Inventory count field is Required"),
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    props.props.create_product(values, props.props.history);
  },
})(Create_Product);

Create_Product.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  weight: PropTypes.string,
  inventory_count: PropTypes.number
};

export default compose(
  connect(null, { create_product }),
  withRouter
)(FormikForm);
