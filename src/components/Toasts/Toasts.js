import React from "react";
import { Row, Col, Toast } from "react-bootstrap";
import NavLogo from "../../assets/Logo_Greenmove.png";
import "./Toasts.css";
const Toasts = (props) => {
  return (
    <div>
      <Row>
        <Col className="mb-2 me-3">
          <Toast
            show={props.showToasts}
            onClose={props.toggleshowToasts}
            delay={3000}
            bg="info"
            autohide
          >
            <Toast.Header>
              <img src={NavLogo} className="rounded me-2 toastsLogo" alt="" />
              <strong className="me-auto"></strong>
            </Toast.Header>
            <Toast.Body>{props.contentToasts}</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </div>
  );
};

export default Toasts;
