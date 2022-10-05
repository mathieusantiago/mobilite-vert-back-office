import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Aside.css";
import {
  HouseFill,
  CardImage,
  CardHeading,
  Images,
  PersonRolodex,
} from "react-bootstrap-icons"; 

const Aside = (props) => {
  const handleClose = () => props.setAsideState(false);
  return (
    <>
      <Offcanvas show={props.asideState} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <p className="list-group" onClick={handleClose}>
              <Link to="/dashboard">
                <HouseFill className="me-2" />
                Acceuil
              </Link>
            </p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Editorial</p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/article">
              <CardImage className="me-2" />
              Article
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/categories">
              <CardImage className="me-2" />
              Categories
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/tags">
              <CardImage className="me-2" />
              Tags
            </Link>
          </p>
          <p>Référentiel produit</p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/energy">
              <CardHeading className="me-2" />
              Fiches Enérgie
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/brand">
              <CardHeading className="me-2" />
              Fiches Marque
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/Model">
              <CardHeading className="me-2" />
              Fiches Model
            </Link>
          </p>
          <p>Média</p>
          <p className="list-group" onClick={handleClose}>
            <Link to="/medialibrary" className="ms-3">
              <Images className="me-2" />
              Librairie des médias
            </Link>
          </p>
          <p>Administrateur</p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/membre">
              <PersonRolodex className="me-2" />
              Membre
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/role">
              <PersonRolodex className="me-2" />
              Role
            </Link>
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Aside;
