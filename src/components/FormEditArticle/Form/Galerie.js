import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import CardImage from "../../Cards/CardImage/CardImage";
import { Link } from "react-router-dom";

import "./index.css";
const Galerie = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className="ms-5 mt-4 mb-5">
            <CardImage />
            <Link to="/medialibrary?scope=articleGallery">
              <Button variant="primary" onClick={() => props.storeDataArticle()}>Ajouter un média</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Galerie;
