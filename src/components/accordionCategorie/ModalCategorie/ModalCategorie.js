import React, { useState, useContext, useEffect } from "react";
import { Button, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { UidContext } from "../../AppContext";
import _get from "../../../utils/dataUtils";

const ModalCategorie = (props) => {
  const [DataCategorie_name, setCategorie_name] = useState("");
  const [DataDescription, setDescription] = useState("");
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const uid = useContext(UidContext);

  useEffect(() => {
    setId(props.categorieId);
    setData(props.categorieData);
  },[]);
  const handleCategorieSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (data === null) {
      let datas = {
        categorie_name: DataCategorie_name,
        creating_id: uid,
        categorie_type: [],
        description: DataDescription,
        state,
        order: 0,
      };

      _get("post", "api/categorie", datas, "", "").catch((err) => {
        console.log(err);
      });
      props.setContentToasts(
        "Enregistrement de la nouvelle catégorie effectué"
      );
    } else {
      let datas = {
        categorie_name: DataCategorie_name,
        categorie_type: data?.categorie_type,
        description: DataDescription,
        state,
      };
      _get("put", "api/categorie", datas, id, "").catch((err) => {
        console.log(err);
      });
      props.setContentToasts(
        "Enregistrement de la nouvelle catégorie effectué"
      );
    }
    props.toggleshowToasts();
    props.closeModal(false);
    setCategorie_name(null);
    setDescription(null);
    setState(null);
    setData(null);
  };

  return (
    <div>
      <Modal
        show={props.showModalCategorie}
        onHide={() => props.closeModal()}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuration de l'élément</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div className=" mt-4">
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  onChange={(e) => setCategorie_name(e.target.value)}
                  defaultValue={data?.categorie_name}
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
                defaultChecked={data?.state}
              />
            </Form>

            <div className="mt-4">
              <FloatingLabel
                controlId="floatingTextareadescription"
                label="Description*"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={data?.description}
                />
              </FloatingLabel>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeModal}>
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
