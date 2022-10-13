import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../components/AppContext";
import Spinner from "../../components/Spinner/Spinner";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
import _get from "../../utils/dataUtils";
import {FileRichtext, ListUl, Images, Files, Hash, PersonLinesFill} from "react-bootstrap-icons";
const Dashboard = () => {
  const uid = useContext(UidContext);
  const [countArticle, setCountArticle] = useState()
  const [countPublishDraftArticle, setCountPublishDraftArticle] = useState([])
  const [countCategorie, setCountCategorie] = useState()
  const [countGallery, setCountGallery] = useState()
  const [countFieldEnergy, setCountFieldEnergy] = useState()
  const [countFieldBrand, setCountFieldBrand] = useState()
  const [countFieldModel, setCountFieldModel] = useState()
  const [countTags, setCountTags] = useState()
  const [countRole, setCountRole] = useState()
  const getAllAnalytics = ()=>{
    _get('get', 'api/article/count', '', '', '')
    .then((e)=>{setCountArticle(e.data)})

    _get('get', 'api/article/publishCount', '', '', '')
    .then((e)=>{setCountPublishDraftArticle(e.data)})

    _get('get', 'api/categorie/count', '', '', '')
    .then((e)=>{setCountCategorie(e.data)})

    _get('get', 'api/gallery/count', '', '', '')
    .then((e)=>{setCountGallery(e.data)})

    _get('get', 'api/fieldEnergy/count', '', '', '')
    .then((e)=>{setCountFieldEnergy(e.data)})

    _get('get', 'api/fieldBrand/count', '', '', '')
    .then((e)=>{setCountFieldBrand(e.data)})

    _get('get', 'api/fieldModel/count', '', '', '')
    .then((e)=>{setCountFieldModel(e.data)})

    _get('get', 'api/tags/count', '', '', '')
    .then((e)=>{setCountTags(e.data)})

    _get('get', 'api/role/count', '', '', '')
    .then((e)=>{setCountRole(e.data)})
  }
  useEffect(() => {
    console.log(countPublishDraftArticle.publishCount)
    getAllAnalytics()
  },[]);

  return (
    <div>
      {uid ? (
        <div className="text-center">
          <h1 className="mb-5 mt-5 dashTextColor">Dashbord</h1>
          <Container className="border p-3 dashContent">
            <Row>
              <h3 className='dashTextColor'>Données analytique</h3>
              <Col>
                <Card style={{ width: '98%' }}>
                  <Card.Body>
                    <Card.Text>
                      <FileRichtext className='dashIcons'></FileRichtext>
                      <p className='h5 dashTextColor'>Nombre d'article</p>
                      <span className='countElement'>{countArticle?.count}</span>
                      <Row>
                        <Col>
                        <p className='h5 dashTextColor'>Publier</p>
                        <span className='countElement'>{countPublishDraftArticle?.publishCount}</span>
                        </Col>
                        <Col>
                          <p className='h5 dashTextColor'>Brouillons</p>
                          <span className='countElement'>{countPublishDraftArticle?.draftCount}</span>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Row>
                <Col>
                  <Card style={{ width: '98%' }}>
                    <Card.Body>
                      <Card.Text>
                        <Files className='dashIcons'></Files>
                        <p className='h5 dashTextColor'>N° de fiches types d'energies</p>
                        <span className='countElement'>{countFieldEnergy?.count}</span>
                        <Row>
                          <Col>
                          <p className='h5 dashTextColor'>Nombre de fiches marques</p>
                          <span className='countElement'>{countFieldBrand?.count}</span>
                          </Col>
                          <Col>
                            <p className='h5 dashTextColor'>N° de fiches model de vehicul</p>
                            <span className='countElement'>{countFieldModel?.count}</span>
                          </Col>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row>
                  <Col>
                  <Card className='mt-5' style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <ListUl className='dashIcons'></ListUl>
                        <p className='h5 dashTextColor'>Nombre de catégorie</p>
                        <span className='countElement'>{countCategorie?.count}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card className='mt-5' style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <Images className='dashIcons'></Images>
                        <p className='h5 dashTextColor'>Nombre d'image importer</p>
                        <span className='countElement'>{countGallery?.count}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                  <Card className='mt-5' style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <Hash className='dashIcons'></Hash>
                          <p className='h5 dashTextColor'>Nombre de tags créer</p>
                        <span className='countElement'>{countTags?.count}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card className='mt-5' style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <PersonLinesFill className='dashIcons'></PersonLinesFill>
                        <p className='h5 dashTextColor'>Nombre de role</p>
                        <span className='countElement'>{countRole?.count}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <Spinner titleSpinner="Patienter nous vous connectons a votre DashBoard" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
