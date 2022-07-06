import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ModalCropper from "../../components/ModalCropper/ModalCropper";
import Gallery from "../../components/Gallery/Gallery";

const MediaLibrary = (props) => {
  const [lgShow, setLgShow] = useState(false);
  const [state, setState] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(false);

  useEffect(() => {
    setState(false);
  });

  return (
    <div>
      <div className=" d-flex justify-content-end me-3">
        {displayBtn ? (
          ""
        ) : (
          <Button variant="outline-primary" onClick={() => setLgShow(true)}>
            Ajouter une image
          </Button>
        )}
      </div>
      <Gallery state={state} setDisplayBtn={setDisplayBtn} />
      <ModalCropper setState={setState} setLgShow={setLgShow} lgShow={lgShow} />
    </div>
  );
};

export default MediaLibrary;
