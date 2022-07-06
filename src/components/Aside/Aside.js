import React from "react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Aside.css";
import {
  HouseFill,
  CardImage,
  CardHeading,
  Images,
  Calendar3,
  List,
  PersonRolodex,
  ExclamationSquareFill,
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
          <Dropdown.Divider />
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
            <Link className="ms-3" to="/dashboard">
              <CardImage className="me-2" />
              Lexique
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardImage className="me-2" />
              Newsletters
            </Link>
          </p>
          <Dropdown.Divider />
          <p>Référentiel produit</p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardHeading className="me-2" />
              Marques
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardHeading className="me-2" />
              Modèles
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardHeading className="me-2" />
              Véhicules
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardHeading className="me-2" />
              Catégories
            </Link>
          </p>
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <CardHeading className="me-2" />
              Fiches Occasion
            </Link>
          </p>
          <Dropdown.Divider />
          <p className="list-group" onClick={handleClose}>
            <Link to="/medialibrary" className="ms-3">
              <Images className="me-2" />
              Librairie des médias
            </Link>
          </p>
          <Dropdown.Divider />
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <Calendar3 className="me-2" />
              Événements
            </Link>
          </p>
          <Dropdown.Divider />
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <List className="me-2" />
              Navigation
            </Link>
          </p>
          <Dropdown.Divider />
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <PersonRolodex className="me-2" />
              Membre
            </Link>
          </p>
          <Dropdown.Divider />
          <p className="list-group" onClick={handleClose}>
            <Link className="ms-3" to="/dashboard">
              <ExclamationSquareFill className="me-2" />
              Commentaire
            </Link>
          </p>
          <Dropdown.Divider />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Aside;
