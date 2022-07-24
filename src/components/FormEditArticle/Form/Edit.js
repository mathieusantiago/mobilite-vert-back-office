import React, { useEffect } from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import RichEdit from '../../RichEdit/RichEdit'

const Edit = (props) => {
  useEffect(() => {
    const getCategory = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/categorie`,
        withCredentials: true,
      })
        .then((res) => {
          props.setCategorie(res.data);
        })
        .catch((err) => {
          console.log("No data article", err);
        });
    };
    getCategory();
  }, []);

  const getStoreMainPicture = () => {
    const data = sessionStorage.getItem("mainPicture");
    return data; 
  };
  console.log('test', props)
  return (
    <div>
      <Row>
        <Col sm={7}>
          <div className="ms-5">
            <FloatingLabel controlId="floatingSelect" label="Profil*">
              <Form.Select
                onChange={(e) => props.setSelectedCategorie(e.target.value)}
                aria-label="Floating label select example" value={props.selectedCategorie}
              >
                <option>""Select category""</option>;
                {props.categorie.map((element) => {
                  return <option>{element.categorie_name}</option>;
                })}
              </Form.Select>
            </FloatingLabel>
          </div>

          <div className="ms-5 mt-4">
            <FloatingLabel
              controlId="floatingSelect"
              label="Categories principale*"
            >
              <Form.Select
                onChange={(e) => props.setSelectedSubCategorie(e.target.value)}
                aria-label="Floating label select example"
                value={props.selectedSubCategorie}
              >
                <option>""Select category""</option>;
                {props.categorie
                  .filter((e) => e.categorie_name === props.selectedCategorie)
                  .map((res) => {
                    return res.categorie_type.map((c) => {
                      return <option>{c.name_type}</option>;
                    });
                  })}
              </Form.Select>
            </FloatingLabel>
          </div>
          <div className="ms-5 mt-4">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                onChange={(e) => props.setTitle(e.target.value)}
                value={props.title}

              />
              <label htmlFor="floatingInputCustom">Titre*</label>
            </Form.Floating>
          </div>

          <div className="ms-5 mt-4">
          <RichEdit value={props.chapo} setValue={props.setChapo}/>
          </div>
        </Col>
        <Col sm={5}>
          <div className="border me-3 boxGalerie">
            <div className="p-1 bg-green text-light">
              <p className="fs-3 m-0 pt-1 text-light">Création d'un article</p>
            </div>
            <img src={getStoreMainPicture()} alt="" className="imgArticle" />
            <Link to="/medialibrary?scope=article">
              <Button
                className="btnGalerie"
                variant="primary"
                onClick={() =>  props.storeDataArticle()}
              >
                Librairie de médias
              </Button>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="ms-5 mt-4 me-5">
          <RichEdit value={props.article} setValue={props.setArticle}/>
          </div>
          <div className="ms-5 mt-4 me-5">
          <RichEdit value={props.subArticle} setValue={props.setSubArticle}/>
          </div>
          <div className="ms-5 mt-4">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                onChange={(e) => props.setTags(e.target.value)}
                value={props.tags}

              />
              <label htmlFor="floatingInputCustom">Tags</label>
            </Form.Floating>
          </div>

          <div className="ms-5 mt-4 mb-5">
            <Form.Floating>
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                onChange={(e) => props.setAuthor(e.target.value)}
                value={props.author}

              />
              <label htmlFor="floatingInputCustom">Signature</label>
            </Form.Floating>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Edit;
