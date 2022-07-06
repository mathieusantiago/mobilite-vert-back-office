import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../components/AppContext";
import AccordionCategorie from "../../components/accordionCategorie/AccordionCategorie";
import ArticleTable from "../../components/Tables/ArticleTable/ArticleTable";
import Spinner from "../../components/Spinner/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
const Dashboard = () => {
  const uid = useContext(UidContext);
  const [index, setIndex] = useState("");
  useEffect(() => {
    setIndex("dashBoard");
  });
  return (
    <div>
      {uid ? (
        <div>
          <h1 className="text-center">Dashbord</h1>
          <Container className="border p-3">
            <Row>
              <Col md={6}>
                <div>
                  <h3 className="text-center">Liste des carégories</h3>
                  <AccordionCategorie index={index} />
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <h3 className="text-center">Liste des articles</h3>
                  <ArticleTable index={index} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <Spinner titleSpinner="Patienter nous vous connectons a votre DashBoard" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
