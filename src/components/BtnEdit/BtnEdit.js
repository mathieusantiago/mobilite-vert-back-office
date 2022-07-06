import React from "react";
import { CheckLg, PencilSquare } from "react-bootstrap-icons";
import "./BtnEdit.css";
const btnEdit = (props) => {
  return (
    <div className="btn-edit">
      <div
        onClick={() => {
          props.SetSubmitted(true);
          props.setStatus("Draft");
        }}
        className=" btn-edit-circle  mb-3"
      >
        <PencilSquare />
      </div>
      <div
        onClick={() => {
          props.SetSubmitted(true);
          props.setStatus("Publish");
          props.toggleShowToasts()
        }}
        className=" btn-edit-circle "
      >
        <CheckLg />
      </div>
    </div>
  );
};

export default btnEdit;
