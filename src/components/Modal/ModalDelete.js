import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const ModalDelete = (props) => {
  const [id, setId] = useState(null);
  const [subId, setSubId] = useState(null);
  let url = "";
  let method = "";
  useEffect(() => {
    setId(props.id);
    setSubId(props.subCategorieId);
  });

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    switch (props.scope) {
      case "subArticle":     
        props.setContentToasts('La sous catégorie à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/subcategorie/${id}/${subId}`;
        method = "patch";
        break;
      case "article":
        props.setContentToasts('La nouvelle catégorie à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/categorie/${id}`;
        method = "delete";
        break;
      case "picture":
        props.setContentToasts('La photo à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/gallery/${id}`;
        method = "delete";
        break;
      case "contentArticle":
        props.setContentToasts('L\'article à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/article/${id}`;
        method = "delete";
        break;
      case "deleteRole":
        props.setContentToasts('Le rôle à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/role/${id}`;
        method = "delete";
        break;
      case "deleteUser":
        props.setContentToasts('L\'utilisateur à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/user/${id}`;
        method = "delete";
        break;
      case "deleteRefEnergy":
        props.setContentToasts('La référence à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/fieldEnergy/${id}`;
        method = "delete";
        break;
      case "deleteRefBrand":
        props.setContentToasts('La référence à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/fieldBrand/${id}`;
        method = "delete";
        break;
      case "deleteRefModel":
        props.setContentToasts('La référence à bien été supprimé')
        url = `${process.env.REACT_APP_API_URL}api/fieldModel/${id}`;
        method = "delete";
        break;
      default:
        break;
    }
     axios({
      url: url,
      method: method,
      withCredentials: true,
    })
      .then((res) => {
        props.setDeleteState("update");
        props.setToastsStyles('danger')
        props.toggleshowToasts()
      })
      .catch((err) => {
        console.log(err);
      });
    props.setShowModalDelete(false);
  };

  return (
    <div>
      <Modal
        show={props.showModalDelete}
        onHide={() => props.setShowModalDelete(false)}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Suppressions de l'élément</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez vous vraiment supprimer définitivement cet élément ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.setShowModalDelete(false)}
          >
            Non
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDelete;
