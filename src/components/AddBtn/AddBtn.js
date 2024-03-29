import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";
import "./AddBtn.css";
import _get from "../../utils/dataUtils";
const AddBtn = (props) => {
  const navigate = useNavigate();

  const handleSelectScope = () => {
    switch (props.scope) {
      case "addArticle":
        navigate("/editarticle", { state: props.scope });
        break;
      case "changeOrderCatégorie":
        for (let dataCat of props.dataCategorie) {
          const toastContent =
            "Modification de l'ordre des catégories enregistré";
          updateCategorie(dataCat, dataCat._id, toastContent);
        }
        break;
      case "changecheckedCatégorie":
        for (let dataCat of props.dataCategorie) {
          const toastContent =
            "désactivation/activation de la catégorie enregistré";
          updateCategorie(dataCat, dataCat._id, toastContent);
        }
        break;
      case "changecheckedSubCatégorie":
        for (let dataCat of props.dataCategorie) {
          const toastContent =
            "désactivation/activeation de la catégorie enregistré";
          updateCategorie(dataCat, dataCat._id, toastContent);
        }
        break;
      default:
        break;
    }
  };
 
  const updateCategorie = (dataCat, id, toastContent) => {
    let data = {
      categorie_name: dataCat.categorie_name,
      creating_id: dataCat.creating_id,
      categorie_type: dataCat.categorie_type,
      description: dataCat.description,
      state: dataCat.state,
      order: dataCat.order,
    }

    _get('put', 'api/categorie', data, id , "")
      .then((res) => {
        props.setContentToasts(toastContent);
        props.toggleShowOrderoasts();
        props.setSave(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="btn-add">
      <div className=" btn-add-circle  mb-3">
        <PlusLg onClick={handleSelectScope} />
      </div>
    </div>
  );
};

export default AddBtn;
