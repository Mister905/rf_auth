import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close_modal } from "../../actions/modal";
import M from "materialize-css";

function Modal() {

  const dispatch = useDispatch();

  // const modal = useSelector(state => state.modal);

  let { modal_title, modal_body, modal_decline, modal_confirmation } = useSelector(state => state.modal);

  useEffect(() => {

    const options = {
      onCloseEnd: () => {
        instance.close();
        instance.destroy();
        dispatch(close_modal());
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };

    var elems = document.querySelectorAll(".modal");

    M.Modal.init(elems, options);

    let instance = M.Modal.getInstance(document.querySelector("#test"));

    instance.open();

  }, [close_modal]);

  return (
    <div
      id="test"
      className="modal"
    >
      <div className="modal-content">
        <h4>{modal_title}</h4>
        <p>{modal_body}</p>
      </div>
      <div className="modal-footer">
        {modal_decline && (
          <a className="modal-close waves-effect waves-red btn-flat">
            {modal_decline}
          </a>
        )}
        <a className="modal-close waves-effect waves-green btn-flat">
          {modal_confirmation}
        </a>
      </div>
    </div>
  );
}

export default Modal;
