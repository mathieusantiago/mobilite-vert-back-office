import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
//fake data for the dev
import "./RoleTable.css";
import ModalDelete from "../../modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { Check2Circle, Trash } from "react-bootstrap-icons";
import _get from "../../../utils/dataUtils.js";

import Toasts from "../../Toasts/Toasts";
import "./RoleTable.css";

const RoleTable = (props) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idRole, setIdRole] = useState("");
  const [roleName, setRoleName] = useState("");
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [upDate, setUpdate] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [status, setStatus] = useState(false);
  const [dataRole, setDataRole] = useState([]);
  const [change, setChange] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");

  const toggleShowToasts = () => setShowToasts(!showToasts);
  const handleShowDelete = () => setShowModalDelete(true);
 
  useEffect(() => {
    const getRole = () => {
      _get("get", "api/role", "", "", "")
        .then((res) => {
          setDataRole(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRole();
  }, [change]);

  const postRole = () => {
    let data = {
      roleName: roleName,
      read: read,
      write: write,
      upDate: upDate,
      admin: admin,
      status: status,
    }

    _get("post", "api/role", data, "", "")
      .then(() => {
        setContentToasts("Nouveau role créer");
        toggleShowToasts(true);
        setChange(true);
        setStatus(false);
        setUpdate(false);
        setWrite(false);
        setRead(false);
        setAdmin(false);
        setRoleName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRole = (id) => {
    let data = {
      roleName: roleName,
      read: read,
      write: write,
      upDate: upDate,
      admin: admin,
      status: status,
    };

    _get("put", "api/role", data, id, "")
      .then(() => {
        setContentToasts("Mise a jour du role");
        toggleShowToasts(true);
        setOnChange(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => {
        setIdRole(row._id);
        return row._id;
      },
      center: true,
      sortable: false,
      width: "100px",
    },
    {
      name: "Nom du role  ",
      selector: (row) => {
        return (
          <div>
            <Button className="bordered-bleu" size="sm">
              {row.roleName}
            </Button>
          </div>
        );
      },
      center: true,
      sortable: false,
    },
    {
      name: "Lecture",
      selector: (row) => {
        return (
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="read"
            defaultChecked={row.read}
            onChange={(r) => {
              setIdRole(row._id);
              setOnChange(true);
              setRead(r.target.checked);
            }}
          />
        );
      },
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "Écriture",
      selector: (row) => {
        return (
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="write"
            defaultChecked={row.write}
            onChange={(r) => {
              setIdRole(row._id);
              setOnChange(true);
              setWrite(r.target.checked);
            }}
          />
        );
      },
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "Modification",
      selector: (row) => {
        return (
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="update"
            defaultChecked={row.upDate}
            onChange={(r) => {
              setIdRole(row._id);
              setOnChange(true);
              setUpdate(r.target.checked);
            }}
          />
        );
      },
      center: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "Administrateur",
      selector: (row) => {
        return (
          <Form.Check
            className="mt-2"
            type="checkbox"
            id="admin"
            defaultChecked={row.admin}
            onChange={(r) => {
              setIdRole(row._id);
              setOnChange(true);
              setAdmin(r.target.checked);
            }}
          />
        );
      },
      center: true,
      sortable: true,
      width: "100px",
    },

    {
      name: "createDate",
      selector: (row) => row.createdAt.split("T")[0],
      center: true,
      sortable: true,
    },
    {
      name: "Activer/Désactiver",
      selector: (row) => {
        return (
          <Form.Check
            className="mt-2"
            type="switch"
            defaultChecked={row.status}
            onChange={(r) => {
              setIdRole(row._id);
              setOnChange(true);
              setStatus(r.target.checked);
            }}
          />
        );
      },
      center: true,
      sortable: true,
    },
    {
      selector: (row) => (
        <div>
          <Row>
            {onChange && row._id == idRole ? (
              <Col
                variant="light"
                className="btnTable pe-3"
                onClick={() => {
                  updateRole(idRole);
                }}
              >
                <Check2Circle />
              </Col>
            ) : (
              ""
            )}
            <Col
              variant="light"
              className="btnTable pe-3"
              onClick={() => {
                handleShowDelete();
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
          styles="info"
        />
      </div>
      <Container>
        <div className="borderGreen text-light p-4">
          <Row>
            <Col sm={6}>
              <Form.Control
                className="mt-3"
                placeholder="Role Name"
                value={roleName}
                onChange={(r) => setRoleName(r.target.value)}
              />
            </Col>
            <Col>
              <Form.Check
                className="mt-2"
                type="checkbox"
                id={`default-checkbox`}
                label={`Lecture`}
                checked={read}
                onChange={(r) => setRead(r.target.checked)}
              />

              <Form.Check
                className="mt-2"
                type="checkbox"
                id={`default-checkbox`}
                label={`Écritur`}
                checked={write}
                onChange={(r) => setWrite(r.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                className="mt-2"
                type="checkbox"
                id={`default-checkbox`}
                label={`Modification`}
                checked={upDate}
                onChange={(r) => setUpdate(r.target.checked)}
              />

              <Form.Check
                className="mt-2"
                type="checkbox"
                id={`default-checkbox`}
                label={`Administrateur`}
                checked={admin}
                onChange={(r) => setAdmin(r.target.checked)}
              />
            </Col>
            <Col>
              <Form.Check
                className="mt-3"
                type="switch"
                label={`Status`}
                checked={status}
                onChange={(r) => setStatus(r.target.checked)}
              />
            </Col>
            <Col>
              <Button
                className="bordered-bleu mt-3"
                size="sm"
                onClick={postRole}
              >
                Créer
              </Button>
            </Col>
          </Row>
        </div>

        <div className="borderGreen">
          <DataTable
            pagination
            columns={columns}
            data={dataRole}
            dense={false}
            responsive={true}
            striped
          />
        </div>
      </Container>

      <ModalDelete
        id={idRole}
        scope="deleteRole"
        setDeleteState={setChange}
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        styles="info"

      />
    </>
  );
};

export default RoleTable;
