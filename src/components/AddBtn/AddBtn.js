import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";
import "./AddBtn.css";

const AddBtn = (props) => {
  const navigate = useNavigate();

  const handleSelectScope = () => {
    if (props.scope === "addArticle") {
      navigate("/editarticle", { state: props.scope });
    }
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
