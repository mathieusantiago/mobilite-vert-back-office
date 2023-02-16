import axios from "axios";
import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Row, Col, Modal, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";
import RichEdit from "../RichEdit/RichEdit";

const ModalField = (props) => {
  const [titleRef, setTitleRef] = useState();
  const [headerVal, setHeaderVal] = useState();

  const [updateValue, setUpdateValue] = useState();

  const [rowUpdateData, setRowUpdateData] = useState();

  const [modelsCars, setModelsCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedCarTitle, setSelectedCarTitle] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (props.scope === "update") {
      setRowUpdateData(
        props.dataFieldModel.find((e) => e._id === props.selectedId)
      );
    }
  },[selectedCar]);


  const countKeybord = (e)=> {
    setCounter(count => count + 1);
    if(counter > 3){
      getCarsModel(e.target.value)
    }
  }

  const getCarsModel = (brand)=> {
    if(brand !== ""){
      
    }
    const options = {
      method: 'GET',
      url: `https://all-cars.p.rapidapi.com/cars/${brand}`,
      headers: {
        'X-RapidAPI-Key': '7074615ad6msh83b9727f16d8ae0p139d97jsn68dfffaf8589',
        'X-RapidAPI-Host': 'all-cars.p.rapidapi.com'
      }
    };
    if(brand !== ""){
      axios(options)
      .then((res)=>{
        setModelsCars(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }

  }

  const upDateRefModel = () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
      model:selectedCarTitle,
      imgCar:selectedCar
    };

    _get("put", "api/fieldModel", data, props.selectedId, "")
      .then((res) => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été mise a jour");
        props.setToastsStyles("info");
        setSelectedCarTitle('')
        setSelectedCar('')
        setCounter('')
        setModelsCars([])
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postRefModel = async () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
      model:selectedCarTitle,
      imgCar:selectedCar
    };  

    _get("post", "api/fieldModel", data, "", "")
      .then((res) => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été enregistrer");
        props.setToastsStyles("info");
        setSelectedCarTitle('')
        setSelectedCar('')
        setCounter('')
        setModelsCars([])

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
                    disabled
                    defaultValue={rowUpdateData?.chapo_field}
                  />
                </FloatingLabel>
              </div>
            </Col>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="rechercher modéle par marques"
                  className="mb-3"
                >
                  <Form.Control 
                    type="email"  
                    placeholder="name@example.com" 
                    onChange={countKeybord}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                  {selectedCar !== ""?(
                    <div className='mb-2 ms-3'>
                        <div>
                          <p>{selectedCarTitle}</p>
                          <img className='mb-3' src={selectedCar} alt='logo marque' width="200" />
                        </div>
                    </div>
                    ):""
                  }
                  {selectedCar !== ""? "":                 
                    <div className='modelScrollDiv mb-2'>
                      {selectedCar !== "" ? " ffds":(modelsCars.map((model)=>{
                          return (
                            model.img?(
                              <div className='logoModel border border-dark'>
                                <p className='ms-1 m-0'>{model.title}</p>
                                <img className="m-1 " 
                                src={model.img?model.img:""} 
                                key={model.title} alt="logo marque" 
                                width="155" 
                                onClick={()=>{
                                  setSelectedCar(model.img) 
                                  setSelectedCarTitle(model.title)
                                }}/>
                              </div>
                              ):(<p></p>)
                          )
                        }))}
                  </div>}
              </Col>
            </Row>
            <Row>
              <Col>
                <RichEdit
                  setUpdateValue={setUpdateValue}
                  value={rowUpdateData?.content_field}
                />
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setRowUpdateData("");
              setSelectedCarTitle('')
              setSelectedCar('')
              setModelsCars([])
              setCounter('')
              props.setShowModalField(false);
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.scope === "add" ? postRefModel() : upDateRefModel();
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
