import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import _get from "./utils/dataUtils";

import BarNav from "./components/BarNav/BarNav";
import Aside from "./components/Aside/Aside";
import { UidContext } from "./components/AppContext";

import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import Article from "./views/Article/Article";
import Categories from "./views/Categories/Categories";
import EditArticle from "./views/Article/EditArticle";
import MediaLibrary from "./views/MediaLibrary/MediaLibrary";
import Roles from "./views/Roles/Roles";
import Membre from "./views/Membre/Membre";
import EnergySheets from "./views/Sheets/EnergySheets";
import BrandSheets from "./views/Sheets/BrandSheets";
import ModelSheets from "./views/Sheets/ModelSheets.js";
import Tags from "./views/Tags/Tags.js";

import "./App.css";

function App() {
  const [uid, setUid] = useState(null);
  const [asideState, setAsideState] = useState(false);

  const fetchToken = async () => {
    _get('get', 'jwtid', "", "", "")
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => {
        console.log("No token", err);
      });
  };
  useEffect(() => {
    fetchToken();
  }, [uid, fetchToken()]); 

  return (
    <UidContext.Provider value={uid}>
      <BarNav setAsideState={setAsideState} />
      <Aside setAsideState={setAsideState} asideState={asideState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/article" element={<Article />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/editarticle" element={<EditArticle />} />
        <Route path="/medialibrary" element={<MediaLibrary />} />
        <Route path="/role" element={<Roles />} />
        <Route path="/membre" element={<Membre />} />
        <Route path="/energy" element={<EnergySheets />} />
        <Route path="/brand" element={<BrandSheets />} />
        <Route path="/model" element={<ModelSheets />} />
        <Route path="/tags" element={<Tags/>} />
      </Routes>
    </UidContext.Provider>
  );
}

export default App;