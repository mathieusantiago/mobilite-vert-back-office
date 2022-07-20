import React from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "./index.css";
import RichEdit from '../../RichEdit/RichEdit'

const Presentation = (props) => {
  return (
    <div>
      <Row>
        <Col sm={7}>
          <div className="ms-5">
            <FloatingLabel
              controlId="floatingSelect"
              label="Categories secondaires"
            >
              <Form.Select
                aria-label="Floating label select example"
                onChange={(e) => {
                  props.setPresCategorie(e.target.value);
                }}
                value={props.presCategorie}
              >
                <option>""Select category""</option>;
                {props.categorie.map((element) => {
                  return <option>{element.categorie_name}</option>;
                })}
              </Form.Select>
            </FloatingLabel>
          </div>
        </Col>
        <Col sm={5}>
          <div className="border me-3 boxGalerie">
            <div className="p-1 bg-green text-light">
              <p className="fs-3 m-0 pt-1 text-light">Création d'un article</p>
            </div>
            <Button className="btnGalerie" variant="primary">
              Librairie de médias
            </Button>
          </div>
        </Col>
        <Col>
          <div className="ms-5 mt-4 me-5">
            <Form.Check
              type="checkbox"
              id="checkbox"
              label="Mettre en une"
              onChange={(e) => {
                props.setPutInOne(e.target.checked);
              }}
              checked={props.putInOne}
            />
            <Form.Check
              type="checkbox"
              id="checkbox"
              label="Ne pas afficher sur la home"
              onChange={(e) => {
                props.setNotDisplayHomepage(e.target.checked);
              }}
              checked={props.notDisplayHomepage}
            />
            <Form.Check
              type="checkbox"
              id="checkbox"
              label="Sans publicité"
              onChange={(e) => {
                props.setWithoutPub(e.target.checked);
              }}
              checked={props.withoutPub}
            />
          </div>
          <div className="ms-5 mt-4">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                onChange={(e) => {
                  props.setPresTitle(e.target.value);
                }}
                value={props.presTitle}
              />
              <label htmlFor="floatingInputCustom">
                Titre star (environ 10 mots)
              </label>
            </Form.Floating>
          </div>

          <div className="ms-5 mt-4">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                onChange={(e) => {
                  props.setPresChapo(e.target.value);
                }}
                value={props.presChapo}
              />
              <label htmlFor="floatingInputCustom">
                Titre court (environ 3 mots)
              </label>
            </Form.Floating>
          </div>
          <div className="ms-5 mt-4 mb-5">
            <RichEdit value={props.presArticle} setValue={props.setPresArticle}/>

            {/* <FloatingLabel
              controlId="floatingTextareaArticle3"
              label="Saisir l'article"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "150px" }}
                onChange={(e) => {
                  props.setPresArticle(e.target.value);
                }}
                value={props.presArticle}
              />
            </FloatingLabel> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Presentation;
