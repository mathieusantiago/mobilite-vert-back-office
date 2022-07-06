import React, {useEffect, useState} from "react";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import "./ListeArticle.css";
const ListeArticle = (props) => {
  const navigate = useNavigate();
  const [dataArticle, setDataArticle] = useState([]);

  const handleRedirect = () => {
    sessionStorage.removeItem("dataArticle");
    sessionStorage.removeItem("mainPicture");
    navigate("/article");
  };

  useEffect(() => {
    const fetchArticle = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/article`,
        withCredentials: true,
      })
        .then((res) => {
          setDataArticle(res.data);
        })
        .catch((err) => {
          console.log("No data article", err);
        });
        props.setNewState(false)
    };
    fetchArticle();
  }, [props.newState]);

  return (
    <Row className="ms-3">
      <div className="p-1  text-light">
        {props.index === "dashBoard" ? (
          ""
        ) : (
          <p className="fs-3  bg-gray pt-2 pb-2 chevron-left text-light">
            <ChevronLeft onClick={handleRedirect} /> {dataArticle.length} Article
          </p>
        )}

        <div className="bg-light">
          {dataArticle.map((data) => {
            return (
              <div className="text-dark ms-2 border">
                <Row>
                  <Col>
                    <Button variant="secondary" size="sm">
                      {data.profil_name}
                    </Button>
                  </Col>
                  <Col>
                    <p> {data.article_title}</p>
                  </Col>
                  <Col>
                    {data.status === "Publish" ? (
                      <Button variant="success" size="sm">
                        Publié
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm">
                        Brouillon
                      </Button>
                    )}
                  </Col>
                </Row>
                <p className="text-secondary">{data.updatedAt}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </Row>
  );
};

export default ListeArticle;
