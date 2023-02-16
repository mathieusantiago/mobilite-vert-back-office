import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Row, Col, Modal, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";

const ModalField = (props) => {
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [energy, setEnergy] = useState([]);

  const [tags_name, setTags_name] = useState();
  const [link_field, setLink_field] = useState([]);

  const [rowUpdateData, setRowUpdateData] = useState();

  const getAllArrayField = () => {
    _get("get", "api/fieldBrand", "", "", "")
      .then((res) => {
        setBrand(res.data);
      })
    _get("get", "api/fieldEnergy", "", "", "")
      .then((res) => {
        setEnergy(res.data);
      })
    _get("get", "api/fieldModel", "", "", "")
      .then((res) => {
        setModel(res.data);
      })
  };

  useEffect(() => {
    if (props.scope === "update") {
      setRowUpdateData(
        props.dataFieldBrand.find((e) => e._id === props.selectedId)
      );
    }

    if (props.scope === "add") {
      getAllArrayField();
    }
  }, []);

  const upDateTags = () => {
    let data = {
      tags_name: tags_name,
      link_field: link_field,
      status_tags: true,
    };

    _get("put", "api/fieldBrand", data, props.selectedId, "")
      .then((res) => {
        props.setShowModalTags(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postTags = () => {
    let data = {
      tags_name: tags_name,
      link_field: link_field,
      status_tags: true,
    };
    _get("post", "api/tags", data, "", "")
      .then((res) => {
        props.setShowModalTags(false);
        props.setUpdatedComponent(true);
        props.toggleshowToasts();
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
        show={props.showModalTags}
        onHide={() => props.setShowModalTags(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle référence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="test">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nom du Tag"
                  className="mb-3"
                  onChange={(e) => setTags_name(e.target.value)}
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
                  label="Lier une fiche"
                  className="mb-3"
                  onChange={(e) =>{
                    console.log(e.target.value)
                    setLink_field(e.target.value)
                  }}
                >
                  <Form.Select aria-label="Default select example">
                    <option></option>
                    {brand.map((b) => {
                      return (
                        <option key={b._id} value={`sheet/brand/${b._id}`}>
                          {b.filed_name}
                        </option>
                      );
                    })}
                    {energy.map((b) => {
                      return (
                        <option key={b._id} value={`sheet/engine/${b._id}`}>
                          {b.filed_name}
                        </option>
                      );
                    })}
                    {model.map((b) => {
                      return (
                        <option key={b._id} value={`sheet/model/${b._id}`}>
                          {b.filed_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </FloatingLabel>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setRowUpdateData("");
              props.setShowModalTags(false);
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              postTags()
            }}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalField;
