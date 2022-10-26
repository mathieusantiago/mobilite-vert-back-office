import React, { useState, useEffect, useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Row } from "react-bootstrap";
import "./FormEditArticle.css";
import Edit from "./Form/Edit";
import Presentation from "./Form/Presentation";
import BtnEdit from "../BtnEdit/BtnEdit";
import Seo from "./Form/Seo";
import Galerie from "./Form/Galerie";
import Toasts from "../Toasts/Toasts";
import _get from "../../utils/dataUtils";
import { UidContext } from "../AppContext";
const FormEditArticle = (props) => {
  const uid = useContext(UidContext);

  const [updateValue, setUpdateValue] = useState()
  const [key, setKey] = useState("EDITER");
  const [submitted, SetSubmitted] = useState(false);
  //edit
  const [categorie, setCategorie] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedSubCategorie, setSelectedSubCategorie] = useState("");
  const [article_title, setArticle_title] = useState("");
  const [chapo, setChapo] = useState();
  const [content_article, setContent_article] = useState();
  const [content_subarticle, setContent_subarticle] = useState();
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState();
  const [status, setStatus] = useState("");
  const [mainPicture, setMainPicture] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  //pres
  const [putInOne, setPutInOne] = useState(false);
  const [notDisplayHomepage, setNotDisplayHomepage] = useState(false);
  const [withoutPub, setWithoutPub] = useState(false);
  const [presTitle, setPresTitle] = useState("");
  const [presChapo, setPresChapo] = useState("");
  const [presArticle, setPresArticle] = useState("");
  const [presCategorie, setPresCategorie] = useState("");
  const [secondaryPicture, setSecondaryPicture] = useState("");
  //soe
  const [tilteSeo, setTilteSeo] = useState("");
  const [contentSeo, setContentSeo] = useState("");
  //gallery
  const [galleryPicture, setGalleryPicture] = useState([]);
  //toasts
  const [showToasts, setShowToasts] = useState(false);
  const [contentToasts, setContentToasts] = useState("");

  const toggleShowToasts = () => {
    setShowToasts(!showToasts);
  };



  const fetchArticle = async (_id) => {
    _get("get", "api/article", "", _id, "")
      .then((res) => {
        sortData(res.data);
      })
      .catch((err) => {
        console.log("No data article", err);
      });
  };

  const sortData = (data) => {
    setSelectedCategorie(data.profil_name);
    setSelectedSubCategorie(data.categories);
    setArticle_title(data.article_title);
    setChapo(data.chapo);
    setContent_article(data.content_article);
    setContent_subarticle(data.content_subarticle);
    setSelectedTags(data.tags);
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
    setMainPicture(data.mainPicture);
    setSecondaryPicture(data.secondaryPicture);
    setGalleryPicture(data.galleryPicture);
  };



  const getDataStore = () => {
    if (new URL(window.location.href).searchParams.get("state")) {
      const _id = new URL(window.location.href).searchParams.get("id");
      fetchArticle(_id);
    } else {
      const data = JSON.parse(sessionStorage.getItem("dataArticle"));
      if (data !== null) {
        setCategorie(data.categorie);
        sortData(data);
      }
      return data;
    }
  };

  const posteArticle = () => {
    if (submitted) {
      let data = {
        profil_name: selectedCategorie,
        article_title: article_title || "",
        status: status || "",
        editing_id: uid || "",
        chapo: chapo || "",
        content_article: content_article || "",
        categories: selectedSubCategorie || "",
        content_subarticle: content_subarticle || "",
        tags: selectedTags || "",
        author: author || "",
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
        galleryPicture:
          JSON.parse(sessionStorage.getItem("galleryPicture")) || [],
      };

      _get("post", "api/article", data, "", "")
        .then((res) => {
          setContentToasts("Enregistrement de la nouveau article  effectué");
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
      article_title,
      chapo,
      content_article,
      content_subarticle,
      tags: selectedTags,
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

  useEffect(() => {
    getDataStore();
    posteArticle();
  }, [submitted, props.categorie, galleryPicture]);


  return (
    <div>
      <div className="toastsPosition">
        <Toasts
          showToasts={showToasts}
          toggleshowToasts={toggleShowToasts}
          contentToasts={contentToasts}
          styles="info"
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
                    setUpdateValue={setUpdateValue}
                    SetSubmitted={SetSubmitted}
                    selectedCategorie={selectedCategorie}
                    setSelectedCategorie={setSelectedCategorie}
                    categorie={categorie}
                    setCategorie={setCategorie}
                    setSelectedSubCategorie={setSelectedSubCategorie}
                    selectedSubCategorie={selectedSubCategorie}
                    setArticle_title={setArticle_title}
                    article_title={article_title}
                    setChapo={setChapo}
                    chapo={chapo}
                    setContent_article={setContent_article}
                    content_article={content_article}
                    setContent_subarticle={setContent_subarticle}
                    content_subarticle={content_subarticle}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    setTags={setTags}
                    tags={tags}
                    setAuthor={setAuthor}
                    author={author}
                    storeDataArticle={storeDataArticle}
                    mainPicture={mainPicture}
                    toggleShowToasts={toggleShowToasts}
                  />
                </Tab>
                <Tab eventKey="PRESENTATION" title="PRÉSENTATION">
                  <Presentation
                    setUpdateValue={setUpdateValue}
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
                    secondaryPicture={secondaryPicture}
                  />
                </Tab>
                <Tab eventKey="SEO" title="SEO">
                  <Seo
                    setTilteSeo={setTilteSeo}
                    setContentSeo={setContentSeo}
                    tilteSeo={tilteSeo}
                    contentSeo={contentSeo}
                  />
                </Tab>
                <Tab eventKey="GALERIE" title="GALERIE">
                  <Galerie
                    storeDataArticle={storeDataArticle}
                    galleryPicture={galleryPicture}
                    toggleShowToasts={toggleShowToasts}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </Row>
        <BtnEdit toggleShowToasts={toggleShowToasts} SetSubmitted={SetSubmitted} setStatus={setStatus}/>
      </Container>
    </div>
  );
};

export default FormEditArticle;
