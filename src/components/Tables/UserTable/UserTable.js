import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
//fake data for the dev
import axios from "axios";
import ModalDelete from "../../modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { Check2Circle, Trash } from "react-bootstrap-icons";
import Toasts from "../../Toasts/Toasts";
import "./UserTable.css";

const UserTable = (props) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataRole, setDataRole] = useState([]);
  const [change, setChange] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");
  const [randomPassword, setRandomPassword] = useState('');

  const toggleShowToasts = () => setShowToasts(!showToasts);
  const handleShowDelete = () => setShowModalDelete(true);

  useEffect(() => {
    
  }, [change]);

  const generatPassword = () => {
    const password_length = 16;
    const chars = "!@#$%&*ABCDEFGHIJKLMNOP1234567890abcdefghijklmnopqrstuvwxyz";
    let pass = "";
    for (let x = 0; x < password_length; x++) {
      let i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    setRandomPassword(pass)
  }

  const columns = [
    {
      name: "ID",
      selector: (row) => {
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
              setOnChange(true);
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
              setOnChange(true);
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
              setOnChange(true);
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
              setOnChange(true);
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
              setOnChange(true);
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
            {onhashchange ? (
              <Col variant="light" className="btnTable pe-3" onClick={() => {}}>
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
        />
      </div>
      <Container>
        <div className="borderGreen text-light p-2">
          <Row>
            <Col sm={5}>
              <Form.Control className="mt-3" placeholder="Nom" type="text"/>

              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  type="password"
                  placeholder="Mots de passe"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  defaultValue={randomPassword}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={generatPassword}>
                  Générer PassWord
                </Button>
              </InputGroup>
            </Col>
            <Col sm={5}>
              <Form.Control className="mt-3" placeholder="Email" type="email"/>
              <Form.Control className="mt-3" placeholder="Role" type="text"/>
            </Col>
  
            <Col>
              <Form.Check className="mt-5" type="switch" label={`Status`} />
            </Col>
            <Col>
              <Button
                className="bordered-bleu mt-5"
                size="sm"
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
            dense={false}
            data={dataRole}
            responsive={true}
            striped
          />
        </div>
      </Container>

      <ModalDelete
        scope="deleteRole"
        setDeleteState={setChange}
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
      />
    </>
  );
};

export default UserTable;
