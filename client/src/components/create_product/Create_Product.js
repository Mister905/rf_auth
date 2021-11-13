import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { create_product } from "../../actions/products";
import { useHistory } from "react-router-dom";

function Create_Product() {

  const history = useHistory();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      type: "",
      weight: "",
      inventory_count: "",
    },
    onSubmit: (values) => {
      dispatch(create_product(values, history));
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
            Create
          </button>
        </div>
      </div>
    </form>
  );
}

export default Create_Product;
