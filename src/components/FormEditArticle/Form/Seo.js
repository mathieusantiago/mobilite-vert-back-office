import React from "react";
import { Row, Col, FloatingLabel, Form } from "react-bootstrap";
import "./index.css";
const Seo = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <div className="ms-5 mt-4">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                onChange={(e) => props.setTilteSeo(e.target.value)}
                value={props.tilteSeo}


              />
              <label htmlFor="floatingInputCustom">
                Titre court (environ 3 mots)
              </label>
            </Form.Floating>
          </div>
          <div className="ms-5 mt-4 mb-5">
            <FloatingLabel
              controlId="floatingTextareaArticle4"
              label="Saisir l'article"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "150px" }}
                onChange={(e)=> props.setContentSeo(e.target.value)}
                value={props.contentSeo}


              />
            </FloatingLabel>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Seo;
