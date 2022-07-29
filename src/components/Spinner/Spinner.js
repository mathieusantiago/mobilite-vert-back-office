import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-5 pt-5">
        <ThreeCircles color="blue" outerCircleColor="red" />
      </div>
      <h2 className="text-center mt-4">{props.titleSpinner}</h2>
    </div>
  );
};

export default Spinner;
