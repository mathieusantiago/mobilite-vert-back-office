import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Row, Col, Modal, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";
import RichEdit from "../RichEdit/RichEdit";

const ModalField = (props) => {
  const [value, setValue] = useState();
  const [titleRef, setTitleRef] = useState();
  const [headerVal, setHeaderVal] = useState();

  const [updateValue, setUpdateValue] = useState();

  const [rowUpdateData, setRowUpdateData] = useState();

  useEffect(() => {
    if (props.scope === "update") {
      setRowUpdateData(
        props.dataFieldEnergy.find((e) => e._id === props.selectedId)
      );
    }
    console.log("test", rowUpdateData);
  });

  const upDateRefEnergy = () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
    };

    _get("put", "api/fieldEnergy", data, props.selectedId, "")
      .then((res) => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été mise a jour");
        props.setToastsStyles("info");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postRefEnergy = async () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
    };

    _get("post", "api/fieldEnergy", data, "", "")
      .then((res) => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été enregistrer");
        props.setToastsStyles("info");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        show={props.showModalField}
        onHide={() => props.setShowModalField(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelles référence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="test">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Titre de la référence"
                  className="mb-3"
                  onChange={(e) => setTitleRef(e.target.value)}
                >
                  <Form.Control
                    type="text"
                    defaultValue={rowUpdateData?.filed_name}
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Col>
              <div className="test">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Entête de la référence"
                  className="mb-3"
                  onChange={(e) => setHeaderVal(e.target.value)}
                >
                  <Form.Control
                    type="text"
                    defaultValue={rowUpdateData?.chapo_field}
                  />
                </FloatingLabel>
              </div>
            </Col>
            <RichEdit
              setUpdateValue={setUpdateValue}
              value={rowUpdateData?.content_field}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setRowUpdateData("");
              props.setShowModalField(false);
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.scope === "add" ? postRefEnergy() : upDateRefEnergy();
            }}
          >
            Enregistré
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalField;
