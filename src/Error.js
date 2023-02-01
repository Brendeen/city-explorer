import React from "react";
import { Modal } from "react-bootstrap";

class Error extends React.Component {
  render() {
    return (
      <>
       <p>{this.props.errorData}</p>
        <Modal show={this.props.errorData} onHide={this.props.closeModal}>
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Cannot complete action</p>
        </Modal.Body>
        </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default Error;