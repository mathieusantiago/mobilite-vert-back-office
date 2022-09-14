import React, { useState } from "react";
import "./ModalCropper.css";

//Import Axios
import axios from "axios";

//Import Croper.js
import CropPicture from "react-cropper";
import "cropperjs/dist/cropper.css";

//Import React-BootStrap
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import _get from "../../utils/dataUtils";

const ModalCropper = (props) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [nom, setNom] = useState();
  const [seo, setSeo] = useState();
  const [description, setDescription] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("file", cropData);
    formData.append("upload_preset", "mathieu");

    const urlPicture = await axios
      .post(`${process.env.REACT_APP_CLOUDINARY_URL}`, formData)
      .then(
        (res) => {
          return res.data.secure_url;
        },
        (err) => {
          console.log("err", err); // Error!
        }
      );
    let data = {
      urlPicture: urlPicture,
      seo: seo,
      description: description,
      nom: nom,
    };

    _get("post", "api/gallery", data, "", "")
      .then((res) => {
        setImage("");
        setCropData("");
        setCropper("");
        props.setState(true);
        props.setLgShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        size="lg"
        show={props.lgShow}
        onHide={() => props.setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid="md">
            <div className="mt-3">
              <h5 className="text-center">Select your picture</h5>
            </div>
            <Form.Group
              controlId="formFileLg"
              className="mb-3 mt-3 d-flex justify-content-center"
            >
              <Form.Control type="file" size="sm" onChange={onChange} />
            </Form.Group>
            <Row>
              <Col className="d-flex justify-content-center">
                <h1>
                  {cropData === "" ? (
                    <Button variant="primary" onClick={getCropData}>
                      Crop Image
                    </Button>
                  ) : (
                    ""
                  )}
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                {cropData === "" ? (
                  <CropPicture
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={2}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={true}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                ) : (
                  <div className="box d-flex justify-content-center">
                    <img
                      className="img-fluid"
                      width="100%"
                      src={cropData}
                      alt="cropped"
                    />
                  </div>
                )}
              </Col>
            </Row>
            {cropData !== "" ? (
              <Row>
                <Col className="d-flex justify-content-center">
                  <p>
                    <span>
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        type="text"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Nom"
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </span>
                  </p>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Description court"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-center">
                  <p>
                    <span>
                      <Form.Label>Seo</Form.Label>
                      <Form.Control
                        type="text"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Seo"
                        onChange={(e) => setSeo(e.target.value)}
                      />
                    </span>
                  </p>
                </Col>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="primary" onClick={uploadImage}>
                    upload
                  </Button>
                </div>
              </Row>
            ) : (
              ""
            )}
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalCropper;
