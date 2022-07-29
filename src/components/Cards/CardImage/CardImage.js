import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import "./CardImage.css";
const CardImage = (props) => {
  const [dataGalleri, setDataGalleri] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    setDataGalleri(
      JSON.parse(sessionStorage.getItem("galleryPicture")) ||
        props.galleryPicture
    );
    setState(false);
  }, [state, props.galleryPicture]);

  const deletePicture = (key) => {
    dataGalleri.splice(key, 1);
    sessionStorage.setItem("galleryPicture", JSON.stringify(dataGalleri));
    setState(true);
  };
  //urlPicture
  return (
    <div>
      <Container>
        <Row>
          {dataGalleri
            ? dataGalleri.map((data, key) => {
                return (
                  <Card className="mb-5 me-3" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      className="imgGallery"
                      src={data.urlPicture}
                    />
                    <Card.Body>
                      {key}
                      <Card.Title>{data.nom}</Card.Title>
                      <Card.Text className="contentGalleryDescription">
                        {data.description}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => deletePicture(key)}
                      >
                        <Trash className="iconTrash" />
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })
            : ""}
        </Row>
      </Container>
    </div>
  );
};

export default CardImage;
