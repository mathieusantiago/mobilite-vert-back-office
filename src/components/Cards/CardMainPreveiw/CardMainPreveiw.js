import React from "react";
import { Card } from "react-bootstrap";
import "./CardMainPreveiw.css";
const CardMainPreveiw = (props) => {
  const date = new Date(props.updatedAt);
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
          <Card.Text>
            <a href="#" className="text-primary">
              {props.categories}
            </a>
          </Card.Text>
          <Card.Text>{props.article_title}</Card.Text>
          <Card.Text>{props.contentSeo}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Publillé le : {date.toLocaleDateString("fr-FR").substring(0, 10)}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardMainPreveiw;
