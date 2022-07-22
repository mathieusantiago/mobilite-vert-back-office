import React from "react";
import { Modal, Card, CardGroup, Container, Row, Col } from "react-bootstrap";
import CardMainPreveiw from "../Cards/CardMainPreveiw/CardMainPreveiw";
import CardSharePreveiw from "../Cards/CardSharePreveiw/CardSharePreveiw";
import "./index.css";
const ModalPreview = (props) => {
  console.log("test", props.dataArticleById);
  return (
    <div>
      <Modal
        show={props.showModalPreview}
        onHide={() => props.setShowModalPreview(false)}
        fullscreen={true}
        className="modalPreview"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Prévisualisation de l'article :{" "}
            {props.dataArticleById.article_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex justify-content-center">
              <CardMainPreveiw
                article_title={props.dataArticleById.article_title}
                updatedAt={props.dataArticleById.updatedAt}
                categories={props.dataArticleById.categories}
                mainPicture={props.dataArticleById.mainPicture}
                contentSeo={props.dataArticleById.contentSeo}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <CardSharePreveiw
                article_title={props.dataArticleById.article_title}
                updatedAt={props.dataArticleById.updatedAt}
                categories={props.dataArticleById.categories}
                mainPicture={props.dataArticleById.mainPicture}
                contentSeo={props.dataArticleById.contentSeo}
              />
            </Col>
          </Row>

          <Container>
            <div className="mt-5 border p-3">
              <p className="text-center bold">
                Prévisualisation de l'article
              </p>
              <img
                src={
                  props.dataArticleById.mainPicture
                    ? props.dataArticleById.mainPicture
                    : ""
                }
                alt=""
                className="imgMainArticle"
              />
              <div
                className="pb-3"

                dangerouslySetInnerHTML={{
                  __html: props.dataArticleById.chapo,
                }}
              ></div>
              <div
                className="pb-3"
                dangerouslySetInnerHTML={{
                  __html: props.dataArticleById.content_article,
                }}
              ></div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalPreview;
