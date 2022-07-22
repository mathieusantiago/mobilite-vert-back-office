import React from "react";
import { Card } from "react-bootstrap";
import "./CardMainPreveiw.css";
const CardMainPreveiw = (props) => {
  return (
    <div>
      <p className="text-center bold">
        Prévisualisation de la miniatur de l'article
      </p>
      <Card className="m-2 mainCards">
        <Card.Img
          className="imgMainPreview"
          variant="top"
          src={props.mainPicture ? props.mainPicture : ""}
        />
        <Card.Body>
          <Card.Text>{props.categories}</Card.Text>
          <Card.Text>{props.article_title}</Card.Text>
          <Card.Text>{props.contentSeo}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Publillé le : {props.updatedAt}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardMainPreveiw;
