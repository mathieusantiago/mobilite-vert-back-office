import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../components/AppContext";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import _get from "../../utils/dataUtils";
import {FileRichtext, ListUl, Images, Files, Hash, PersonLinesFill, PeopleFill, EyeFill, Boxes, JournalArrowUp} from "react-bootstrap-icons";
import AnaliticsPieChart from "../../components/charts/AnaliticsPieChart";
import TableAnalytics from "../../components/charts/TableAnalytics";
const Dashboard = () => {
  const uid = useContext(UidContext);
  const [selectedDate, setSelectedDate] = useState("")
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
  const [anayticsTotalEvents, setAnayticsTotalEvents] = useState("0")
  const [anayticsSessions, setAnayticsSessions] = useState()
  const [anayticsPageViews, setAnayticsPageViews] = useState()
  const [anayticsArrayPageViews, setAnayticsArrayPageViews] = useState()
  const [anayticsBrowser, setAnayticsBrowser] = useState()
  const [anayticsCountry, setAnayticsCountry] = useState()
  const [anayticsDeviceCategory, setAnayticsDeviceCategory] = useState()
  const [anayticsSource, setAnayticsSource] = useState()
  const [anayticsEventArray, setAnayticsEventArray] = useState()

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
    .then((e)=>{
      console.log('ga:users', e) 
      setAnayticsUser(e.data.data['ga:users'].value)
    })

    _get('get', `api/analytics?metrics=sessions&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{
      console.log('ga:sessions', e) 
      setAnayticsSessions(e.data.data['ga:sessions'].value)
    })

    _get('get', `api/analytics?metrics=pageviews&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{
      console.log('ga:pageviews', e) 
      setAnayticsPageViews(e.data.data['ga:pageviews'].value)
    })

    _get('get', `api/analytics?metrics=totalevents&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsTotalEvents(e.data.data['ga:totalevents'].value || '0')})

    _get('get', `api/analytics/rows?metrics=pageviews&&dimensions=pagePath&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsArrayPageViews(e.data.data['ga:pageviews'].value || '0')})

    _get('get', `api/analytics/rows?metrics=users&&dimensions=browser&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsBrowser(e.data.data['ga:users'].value || '0')})

    _get('get', `api/analytics/rows?metrics=users&&dimensions=country&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsCountry(e.data.data['ga:users'].value || '0')})

    _get('get', `api/analytics/rows?metrics=users&&dimensions=deviceCategory&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsDeviceCategory(e.data.data['ga:users'].value || '0')})

    _get('get', `api/analytics/rows?metrics=users&&dimensions=source&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsSource(e.data.data['ga:users'].value || '0')})

    _get('get', `api/analytics/rows?metrics=users&&dimensions=eventLabel&&startDate=${getDate().oneMonthAgo}&&endDate=${getDate().toDay}`, '', '', '')
    .then((e)=>{setAnayticsEventArray(e.data.data['ga:users'].value || '0')})
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
          <Row className='mb-5'>
              <h3 className='dashTextColor'>Analytiques</h3>
              <p className="text-start"> Filtre Analitique Client: </p>
          
              <Form className="text-start">
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      label="1 joure"
                      name="group1"
                      type="radio"
                      id={`inline-radio-1`}
                      onClick={()=>setSelectedDate('1d')}
                    />
                    <Form.Check
                      inline
                      label="7 joures"
                      name="group1"
                      type="radio"
                      id={`inline-radio-2`}
                      onClick={()=>setSelectedDate('7d')}
                    />
                    <Form.Check
                      inline
                      label="1 mois"
                      name="group1"
                      type="radio"
                      id={`inline-radio-2`}
                      onClick={()=>setSelectedDate('1m')}
                    />
                  </div>
              </Form>
              <p className='text-start mt-2'>Analitique Client</p>
              <Col>
                <Row>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      {anayticsBrowser?(
                        <Card.Text>
                            <AnaliticsPieChart anayticsBrowser={anayticsBrowser}/>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
                      
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      {anayticsCountry?(
                        <Card.Text>
                          <AnaliticsPieChart anayticsBrowser={anayticsCountry}/>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
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
                      {anayticsDeviceCategory?(
                      <Card.Text>
                        <AnaliticsPieChart anayticsBrowser={anayticsDeviceCategory}/>
                      </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}

                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body >
                      {anayticsSource?(
                        <Card.Text>
                            <AnaliticsPieChart anayticsBrowser={anayticsSource}/>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

          <Row className='mb-5'>
              <Col>
                <Row>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      {anayticsUser?(
                        <Card.Text>
                          <PeopleFill className='dashIcons'/>
                          <p className='h5 dashTextColor'>Nombre de visiteurs</p>
                          <span className='countElement'>{anayticsUser}</span>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
                      
                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      {anayticsPageViews?(
                        <Card.Text>
                          <EyeFill className='dashIcons'/>
                          <p className='h5 dashTextColor'>Nombre de pages vue</p>
                          <span className='countElement'>{anayticsPageViews}</span>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
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
                      {anayticsSessions?(
                      <Card.Text>
                        <Boxes className='dashIcons'/>
                          <p className='h5 dashTextColor'>Nombre de sessions active</p>
                        <span className='countElement'>{anayticsSessions}</span>
                      </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}

                    </Card.Body>
                  </Card>
                  </Col>
                  <Col>
                  <Card  style={{ width: '18rem' }}>
                    <Card.Body>
                      {anayticsTotalEvents?(
                        <Card.Text>
                          <JournalArrowUp className='dashIcons'/>
                          <p className='h5 dashTextColor'>Nombre d'evenement</p>
                          <span className='countElement'>{anayticsTotalEvents}</span>
                        </Card.Text>
                      ):(<Spinner animation="border" variant="secondary" />)}
                    </Card.Body>
                  </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
              <TableAnalytics dataPageAnalitics={anayticsArrayPageViews} col1="Url pages" col2="Nombre de pages"/>
              </Col>
              <Col>
              <TableAnalytics dataPageAnalitics={anayticsEventArray} col1="Label event" col2="Nombre d'eventement"/>
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
