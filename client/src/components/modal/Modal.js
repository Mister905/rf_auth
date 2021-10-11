import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { close_modal } from "../../actions/modal";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onCloseEnd: () => {
        instance.close();
        instance.destroy();
        this.props.close_modal();
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };

    M.Modal.init(this.Modal, options);

    let instance = M.Modal.getInstance(this.Modal);

    instance.open();
  }

  render() {
    const { modal_title, modal_body, modal_confirmation, modal_decline } = this.props.modal;
    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default compose(
  connect(mapStateToProps, { close_modal }),
  withRouter
)(Modal);
