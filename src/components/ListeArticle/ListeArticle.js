import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Piging from "./Paging";
import axios from "axios";
import "./ListeArticle.css";

const ListeArticle = (props) => {
  const navigate = useNavigate();
  const [dataArticle, setDataArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlePerPage] = useState(10);

  const handleRedirect = () => {
    sessionStorage.removeItem("dataArticle");
    sessionStorage.removeItem("mainPicture");
    sessionStorage.removeItem("galleryPicture");
    sessionStorage.removeItem("secondaryPicture");
    navigate("/article");
  };

  const indexOfLastArticle = currentPage * articlePerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlePerPage;
  const currentArticle = dataArticle.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

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
      props.setNewState(false);
    };
    fetchArticle();
  }, [props.newState]);

  const paginate = (pageNumbre) => {
    const maxPage = Math.ceil(dataArticle.length / articlePerPage);
    if (pageNumbre <= maxPage && pageNumbre >= 1) {
      setCurrentPage(pageNumbre);
    }
  };

  return (
    <Row className="ms-3">
      <div className="borderGreen text-light">
        {props.index === "dashBoard" ? (
          ""
        ) : (
          <p className="fs-3 bg-green pt-2 pb-2 chevron-left text-light">
            <ChevronLeft onClick={handleRedirect} /> {dataArticle.length}{" "}
            Article
          </p>
        )}

        <div className="bg-light">
          {currentArticle.map((data) => {
            return (
              <div className="text-dark ms-2 border" key={data.profil_name}>
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
        <Piging
          paginate={paginate}
          articlePerPage={articlePerPage}
          totalArticle={dataArticle}
        />
      </div>
    </Row>
  );
};

export default ListeArticle;
