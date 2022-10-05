import React, { useEffect, useState } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Trash, Check2Circle, AspectRatio } from "react-bootstrap-icons";
import "./Gallery.css";
import ModalDelete from "../Modal/ModalDelete";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import _get from "../../utils/dataUtils";
import Toasts from "../Toasts/Toasts";
const Gallery = (props) => {
  const navigate = useNavigate();
  const [dataPicture, setDataPicture] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [pictureId, setPictureId] = useState(null);
  const [deleteState, setDeleteState] = useState("");
  const [scope, setScope] = useState("");
  const [dataGalleryPicture, setDataGalleryPicture] = useState([]);

  const [contentToasts, setContentToasts] = useState([]);
  const [showToasts, setShowToasts] = useState(false);
  const [toastsStyles, setToastsStyles] = useState(false);
  const toggleShowToasts = () => setShowToasts(!showToasts);

  const handleShowDelete = () => setShowModalDelete(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    setScope(params.get("scope"));
    getPictureInfo();
  }, [props.state, deleteState]);

  const getPictureInfo = async () => {
    _get("get", "api/gallery", "", "", "")
      .then((res) => {
        setDataPicture(res.data);
      })
      .catch((err) => {
        console.log("No data categorie", err);
      });
  };
  const storePicture = (_id) => {
    dataPicture.filter((e) => e._id === _id);
    sessionStorage.setItem(
      "mainPicture",
      dataPicture.filter((e) => e._id === _id)[0].urlPicture
    );
    navigate("/editarticle");
  };

  const storeSecondaryPicture = (_id) => {
    dataPicture.filter((e) => e._id === _id);
    sessionStorage.setItem(
      "secondaryPicture",
      dataPicture.filter((e) => e._id === _id)[0].urlPicture
    );
    navigate("/editarticle");
  };

  const storeGallery = () => {
    if (dataGalleryPicture.selectedCount !== 0) {
      sessionStorage.setItem(
        "galleryPicture",
        JSON.stringify(dataGalleryPicture.selectedRows)
      );
      navigate("/editarticle");
    }
  };

  //set data table
  const columns = [
    {
      name: "Aperçu image",
      selector: (row) => {
        return (
          <Card.Img
            alt={row.seo}
            variant="top"
            src={row.urlPicture}
            className="img"
          />
        );
      },
      center: true,
    },
    {
      name: "Titre",
      selector: (row) => {
        return <Card.Text>{row.nom}</Card.Text>;
      },
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => {
        return <Card.Text>{row.description}</Card.Text>;
      },
      sortable: true,
      center: true,
    },
    {
      name: "SEO",
      selector: (row) => {
        return <Card.Text>{row.seo}</Card.Text>;
      },
      sortable: true,
      center: true,
    },
    {
      name: "Date de création",
      selector: (row) => {
        return <Card.Text>{row.createdAt.split("T")[0]}</Card.Text>;
      },
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      selector: (row) => {
        return (
          <div>
            <Trash
              className="iconsGallery me-3"
              onClick={() => {
                handleShowDelete();
                setPictureId(row._id);
              }}
            />
            {scope !== "article" ? (
              ""
            ) : (
              <>
                <Check2Circle
                  className="iconsGallery me-3"
                  onClick={() => {
                    storePicture(row._id);
                  }}
                />
                <AspectRatio className="iconsGallery" />
              </>
            )}
            {scope !== "secondaryArticle" ? (
              ""
            ) : (
              <>
                <Check2Circle
                  className="iconsGallery me-3"
                  onClick={() => {
                    storeSecondaryPicture(row._id);
                  }}
                />
                <AspectRatio className="iconsGallery" />
              </>
            )}
            {scope !== "articleGallery" ? (
              ""
            ) : (
              <>
                <AspectRatio className="iconsGallery" />
              </>
            )}
          </div>
        );
      },
      center: true,
    },
  ];

  return (
    <Container fluid>
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
          styles={toastsStyles}
        />
      </div>
      <Row className="mt-4">
        {dataGalleryPicture.length === 0 ? (
          ""
        ) : (
          <div className="d-flex justify-content-end">
            <Button variant="outline-primary" onClick={storeGallery}>
              Ajouter la selection
            </Button>
          </div>
        )}
        {scope !== "articleGallery" ? (
          <DataTable
            pagination
            columns={columns}
            data={dataPicture}
            dense={true}
            responsive={true}
            striped
          />
        ) : (
          <DataTable
            pagination
            columns={columns}
            data={dataPicture}
            dense={true}
            responsive={true}
            striped
            selectableRows
            selectableRowsComponent={Form.Check}
            onSelectedRowsChange={(e) => {
              setDataGalleryPicture(e);
              props.setDisplayBtn(true);
            }}
          />
        )}
      </Row>
      <ModalDelete
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        id={pictureId}
        scope="picture"
        style="danger"
        setDeleteState={setDeleteState}
        setContentToasts={setContentToasts}
      />
    </Container>
  );
};

export default Gallery;
