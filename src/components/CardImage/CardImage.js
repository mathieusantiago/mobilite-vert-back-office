import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";

const CardImage = (props) => {
  const [dataGalleri, setDataGalleri] = useState([]);

  useEffect(() => {
    setDataGalleri(JSON.parse(sessionStorage.getItem("galleryPicture")));
  }, []);
//urlPicture
  return (
    <div>
      <Container>
        <Row>
        {dataGalleri?dataGalleri.map((data) => {
          console.log(data);
          return (
              <Card className="mb-5 me-3" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={data.urlPicture} />
                <Card.Body>
                  <Card.Title>{data.nom}</Card.Title>
                  <Card.Text>
                    {data.description}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
          );
        }):""}
        </Row>
      </Container>
    </div>
  );
};

export default CardImage;
