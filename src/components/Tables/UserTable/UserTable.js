import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
//fake data for the dev
import ModalDelete from "../../modal/ModalDelete.js";
import DataTable from "react-data-table-component";
import { PencilFill, Trash } from "react-bootstrap-icons";
import Toasts from "../../Toasts/Toasts";
import _get from "../../../utils/dataUtils.js";
import "./UserTable.css";

const UserTable = (props) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataRole, setDataRole] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [change, setChange] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");

  const [randomPassword, setRandomPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [selectId, setSelectId] = useState("");
  const [selectRoleId, setSelectRoleId] = useState("");
  const [isActive, setIsActive] = useState();

  const [isUpdated, setIsUpdated] = useState(false);

  const [reload, setReload] = useState(false);

  const toggleShowToasts = () => setShowToasts(!showToasts);
  const handleShowDelete = () => setShowModalDelete(true);

  const resPseudo = document.querySelector("#pseudo");
  const resPassword = document.querySelector("#password");
  const resEmail = document.querySelector("#email");
  const resRole = document.querySelector("#role");
  const resStatus = document.querySelector("#status");

  useEffect(() => {
    const getRole = async () => {
      _get("get", "api/role", "", "", "")
        .then((res) => {
          setDataRole(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getUsers = () => {
      _get("get", "api/user", "", "", "")
        .then((res) => {
          setDataUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getRole();
    getUsers();
  }, [change, reload]);

  const getUserById = (_id) => {
    setSelectId(_id);
    setIsUpdated(true);
    const role = document.querySelector("#role");

    if (_id === "") {
      return null;
    }

    _get("get", "api/user", "", _id, "")
      .then((res) => {
        setPseudo(res.data.pseudo);
        setEmail(res.data.email);
        setIsActive(res.data.status);
        role.value = res.data.role;
        //test



        setSelectRoleId(res.data.role)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    let data = {
      pseudo: pseudo,
      email: email,
      status: isActive,
      role: selectRole,
    };
    _get("put", "api/user", data, selectId, "")
      .then(() => {
        emptyField();
        setReload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewUser = () => {
    console.log("pass", randomPassword);
    let data = {
      pseudo: pseudo,
      email: email,
      password: randomPassword,
      role: selectRole === "" ? selectRoleId : selectRole,
      status: isActive,
    };
    _get("post", "api/user/register", data, "", "")
      .then(() => {
        emptyField();
        setContentToasts("Nouvelle utilisateur enregistrer");
        toggleShowToasts();
        setReload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyField = () => {
    resPseudo.value = "";
    resPassword.value = "";
    resEmail.value = "";
    resRole.value = "1";
    resStatus.checked = false;
    setIsUpdated(false);
  };

  const generatPassword = () => {
    const password_length = 16;
    const chars = "!@#$%&*ABCDEFGHIJKLMNOP1234567890abcdefghijklmnopqrstuvwxyz";
    let pass = "";
    for (let x = 0; x < password_length; x++) {
      let i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    setRandomPassword(pass);
  };

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
      name: "Nom",
      selector: (row) => {
        return (
          <div>
            <Button className="bordered-bleu pseudo" size="sm">
              {row.pseudo}
            </Button>
          </div>
        );
      },
      center: true,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => {
        return <div>{row.email}</div>;
      },
      center: true,
      sortable: false,
    },
    {
      name: "Role",
      selector: (row) => {
        // eslint-disable-next-line
        return dataRole.map((data) => {
          if (row.role === data._id) {
            return `
                    ${data.roleName} 
                    ${data.admin ? "| A " : ""} 
                    ${data.read ? "| L " : ""}
                    ${data.write ? "| E " : ""}
                    ${data.upDate ? "| M " : ""} `;
          }
        });
      },
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
            onChange={(e) => {
              setIsActive(e.target.checked);
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
            <Col
              variant="light"
              className="btnTable pe-3"
              onClick={() => getUserById(row._id)}
            >
              <PencilFill />
            </Col>

            <Col
              variant="light"
              className="btnTable pe-3"
              onClick={() => {
                handleShowDelete();
                setSelectId(row._id);
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
        <div className="borderGreen text-light p-2">
          <Row>
            <Col sm={5}>
              <Form.Control
                id="pseudo"
                className="mt-3"
                placeholder="Nom"
                type="text"
                onChange={(e) => {
                  setPseudo(e.target.value);
                }}
                defaultValue={pseudo}
              />

              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Mots de passe"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  defaultValue={randomPassword}
                  onChange={(e) => {
                    setRandomPassword(e.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={generatPassword}
                >
                  Générer PassWord
                </Button>
              </InputGroup>
            </Col>
            <Col sm={5}>
              <Form.Control
                id="email"
                className="mt-3"
                placeholder="Email"
                type="email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Form.Select
                className="mt-3"
                aria-label="Selecte Role"
                onChange={(e) => {
                  setSelectRole(e.target.value);
                }}
                id="role"
                defaultValue={selectRole}
              >
                <option value="1">Selecte Role</option>
                {dataRole.map((role) => {
                  return (
                    <option key={role._id} value={role._id}>{`
                   ${role.roleName} 
                    ${role.admin ? "| A " : ""} 
                    ${role.read ? "| L " : ""}
                    ${role.write ? "| E " : ""}
                    ${role.upDate ? "| M " : ""}`}</option>
                  );
                })}
              </Form.Select>
            </Col>

            <Col>
              <Form.Check
                id="status"
                className="mt-5"
                type="switch"
                label={`Status`}
                defaultChecked={isActive}
                onChange={(e) => {
                  setIsActive(e.target.checked);
                }}
              />
            </Col>
            <Col>
              {isUpdated ? (
                <>
                  <Button
                    className="bordered-bleu mt-5"
                    size="sm"
                    onClick={updateUser}
                  >
                    Update
                  </Button>
                  <Button
                    className="bordered-bleu"
                    size="sm"
                    onClick={emptyField}
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button
                  className="bordered-bleu mt-5"
                  size="sm"
                  onClick={postNewUser}
                >
                  Créer
                </Button>
              )}
            </Col>
          </Row>
        </div>

        <div className="borderGreen">
          <DataTable
            pagination
            columns={columns}
            dense={false}
            data={dataUsers}
            responsive={true}
            striped
          />
        </div>
      </Container>

      <ModalDelete
        scope="deleteUser"
        setDeleteState={setChange}
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        id={selectId}
        styles="info"
      />
    </>
  );
};

export default UserTable;
