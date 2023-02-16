import { useEffect, useState } from "react";
import {  Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import _get from "../../../utils/dataUtils";
import ModalTags from "../../Modal/ModalTags";
import Toasts from "../../Toasts/Toasts";
import './TagsTable.css'
const TagsTable = () => {
  const [listTags, setListTags] = useState();
  const [showModalTags, setShowModalTags] = useState(false);
  const [scope, setScope] = useState("add");

  const [contentToasts, setContentToasts] = useState("");
  const [showToasts, setShowToasts] = useState(false);
  const [toastsStyles, setToastsStyles] = useState(false);
  const [updatedComponent, setUpdatedComponent] = useState(false);

  const toggleShowToasts = () => setShowToasts(!showToasts);

  useEffect(() => {
    const getTags = () => {
      _get("get", "api/tags", "", "", "")
        .then((res) => {
          setListTags(res.data);
        })
        .catch((err) => {
          // console.log(err)
        });
    };
    getTags();
  }, [updatedComponent]);


  
  const columns = [
    {
      name: "Tags",
      selector: (row) => row.tags_name,
      center: true,
      sortable: false,
    },
    {
      name: "Fiches",
      selector: (row) => row.link_field,
      center: true,
      sortable: false,
    },
    {
      name: "statut",
      selector: (row) => {
        return row.status_tags?'active':'désactive'
      },
      center: true,
      sortable: true,
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
      <div className="bg-green  pt-2 pb-2 ps-2">
        <ModalTags
          showModalTags={showModalTags}
          setShowModalTags={setShowModalTags}
          scope={scope}
          toggleshowToasts={toggleShowToasts}
          setContentToasts={setContentToasts}
          setToastsStyles={setToastsStyles}
          setUpdatedComponent={setUpdatedComponent}
        />
        <p className="fs-3 m-2 pt-1 text-light chevron-left">
          <Row>
            <Col md={4}>Liste des tags</Col>
            <Col md={{ span: 2, offset: 5 }}>
              <Button
                className="btn-header"
                onClick={() => {
                  setShowModalTags(true);
                  setScope("add");
                }}
              >
                Créer un tag
              </Button>
            </Col>
          </Row>
        </p>
      </div>
      <div className="borderGreen">
        <DataTable
          pagination
          columns={columns}
          data={listTags}
          dense={false}
          responsive={true}
          striped
        />
      </div>
    </>
  );
};

export default TagsTable;
