import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Row, Col, Modal, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";
import RichEdit from "../RichEdit/RichEdit";


const ModalField = (props) => {
  const [titleRef, setTitleRef] = useState();
  const [headerVal, setHeaderVal] = useState();
  const [cars, setCars] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [render, setRender] = useState(false);
 
  const [updateValue, setUpdateValue] = useState();
  const [filterModel, setFilterModel] = useState([]);

  const [rowUpdateData, setRowUpdateData] = useState();
  
  useEffect(() => {
    setRender(false)
    if (props.scope === "update") {
      setRowUpdateData(
        props.dataFieldEnergy.find((e) => e._id === props.selectedId)
      );
    }
    getAllCars()
  },[selectedModel, render]);


  const getAllCars = ()=>{
    _get('get', 'api/fieldModel', '', '', '')
    .then((res)=>{
      setCars(res.data)
    })

  }

  const fillterCarsToOnArray = (text)=> {
    const car = cars.filter((e)=>{
      if(e.model.includes(text.target.value)){
        return e
      }
    })
    setFilterModel(car)
  }

  const upDateRefEnergy = () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
      model: selectedModel,
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
      model: selectedModel,
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
          <Modal.Title>Créer une nouvelle référence</Modal.Title>
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
          </Row>
          <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="rechercher le modèle"
                  className="mb-3"
                >
                  <Form.Control 
                    type="email"  
                    placeholder="name@example.com" 
                    onChange={fillterCarsToOnArray}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          <Row> 
              <Col>
                {filterModel.map((e)=>{
                  if(e.isSelected === undefined){
                    Object.assign(e,{isSelected: false})
                  }
                  if(!e.isSelected){

                    return <img 
                      className='mb-2' 
                      src={e.imgCar} 
                      alt='logo marque' 
                      width="200"
                      onClick={()=>{
                      setRender(true)
                      e.isSelected = true
                      selectedModel.push(e)

                    }}/>
                  }
                })}
              </Col>
            </Row>
          <Row>
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
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalField;
