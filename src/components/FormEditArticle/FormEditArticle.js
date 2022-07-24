import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./FormEditArticle.css";
import Edit from "./Form/Edit";
import Presentation from "./Form/Presentation";
import BtnEdit from "../BtnEdit/BtnEdit";
import Seo from "./Form/Seo";
import Galerie from "./Form/Galerie";
import Toasts from "../Toasts/Toasts";

const FormEditArticle = (props) => {
  const [key, setKey] = useState("EDITER");
  const [submitted, SetSubmitted] = useState(false);
  const scope = useLocation().state;
  //edit
  const [categorie, setCategorie] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedSubCategorie, setSelectedSubCategorie] = useState("");
  const [title, setTitle] = useState();
  const [chapo, setChapo] = useState();
  const [article, setArticle] = useState();
  const [subArticle, setSubArticle] = useState();
  const [tags, setTags] = useState();
  const [author, setAuthor] = useState();
  const [status, setStatus] = useState("");
  //pres
  const [putInOne, setPutInOne] = useState(false);
  const [notDisplayHomepage, setNotDisplayHomepage] = useState(false);
  const [withoutPub, setWithoutPub] = useState(false);
  const [presTitle, setPresTitle] = useState("");
  const [presChapo, setPresChapo] = useState("");
  const [presArticle, setPresArticle] = useState("");
  const [presCategorie, setPresCategorie] = useState("");
  //soe
  const [tilteSeo, setTilteSeo] = useState("");
  const [contentSeo, setContentSeo] = useState("");
  //toasts
  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");
  const toggleShowToasts = () => setShowToasts(!showToasts);

  useEffect(() => {
    getDataStore();
    posteArticle();
  }, [submitted, props.categorie]);

  const getDataStore = () => {
    const data = JSON.parse(sessionStorage.getItem("dataArticle"));
    if (data !== null) {
      setCategorie(data.categorie);
      setSelectedCategorie(data.selectedCategorie);
      setSelectedSubCategorie(data.selectedSubCategorie);
      setTitle(data.title);
      setChapo(data.chapo);
      setArticle(data.article);
      setSubArticle(data.subArticle);
      setTags(data.tags);
      setAuthor(data.author);
      setStatus(data.status);
      setPutInOne(data.putInOne);
      setNotDisplayHomepage(data.notDisplayHomepage);
      setWithoutPub(data.withoutPub);
      setPresTitle(data.presTitle);
      setPresChapo(data.presChapo);
      setPresArticle(data.presArticle);
      setPresCategorie(data.presCategorie);
      setTilteSeo(data.tilteSeo);
      setContentSeo(data.contentSeo);
    }
    return data;
  };

  const posteArticle = () => {
    if (submitted) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/article`,
        data: {
          profil_name: selectedCategorie,
          article_title: title || "",
          status: status || "",
          editing_id: "62aadd63ebc163f0d6e9c69e" || "",
          chapo: chapo || "",
          content_article: article || "",
          categories: selectedSubCategorie || "",
          content_subarticle: subArticle || "",
          tags: tags || "",
          signatur: author || "",
          putInOne: putInOne || false,
          presCategorie: presCategorie || "",
          notDisplayHomepage: notDisplayHomepage || false,
          withoutPub: withoutPub || false,
          presTitle: presTitle || "",
          presChapo: presChapo || "",
          presArticle: presArticle || "",
          tilteSeo: tilteSeo || "",
          contentSeo: contentSeo || "",
          mainPicture: sessionStorage.getItem("mainPicture") || "",
          secondaryPicture: sessionStorage.getItem("secondaryPicture") || "",
          galleryPicture: JSON.parse(sessionStorage.getItem("galleryPicture")) || [],
        },
        withCredentials: true,
      })
        .then((res) => {
          setContentToasts("Enregistrement de la nouvelle catégorie effectué");
          toggleShowToasts();
          props.setNewState(true);
          SetSubmitted(false);
          sessionStorage.removeItem("dataArticle");
          sessionStorage.removeItem("mainPicture");
          sessionStorage.removeItem("galleryPicture");
          sessionStorage.removeItem("secondaryPicture");
          window.location = "/article";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const storeDataArticle = () => {
    const data = {
      categorie,
      selectedCategorie,
      selectedSubCategorie,
      title,
      chapo,
      article,
      subArticle,
      tags,
      author,
      status,
      putInOne,
      notDisplayHomepage,
      withoutPub,
      presTitle,
      presChapo,
      presArticle,
      presCategorie,
      tilteSeo,
      contentSeo,
    };
    sessionStorage.setItem("dataArticle", JSON.stringify(data));
  };
  return (
    <div>
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
        />
      </div>
      <Container>
        <Row>
          <div className="p-1 bg-green text-light">
            <p className="fs-3 m-2 pt-1 text-light chevron-left">
              Création d'un article
            </p>
            <div className="bg-light color-dark">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="EDITER" title="ÉDITER">
                  <Edit
                    SetSubmitted={SetSubmitted}
                    scope={scope}
                    selectedCategorie={selectedCategorie}
                    setSelectedCategorie={setSelectedCategorie}
                    categorie={categorie}
                    setCategorie={setCategorie}
                    setSelectedSubCategorie={setSelectedSubCategorie}
                    selectedSubCategorie={selectedSubCategorie}
                    setTitle={setTitle}
                    title={title}
                    setChapo={setChapo}
                    chapo={chapo}
                    setArticle={setArticle}
                    article={article}
                    setSubArticle={setSubArticle}
                    subArticle={subArticle}
                    setTags={setTags}
                    tags={tags}
                    setAuthor={setAuthor}
                    author={author}
                    storeDataArticle={storeDataArticle}
                  />
                </Tab>
                <Tab eventKey="PRESENTATION" title="PRÉSENTATION">
                  <Presentation
                    scope={scope}
                    categorie={categorie}
                    setPresCategorie={setPresCategorie}
                    presCategorie={presCategorie}
                    setPutInOne={setPutInOne}
                    putInOne={putInOne}
                    setNotDisplayHomepage={setNotDisplayHomepage}
                    notDisplayHomepage={notDisplayHomepage}
                    setWithoutPub={setWithoutPub}
                    withoutPub={withoutPub}
                    setPresTitle={setPresTitle}
                    presTitle={presTitle}
                    setPresChapo={setPresChapo}
                    presChapo={presChapo}
                    setPresArticle={setPresArticle}
                    presArticle={presArticle}
                    storeDataArticle={storeDataArticle}
                  />
                </Tab>
                <Tab eventKey="SEO" title="SEO">
                  <Seo
                    scope={scope}
                    setTilteSeo={setTilteSeo}
                    setContentSeo={setContentSeo}
                    tilteSeo={tilteSeo}
                    contentSeo={contentSeo}
                  />
                </Tab>
                <Tab eventKey="GALERIE" title="GALERIE">
                  <Galerie scope={scope}  storeDataArticle={storeDataArticle}/>
                </Tab>
              </Tabs>
            </div>
          </div>
        </Row>
        <BtnEdit SetSubmitted={SetSubmitted} setStatus={setStatus} />
      </Container>
    </div>
  );
};

export default FormEditArticle;
