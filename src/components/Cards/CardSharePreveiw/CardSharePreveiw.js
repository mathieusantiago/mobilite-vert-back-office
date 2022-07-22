import React from "react";
import { Card } from "react-bootstrap";
import "./CardSharePreveiw.css";
const CardSharePreveiw = (props) => {
  return (
    <div>
      <p className="text-center bold">
        Prévisualisation de la Miniatur de l'article l'or d'un partage
      </p>

      <Card className="m-2 shareCards">
        <Card.Img
          className="imgSharePreview"
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

export default CardSharePreveiw;
