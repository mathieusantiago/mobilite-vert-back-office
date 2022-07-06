import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import CardImage from "../../CardImage/CardImage";
import "./index.css";
const Galerie = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className="ms-5 mt-4 mb-5">
            <CardImage/>
            <Button variant="primary">Ajouter un média</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Galerie;
