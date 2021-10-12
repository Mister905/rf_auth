import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

class Landing extends Component {

  render() {
    return (
      <div>
        Landing
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default compose(
  connect(mapStateToProps, {}),
  withRouter
)(Landing);
