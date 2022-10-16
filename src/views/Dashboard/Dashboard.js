import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../components/AppContext";
import Spinner from "../../components/Spinner/Spinner";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
import _get from "../../utils/dataUtils";
import {FileRichtext, ListUl, Images, Files, Hash, PersonLinesFill, PeopleFill, EyeFill, Boxes, JournalArrowUp} from "react-bootstrap-icons";
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
  const [anayticsUser, setAnayticsUser] = useState()
  const [anayticsTotalEvents, setAnayticsTotalEvents] = useState()
  const [anayticsSessions, setAnayticsSessions] = useState()
  const [anayticsPageViews, setAnayticsPageViews] = useState()

  const [selectedDate, setSelectedDate] = useState("")

  let getDate = ()=>{
    let toDay = new Date()
    let removeTimesTemps 
    switch (selectedDate) {
      case "1d":
          removeTimesTemps = toDay.getTime() - (24 * 60 * 60 * 1000) * 1
        break;
      case "7d":
          removeTimesTemps = toDay.getTime() - (24 * 60 * 60 * 1000) * 6
        break;
      case "1m":
          removeTimesTemps = toDay.getTime() - (24 * 60 * 60 * 1000) * 31
        break;
      default:
          removeTimesTemps = toDay.getTime() - (24 * 60 * 60 * 1000) * 31
        break;
    }

    let oneMonthAgo = new Date(removeTimesTemps)
    return {
      toDay: toDay.toISOString().split('T')[0],
      oneMonthAgo: oneMonthAgo.toISOString().split('T')[0]
    }
  }

  const getAllAnalytics = ()=>{
    console.log("getAllAnalytics")
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

    _get('get', `api/analytics?metrics=users&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsUser(e.data.data['ga:users'].value)})

    _get('get', `api/analytics?metrics=sessions&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsSessions(e.data.data['ga:sessions'].value)})

    _get('get', `api/analytics?metrics=pageviews&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsPageViews(e.data.data['ga:pageviews'].value)})

    _get('get', `api/analytics?metrics=totalevents&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsTotalEvents(e.data.data['ga:totalevents'].value)})

  }
  useEffect(() => {
    getAllAnalytics()
  },[selectedDate]);

  return (
    <div>
      {uid ? (
        <>
        <div className="text-center">
          <h1 className="mb-2 mt-5 dashTextColor">Dashbord</h1>
        </div>
        <br/>
        <br/>
        <div className="text-center">
          <Container className="border p-3 dashContent">
          <Row>
              <h3 className='dashTextColor'>Analytiques</h3>
              <p className="text-start"> Filtre Analitique Client: </p>
              <p className="text-start">
                <span className="dateChange" onClick={()=>setSelectedDate('1d')}>1D </span>
                <span className="dateChange" onClick={()=>setSelectedDate('17')}> 7D </span>
                <span className="dateChange" onClick={()=>setSelectedDate('1m')}> 1M </span>
                </p>
              <p className='text-start mt-2'>Analitique Client</p>
              <Col>
                <Row>
                  <Col>
                  
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <PeopleFill className='dashIcons'/>
                        <p className='h5 dashTextColor'>Nombre de visiteurs</p>
                        <span className='countElement'>{anayticsUser}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <EyeFill className='dashIcons'/>
                        <p className='h5 dashTextColor'>Nombre de pages vue</p>
                        <span className='countElement'>{anayticsPageViews}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <Boxes className='dashIcons'/>
                          <p className='h5 dashTextColor'>Nombre de sessions active</p>
                        <span className='countElement'>{anayticsSessions}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Text>
                        <JournalArrowUp className='dashIcons'/>
                        <p className='h5 dashTextColor'>Nombre d'evenement</p>
                        <span className='countElement'>{anayticsTotalEvents}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='mt-4'>
            <p className='text-start'>Analitique BackOffice :</p>

              <Col>
                <Card style={{ width: '98%' }}>
                  <Card.Body>
                    <Card.Text>
                      <FileRichtext className='dashIcons'/>
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
                        <Files className='dashIcons'/>
                        <p className='h5 dashTextColor'>Nb de fiches types d'energies</p>
                        <span className='countElement'>{countFieldEnergy?.count}</span>
                        <Row>
                          <Col>
                          <p className='h5 dashTextColor'>Nombre de fiches marques</p>
                          <span className='countElement'>{countFieldBrand?.count}</span>
                          </Col>
                          <Col>
                            <p className='h5 dashTextColor'>Nb de fiches model de vehicul</p>
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
                        <ListUl className='dashIcons'/>
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
                        <Images className='dashIcons'/>
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
                        <Hash className='dashIcons'/>
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
                        <PersonLinesFill className='dashIcons'/>
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
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        </>
      ) : (
        <div>
          <Spinner titleSpinner="Patienter nous vous connectons a votre DashBoard" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
