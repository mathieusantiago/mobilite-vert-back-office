import React from "react";
import { Carousel } from "react-bootstrap";
import  dompurify from "../../utils/dompurify";
import "./PreviewArticle.css";

const PreviewArticle = (props) => {
  const date = new Date(props.updatedAt);

  const UncontrolledExample = () => {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="imgMainArticle"
            src={props.mainPicture}
            alt="First slide"
            key={props.mainPicture}
          />
        </Carousel.Item>
        {props.galleryPicture.map((picture) => {
          return (
            <Carousel.Item key={picture.urlPicture}>
              <img
                className="imgMainArticle"
                src={picture.urlPicture}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  return (
    <>
      <div className="mt-5 border rounded p-3 previewArticle">
        <p className="text-center bold">Prévisualisation de l'article</p>
        <br />
        <div
          className="pb-3"
          dangerouslySetInnerHTML={{ __html: dompurify(props.chapo) }}
        ></div>
        {props && props.galleryPicture && props.galleryPicture.length !== 0 ? (
          <UncontrolledExample />
        ) : (
          <img
            src={props.mainPicture ? props.mainPicture : ""}
            alt=""
            className="imgMainArticle mb-3"
          />
        )}

        <div
          className="pb-5"
          dangerouslySetInnerHTML={{
            __html: dompurify(props.content_article),
          }}
        ></div>
        <div
          className="pb-5"
          dangerouslySetInnerHTML={{
            __html: dompurify(props.content_subarticle),
          }}
        ></div>
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
