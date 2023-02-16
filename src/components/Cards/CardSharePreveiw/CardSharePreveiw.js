/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import "./CardSharePreveiw.css";
const CardSharePreveiw = (props) => {
  const date = new Date(props.updatedAt);

  return (
    <div>
      <p className="text-center bold">
        Prévisualisation de la Miniature de l'article lors d'un partage
      </p>

      <Card className="m-2 shareCards">
        <Card.Img
          className="imgSharePreview"
          variant="top"
          src={
            props.secondaryPicture ? props.secondaryPicture : props.mainPicture
          }
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
            Publié le : {date.toLocaleDateString("fr-FR").substring(0, 10)}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
}; 

export default CardSharePreveiw;
