import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
//fake data for the dev
import axios from "axios";
import "./ArticleTable.css";
import ModalDelete from "../../modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { Trash, PencilSquare, Eye } from "react-bootstrap-icons";
import ModlaPreview from "../../modal/ModalPreview";

import { useNavigate } from "react-router-dom";
import AddBtn from "../../AddBtn/AddBtn";

const ArticleTable = (props) => {
  const navigate = useNavigate();
  const [dataArticle, setDataArticle] = useState([]);
  const [dataArticleById, setDataArticleById] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [setArticleId] = useState("");
  const handleShowDelete = () => setShowModalDelete(true);
  const [showModalPreview, setShowModalPreview] = useState(false);

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

  const getArticleById = async (id) => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/article/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        setDataArticleById(res.data);
      })
      .catch((err) => {
        console.log("No data article", err);
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      center: true,
      sortable: false,
      width: "100px",

    },
    {
      name: "",
      selector: (row) => {
        return (
          <div>
            <Button className="bordered-bleu" size="sm">
              {row.profil_name}
            </Button>
          </div>
        );
      },
      center: true,
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
      center: true,
      sortable: true,

    },
    {
      name: "Catégorie",
      selector: (row) => row.categories,
      center: true,
      sortable: true,

    },
    {
      name: "createDate",
      selector: (row) => row.createdAt.split("T")[0],
      center: true,
      sortable: true,
    },
    {
      name: "updateDate",
      selector: (row) => row.updatedAt.split("T")[0],
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "status",
      selector: (row) => {
        return (
          <div>
            {row.status === "Draft" ? (
              <Button variant="outline-danger" size="sm">
                {row.status}
              </Button>
            ) : (
              <Button className="bordered-bleu" size="sm">
                {row.status}
              </Button>
            )}
          </div>
        );
      },
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      selector: (row) => (
        <div>
          <Row>
            <Col
              variant="light"
              className="btnTable pe-3"
              onClick={() => {
                setShowModalPreview(true);
                getArticleById(row._id);
              }}
            >
              <Eye />
            </Col>
            <Col
              variant="light"
              className="btnTable"
              onClick={() => {
                navigate("/editarticle?scope=edit");
              }}
            >
              <PencilSquare />
            </Col>

            <Col
              variant="light"
              className="btnTable pe-3"
              onClick={() => {
                handleShowDelete();
                setArticleId(row._id);
              }}
            >
              <Trash />
            </Col>
          </Row>
        </div>
      ),
      name: "Action",
      button: true,
      width: "150px",
      center: true,
    },
  ];
  return (
    <>
      <Container>
        {props.index === "dashBoard" ? (
          ""
        ) : (
          <div className="bg-green text-light p-1">
            <p className="fs-3 m-2 pt-1">{dataArticle.length} Article</p>
            <AddBtn scope="addArticle" />
          </div>
        )}
        <div className="borderGreen">
          <DataTable
            pagination
            columns={columns}
            data={dataArticle}
            dense={false}
            responsive={true}
            striped
          />
        </div>
      </Container>

      <ModalDelete
        scope="article"
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
      />
      <ModlaPreview
        setShowModalPreview={setShowModalPreview}
        showModalPreview={showModalPreview}
        dataArticleById={dataArticleById}
      />
    </>
  );
};

export default ArticleTable;
