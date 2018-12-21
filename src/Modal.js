import React from "react";
import { createPortal } from "react-dom";

//const modalRoot = document.getElementById("modal");
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.modalRoot = document.getElementById("modal");
  }
  componentDidMount() {
    //this.el = document.createElement("div");
    //this.modalRoot = document.getElementById("modal");
    this.modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }
  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
