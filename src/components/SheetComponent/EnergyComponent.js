import { useEffect, useState } from "react";
import { Accordion, Row, Col, Button } from "react-bootstrap";
import _get from "../../utils/dataUtils";
import Toasts from "../Toasts/Toasts";

import "./index.css";
import  dompurify from "../../utils/dompurify";

import ModalField from "../Modal/ModalFieldEnergy";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import ModalDelete from "../Modal/ModalDelete";

const EnergyComponent = () => {
  //data
  const [dataFieldEnergy, setDataFieldEnergy] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [scope, setScope] = useState("");
  //field modale
  const [showModalField, setShowModalField] = useState();
  const [updatedComponent, setUpdatedComponent] = useState(false);
  //delete modale
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteState, setDeleteState] = useState("");
  //delete toasts
  const [contentToasts, setContentToasts] = useState("");
  const [showToasts, setShowToasts] = useState(false);
  const [toastsStyles, setToastsStyles] = useState(false);

  const toggleShowToasts = () => setShowToasts(!showToasts);
  
  const modalDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const getRole = async () => {
      _get("get", "api/fieldEnergy", "", "", "")
        .then((res) => {
          setDataFieldEnergy(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getRole();
  }, [updatedComponent, deleteState]);

  return (
    <>
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
          styles={toastsStyles}
        />
      </div>
      <ModalField
        setShowModalField={setShowModalField}
        showModalField={showModalField}
        setUpdatedComponent={setUpdatedComponent}
        scope={scope}
        toggleShowToasts={toggleShowToasts}
        selectedId={selectedId}
        dataFieldEnergy={dataFieldEnergy}
        toggleshowToasts={toggleShowToasts}
        setContentToasts={setContentToasts}
        setToastsStyles={setToastsStyles}
      />
      <ModalDelete
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        setDeleteState={setDeleteState}
        id={selectedId}
        scope={scope}
        toggleshowToasts={toggleShowToasts}
        setContentToasts={setContentToasts}
        setToastsStyles={setToastsStyles}

      />
      <div className="bg-green  pt-2 pb-2 ps-2">
        <p className="fs-3 m-2 pt-1 text-light chevron-left">
          <Row>
            <Col md={4}>Référentiel des Energies</Col>
            <Col md={{ span: 2, offset: 5 }}>
              <Button
                className="btn-header"
                onClick={() => {
                  setShowModalField(true);
                  setScope("add");
                }}
              >
                Créer une référence
              </Button>
            </Col>
          </Row>
        </p>
      </div>
      <div className="borderGreen">
        {dataFieldEnergy.map((res, index) => {
          return (
            <div key={res._id}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    {res.filed_name}
                    <div className="btnSubCat text-center">
                      <PencilFill
                        className="ms-3 pencilIcon"
                        onClick={(e) => {
                          modalDefault(e);
                          setShowModalField(true);
                          setScope("update");
                          setSelectedId(res._id);
                        }}
                      />
                      <Trash3Fill
                        className="ms-3 pencilIcon"
                        onClick={(e) => {
                          setSelectedId(res._id);
                          setShowModalDelete(true)
                          setScope("deleteRefEnergy");
                          modalDefault(e);
                        }}
                      />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-center">
                          {res.chapo_field}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: dompurify(res.content_field),
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EnergyComponent;
