import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
//fake data for the dev
import "./ArticleTable.css";
import ModalDelete from "../../Modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { Trash, PencilSquare, Eye } from "react-bootstrap-icons";
import ModlaPreview from "../../Modal/ModalPreview";

import { useNavigate } from "react-router-dom";
import AddBtn from "../../AddBtn/AddBtn";
import _get from "../../../utils/dataUtils.js";
import Toasts from "../../Toasts/Toasts";

const ArticleTable = (props) => {
  const navigate = useNavigate();
  const [dataArticle, setDataArticle] = useState([]);
  const [dataArticleById, setDataArticleById] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [articleId, setArticleId] = useState("");
  const handleShowDelete = () => setShowModalDelete(true);
  const [showModalPreview, setShowModalPreview] = useState(false);
  const [deleteState, setDeleteState] = useState("");
  const [toastsStyles, setToastsStyles] = useState("");

  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");

  const toggleShowToasts = () => setShowToasts(!showToasts);

  const paginationComponentOptions = {
    rowsPerPageText: "Select nombre par page",
    rangeSeparatorText: "sur",
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };

  useEffect(() => {
    const fetchArticle = () => {
      _get("get", "api/article", "", "", "")
        .then((res) => {
          setDataArticle(res.data);
        })
        .catch((err) => {
          console.log("No data article", err);
        });
    };
    fetchArticle();
  }, [deleteState]);

  const getArticleById = (id) => {
    _get("get", "api/article", "", id, "")
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
      wrap: true,
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
      wrap: true,
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
      wrap: true,
    },
    {
      name: "Catégorie",
      selector: (row) => row.categories,
      center: true,
      sortable: true,
    },
    {
      name: "date de création",
      selector: (row) => row.createdAt.split("T")[0],
      center: true,
      sortable: true,
    },
    {
      name: "date de mise a jour",
      selector: (row) => row.updatedAt.split("T")[0],
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "statut",
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
                navigate(`/editarticle?state=edit&id=${row._id}`);
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
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
          styles={toastsStyles}
        />
      </div>
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
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
      </Container>

      <ModalDelete
        scope="contentArticle"
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        id={articleId}
        setDeleteState={setDeleteState}
        setToastsStyles={setToastsStyles}
        setContentToasts={setContentToasts}
        toggleshowToasts={toggleShowToasts}
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
