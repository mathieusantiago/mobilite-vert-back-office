/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, useContext } from "react";
import { Container, Navbar, Dropdown } from "react-bootstrap"; 
import { PersonCircle } from "react-bootstrap-icons";
import NavLogo from "../../assets/Logo_Greenmove.png";
import { List } from "react-bootstrap-icons";
import cookie from "js-cookie";
import { UidContext } from "../AppContext";
import "./BarNav.css";
import _get from "../../utils/dataUtils";

const BarNav = (props) => {
  const uid = useContext(UidContext);

  const handleShow = () => {
    props.setAsideState(true);
  };

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = () => {
    _get("get", "api/user/logout", "", "", "")
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  const CustomToggle = forwardRef(({ children, onClick }, ref) => {
    return (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}&#x25bc;
      </a>
    );
  });

  return (
    <>
      <Navbar bg="light" variant="light ">
        {uid ? (
          <div className="burgerBtn ms-3">
            <List color="forestgreen" size={45} onClick={handleShow} />
          </div>
        ) : (
          ""
        )}
        <Container fluid>
          <Navbar.Brand>
            <img
              src={NavLogo}
              alt="Logo de la mobilité verte"
              className="logo-greenMove ms-1"
            />
          </Navbar.Brand>
          <div className="me-5">
            {uid ? (
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <PersonCircle
                    width="32"
                    height="32"
                    className="PersonCircle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" onClick={logout}>
                    Déconnexion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default BarNav;
