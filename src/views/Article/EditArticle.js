import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FormEditArticle from "../../components/FormEditArticle/FormEditArticle";
import ListeArticle from "../../components/ListeArticle/ListeArticle";
const EditArticle = (props) => {
  const [newState, setNewState] = useState();
  return (
    <div>
      <Row>
        <Col sm={3}>
          <ListeArticle setNewState={setNewState} newState={newState} />
        </Col>
        <Col sm={9}>
          <FormEditArticle setNewState={setNewState} />
        </Col>
      </Row>
    </div>
  );
};

export default EditArticle;
