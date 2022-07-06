import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
//fake data for the dev
import axios from "axios";
import "./ArticleTable.css";
import ModalDelete from "../../modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { Trash, PencilSquare } from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";
import AddBtn from "../../AddBtn/AddBtn";

const ArticleTable = (props) => {
  const navigate = useNavigate();
  const [dataArticle, setDataArticle] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [articleId, setArticleId] = useState("");
  const handleShowDelete = () => setShowModalDelete(true);
  

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
    };
    fetchArticle();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      center:true,
      sortable: false,
    },
    {
      name: "",
      selector: (row) => {
        return (
          <div>
            <Button variant="outline-primary" size="sm">
              {row.profil_name}
            </Button>
          </div>
        );
      },
      center:true,
      sortable: false,
    },
    {
      name: "Titre",
      selector: (row) => {
        return (
          <div>
            <span> {row.article_title}</span>
          </div>
        );
      },
      center:true,
      sortable: true,
    },
    {
      name: "Catégorie",
      selector: (row) => row.categories,
      center:true,
      sortable: true,
    },
    {
      name: "createDate",
      selector: (row) => row.createdAt.split("T")[0],
      center:true,
      sortable: true,
    },
    {
      name: "updateDate",
      selector: (row) => row.updatedAt.split("T")[0],
      center:true,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => {
        return (
          <div>
            <Button variant="outline-primary" size="sm">
              {row.status}
            </Button>
          </div>
        );
      },
      center:true,
      sortable: true,
    },
    {
      selector: (row) => (
        <div>
          <Row>
            <Col
              variant="light"
              className="btnTable"
              onClick={() => {
                navigate("/editarticle");
              }}
            >
              <PencilSquare />
            </Col>

            <Col
              variant="light"
              className="btnTable"
              onClick={() => {
                handleShowDelete();
                setArticleId(row._id)
              }}
            >
              <Trash />
            </Col>
          </Row>
        </div>
      ),
      name: "Action",
      button: true,
      width: "100px",
      center:true,
    },
  ];
  return (
    <>
      <Container>
        {props.index === "dashBoard" ? (
          ""
        ) : (
          <div className="bg-secondary text-light p-1">
            <p className="fs-3 m-2 pt-1">{dataArticle.length} Article</p>
            <AddBtn scope="addArticle" />
          </div>
        )}

        <DataTable
          pagination
          columns={columns}
          data={dataArticle}
          dense={false}
          responsive={true}
          striped
        />
      </Container>

      <ModalDelete scope="article" showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} />
    </>
  );
};

export default ArticleTable;
