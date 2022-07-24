import React from "react";
import { Modal, Card, CardGroup, Container, Row, Col } from "react-bootstrap";
import CardMainPreveiw from "../Cards/CardMainPreveiw/CardMainPreveiw";
import CardSharePreveiw from "../Cards/CardSharePreveiw/CardSharePreveiw";
import PreviewArticle from "../PreviewArticle/PreviewArticle";
import "./index.css";
const ModalPreview = (props) => {
  console.log(props.dataArticleById)
  return (
    <div>
      <Modal
        show={props.showModalPreview}
        onHide={() => props.setShowModalPreview(false)}
        fullscreen={true}
        className="modalPreview"
      >
        <Modal.Header closeButton className="previewModalHeader">
          <Modal.Title id="example-custom-modal-styling-title">
            Prévisualisation de l'article :{" "}
            {props.dataArticleById.article_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="previewModalBody">
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
                secondaryPicture={props.dataArticleById.secondaryPicture}
              />
            </Col>
          </Row>

          <Container>
            <PreviewArticle
              content_article={props.dataArticleById.content_article}
              chapo={props.dataArticleById.chapo}
              content_subarticle={props.dataArticleById.content_subarticle}
              mainPicture={props.dataArticleById.mainPicture}
              updatedAt={props.dataArticleById.updatedAt}
              author={props.dataArticleById.author}
              galleryPicture={props.dataArticleById.galleryPicture}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalPreview;
