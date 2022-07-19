import React, { useEffect, useState } from "react";
import { Accordion, Button, ListGroup, Row, Col, Form } from "react-bootstrap";
import {
  PencilFill,
  Trash3Fill,
  PlusLg,
  ArrowDownUp,
} from "react-bootstrap-icons";

import "./AccordionCategorie.css";
import ModalCategorie from "./ModalCategorie/ModalCategorie";
import ModalSubCategorie from "./ModalCategorie/ModalSubCategorie";
import ModalDelete from "../modal/ModalDelete";
import axios from "axios";
import Toasts from "../Toasts/Toasts";
import { ReactSortable } from "react-sortablejs";

const AccordionCategorie = (props) => {
  const [categorieId, setCategorieId] = useState("");
  const [subCategorieId, setSubCategorieId] = useState(null);
  const [showModalSubCategorie, setShowModalSubCategorie] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteState, setDeleteState] = useState("");
  const [showModalCategorie, setShowModalCategorie] = useState(false);
  const [categorieData, setCategorieData] = useState(null);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [scope, setScope] = useState(null);

  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");

  const toggleShowSubToasts = () => setShowToasts(!showToasts);
  const handleShowDelete = () => setShowModalDelete(true);
  const toggleShowToasts = () => setShowToasts(!showToasts);
  console.log("dataCategorie",dataCategorie)
  useEffect(() => {
    const fetchCategorie = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/categorie`,
        withCredentials: true,
      })
        .then((res) => {
          setDataCategorie(res.data);
        })
        .catch((err) => {
          console.log("No data categorie", err);
        });
    };
    setDeleteState();
    fetchCategorie();
  }, [showModalCategorie, showModalSubCategorie, deleteState]);

  const modalDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const closeModal = () => {
    setCategorieId(categorieId);
    setShowModalCategorie();
    setCategorieData();
    setShowModalCategorie();
    setShowModalCategorie(false);
  };
  return (
    <div>
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
        />
      </div>
      {props.index === "dashBoard" ? (
        ""
      ) : (
        <div className="bg-secondary text-light pt-3 pb-3 ps-3">
          <Button onClick={() => setShowModalCategorie(true)} variant="primary">
            Ajouter à la racine
          </Button>
        </div>
      )}
      <>
        <ReactSortable list={dataCategorie} setList={setDataCategorie}>
          {dataCategorie
            ? dataCategorie.map((categorie, index) => {
                categorie.order = index;
                return (
                  <div key={categorie.id}>
                    <Accordion
                      className="test1"
                      defaultActiveKey={
                        props.index === "dashBoard"
                          ? ["0", "1"]
                          : ["0", "1", "2", "3", "4", "5"]
                      }
                    >
                      <Accordion.Item
                        className="border-0 border-bottom test2"
                        eventKey={categorie._id}
                      >
                        <Accordion.Header>
                          <ArrowDownUp className="me-3" />
                          {categorie.categorie_name}
                          <div className="btnSubCat text-center">
                            <PlusLg
                              className="pencilIcon iconsPlus"
                              onClick={(e) => {
                                modalDefault(e);
                                setCategorieId(categorie._id);
                                setShowModalSubCategorie(true);
                              }}
                            />
                            <PencilFill
                              onClick={(e) => {
                                modalDefault(e);
                                setShowModalCategorie(true);
                                setCategorieData(categorie);
                                setCategorieId(categorie._id);
                              }}
                              className="ms-3 pencilIcon"
                            />
                            <Trash3Fill
                              onClick={(e) => {
                                modalDefault(e);
                                handleShowDelete(e);
                                setCategorieId(categorie._id);
                                setScope("article");
                              }}
                              className="ms-3 pencilIcon"
                            />
                          </div>
                          <div className="btnSubCatswitch text-center">
                            <Form.Check
                              type="switch"
                              defaultChecked={categorie.state}
                            />
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="test3">
                          <ListGroup className="ms-5">
                            {categorie.categorie_type.map((type) => {
                              return (
                                <ListGroup.Item key={type.name_type}>
                                  <Row>
                                    <Col>{type.name_type}</Col>
                                    <Col className="d-flex justify-content-end">
                                      <PencilFill
                                        onClick={(e) => {
                                          modalDefault(e);
                                          setShowModalSubCategorie(true);
                                          setCategorieId(categorie._id);
                                          setSubCategorieId(type._id);
                                          setCategorieData(type);
                                        }}
                                        className="me-3 pencilIcon"
                                      />
                                      <Trash3Fill
                                        onClick={(e) => {
                                          handleShowDelete(e);
                                          setSubCategorieId(type._id);
                                          setCategorieId(categorie._id);
                                          setScope("subArticle");
                                        }}
                                        className="me-3 pencilIcon"
                                      />
                                      <Form>
                                        <Form.Check
                                          type="switch"
                                          defaultChecked={type.status}
                                        />
                                      </Form>
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                );
              })
            : ""}
        </ReactSortable>
      </>
      <ModalDelete
        subCategorieId={subCategorieId}
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        setDeleteState={setDeleteState}
        id={categorieId}
        scope={scope}
      />

      <ModalCategorie
        categorieId={categorieId}
        closeModal={closeModal}
        categorieData={categorieData}
        showModalCategorie={showModalCategorie}
        toggleshowToasts={toggleShowToasts}
        setContentToasts={setContentToasts}
      />
      <ModalSubCategorie
        categorieId={categorieId}
        categorieData={categorieData}
        showModalCategorie={showModalCategorie}
        toggleshowToasts={toggleShowToasts}
        setContentToasts={setContentToasts}
        subCategorieId={subCategorieId}
        showModalSubCategorie={showModalSubCategorie}
        setShowModalSubCategorie={setShowModalSubCategorie}
        toggleShowSubToasts={toggleShowSubToasts}
      />
    </div>
  );
};

export default AccordionCategorie;
