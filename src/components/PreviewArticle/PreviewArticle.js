import React from "react";
import { Card } from "react-bootstrap";
import "./PreviewArticle.css";
const PreviewArticle = (props) => {
  const date = new Date(props.updatedAt);
  return (
    <>
      <div className="mt-5 border rounded p-3 previewArticle">
        <p className="text-center bold">Prévisualisation de l'article</p>
        <img
          src={props.mainPicture ? props.mainPicture : ""}
          alt=""
          className="imgMainArticle"
        />
        <div
          className="pb-3"
          dangerouslySetInnerHTML={{
            __html: props.chapo,
          }}
        ></div>
        <div
          className="pb-5"
          dangerouslySetInnerHTML={{
            __html: props.content_article,
          }}
        ></div>
        <br />
        <br />
      </div>
      <div className="previewArticle p-3">
        <div>
          <small className="text-muted">Auteur: {props.author}</small>
        </div>
        <div>
          <small className="text-muted ">
            Publillé le : {date.toLocaleDateString("fr-FR").substring(0, 10)}
          </small>
        </div>
      </div>
    </>
  );
};

export default PreviewArticle;
