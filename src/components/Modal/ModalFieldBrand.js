import axios from "axios";
import React, { useState, useEffect } from "react";
import { FloatingLabel, Button, Row, Col, Modal, Form } from "react-bootstrap";
import _get from "../../utils/dataUtils";
import RichEdit from "../RichEdit/RichEdit";
import './index.css'
const ModalField = (props) => {
  const [titleRef, setTitleRef] = useState();
  const [headerVal, setHeaderVal] = useState();

  const [updateValue, setUpdateValue] = useState();

  const [rowUpdateData, setRowUpdateData] = useState();
  const [flags, setFlags] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedFlags, setSelectedFlags] = useState();
  const [counter, setCounter] = useState(0);
  const [filterModel, setFilterModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [render, setRender] = useState(false);
 

  useEffect(() => {
    setRender(false)
    if (props.scope === "update") {
      setRowUpdateData(
        props.dataFieldBrand.find((e) => e._id === props.selectedId)
      );
    }
    getAllCars()
  },[selectedFlags, selectedModel, render]);

  const countKeybord = (e)=> {
    setCounter(count => count + 1);
    if(counter > 1){
      getFlag(e.target.value)
    }
  }

  const getFlag = (flag)=> {
    if(flag !== ""){
      axios.get(`https://api.brandfetch.io/v2/search/${flag}`)
      .then((res)=>{
        setFlags(res.data)
      })
    }
  }

  const getAllCars = ()=>{
    _get('get', 'api/fieldModel', '', '', '')
    .then((res)=>{
      setCars(res.data)
    })

  }

  const upDateRefBrand = () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
      brandFlag: selectedFlags,
      model: selectedModel,
    };

    _get("put", "api/fieldBrand", data, props.selectedId, "")
      .then((res) => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été mise a jour");
        props.setToastsStyles("info");
        setSelectedFlags('')
        setFlags([])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fillterCarsToOnArray = (text)=> {
    const car = cars.filter((e)=>{
      if(e.model.includes(text.target.value)){
        return e
      }
    })
    setFilterModel(car)
  }

  const postRefBrand = async () => {
    let data = {
      filed_name: titleRef,
      content_field: updateValue,
      chapo_field: headerVal,
      brandFlag: selectedFlags,
      model: selectedModel,
    };

    _get("post", "api/fieldBrand", data, "", "")
      .then(() => {
        props.setShowModalField(false);
        props.setUpdatedComponent(true);
        props.toggleShowToasts();
        props.setContentToasts("La référence a bien été enregistrer");
        props.setToastsStyles("info");
        setSelectedFlags('')
        setFlags([])
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
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="rechercher le logo de la marque"
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
                {selectedFlags?(<img src={selectedFlags} alt='logo marque' width="55" />):(flags.map((flag)=>{
                  return (
                    flag.icon?(<img className="m-1 logoBrand" src={flag.icon?flag.icon:""} key={flag.icon} alt="logo marque" width="55" onClick={()=>setSelectedFlags(flag.icon)}/>):(<p></p>)
                  )
                }))}
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="rechercher le modéle"
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
              setSelectedFlags('')
              setFlags([])
            }}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.scope === "add" ? postRefBrand() : upDateRefBrand();
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
