import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { get_product, update_product } from "../../actions/products";
import Preloader from "../preloader/Preloader";
import { useHistory } from "react-router-dom";

function Update_Product(props) {

  const dispatch = useDispatch();

  const { loading_product, product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(get_product(props.match.params.id));
  }, [loading_product]);

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
          <div className="col m4 offset-m4 center-align">
            <h1>Update Product</h1>
          </div>
        </div>
        <Update_Product_Form props={product} />
      </div>
    );
  }
}

const Update_Product_Form = (props) => {

  const history = useHistory();

  const dispatch = useDispatch();

  const { id, name, type, weight, inventory_count } = props.props;

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: name || "",
      type: type || "",
      weight: weight || "",
      inventory_count: inventory_count || "",
    },
    onSubmit: (values) => {
      values.id = id;
      dispatch(update_product(values, history));
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="name" className="active custom-label">
            Name
          </label>
          <input id="name" type="text" name="name" {...getFieldProps("name")} />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="type" className="active custom-label">
            Type
          </label>
          <input id="type" type="text" name="type" {...getFieldProps("type")} />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="weight" className="active custom-label">
            Weight
          </label>
          <input
            id="weight"
            type="text"
            name="weight"
            {...getFieldProps("weight")}
          />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="inventory_count" className="active custom-label">
            Inventory Count
          </label>
          <input
            id="inventory_count"
            type="number"
            name="inventory_count"
            {...getFieldProps("inventory_count")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col m4 offset-m4">
          <button type="submit" className="btn right">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Update_Product;
