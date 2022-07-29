import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import FormConnect from "../../components/FormConnect/FormConnect";

import "./Home.css";

const Home = (props) => {
  return (
    <>
      <div>
        <Container>
          <Row>
            <h1 className="text-center mt-5">
              Welcome to your admin dashboard
            </h1>
            <Col className="fromConnect" md={{ span: 6, offset: 3 }}>
              <FormConnect />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
