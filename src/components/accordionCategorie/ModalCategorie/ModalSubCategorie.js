import React, { useState, useEffect } from "react";
import { Button, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";

const ModalCategorie = (props) => {
  const [id, setId] = useState(null);
  const [subCategorieId, setSubCategorieId] = useState("");
  const [DataCategorie_name, setCategorie_name] = useState("");
  const [DataDescription, setDataDescription] = useState("");
  const [state, setState] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setId(props.categorieId);
    setSubCategorieId(props.subCategorieId);
    setData(props.categorieData);
  });

  const handleCategorieSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (data == null) {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/subcategorie/${id}`,
        data: {
          name_type: DataCategorie_name,
          description: DataDescription,
          status: state,
        },
        withCredentials: true,
      })
        .then((res) => {
          props.showModalCategorie("update");
        })
        .catch((err) => {
          console.log(err);
        });
      props.setContentToasts(
        "Enregistrement de la nouvelle sous-catégorie effectué"
      );
    } else {
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/subcategorie/sub/${id}/${subCategorieId}`,
        data: {
          name_type: DataCategorie_name,
          description: DataDescription,
          status: state,
        },
        withCredentials: true,
      })
        .then((res) => {
          props.showModalCategorie("update");
        })
        .catch((err) => {
          console.log(err);
        });
      props.setContentToasts(
        "Enregistrement de la nouvelle sous-catégorie effectué"
      );
    }
    props.toggleShowSubToasts();
    props.setShowModalSubCategorie(false);
    setCategorie_name(null);
    setDataDescription(null);
    setState(null);
    setData(null);
  };

  return (
    <div>
      <Modal
        show={props.showModalSubCategorie}
        onHide={() => props.setShowModalSubCategorie(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuration de l'élément sub</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className=" mt-4">
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  onChange={(e) => setCategorie_name(e.target.value)}
                  defaultValue={data?.name_type}
                />
                <label htmlFor="floatingInputCustom">Nom*</label>
              </Form.Floating>
            </div>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Statut"
                onChange={(e) => setState(e.target.checked)}
                defaultChecked={data?.status}
              />
            </Form>
            <div className="mt-4">
              <FloatingLabel controlId="floatingTextareadescription" label="Description*">
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    setDataDescription(e.target.value);
                  }}
                  defaultValue={data?.description}
                />
              </FloatingLabel>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.setShowModalSubCategorie(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleCategorieSubmit}>
            Save Chadddnges
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCategorie;
