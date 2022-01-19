import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import shiftle_watermark from "./assets/shiftle_watermark.svg";

import Start from "./pages/Start";
import Admin from "./pages/Admin";
import Schichten from "./pages/Shifts";
import Buchungen from "./pages/Bookings";

import AppHeader from "./components/Header";

function App() {
  const [filterDateArrivalEarliest, setFilterDateArrivalEarliest] = useState(
    new Date()
  );
  const [filterDateArrivalLatest, setFilterDateArrivalLatest] = useState(
    new Date().setDate(new Date().getDate() + 30)
  );
  const [currentUser, setCurrentUser] = useState("Natalie");
  const [simpleSite, setSimpleSite] = useState(true);
  const pageTitle = useLocation().pathname.replace("/", "")
    ? useLocation().pathname.replace("/", "")
    : "start";
  console.log(simpleSite);
  return (
    <View>
      <AppHeader
        user={currentUser} //aus dem Login?
        title={pageTitle}
        filterDateArrivalEarliest={filterDateArrivalEarliest}
        filterDateArrivalLatest={filterDateArrivalLatest}
        setFilterDateArrivalEarliest={setFilterDateArrivalEarliest}
        setFilterDateArrivalLatest={setFilterDateArrivalLatest}
      />
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route
          exact
          path="buchungen"
          element={
            <Buchungen
              filterDateArrivalEarliest={filterDateArrivalEarliest}
              filterDateArrivalLatest={filterDateArrivalLatest}
            />
          }
        />
        <Route
          exact
          path="schichten"
          type={simpleSite}
          element={<Schichten />}
        />
        <Route exact path="admin" element={<Admin />} />
      </Routes>
    </View>
  );
}

export default App;

const View = styled.div`
  display: block;
  background: 50% 95% no-repeat url(${shiftle_watermark}), var(--primary-bg);
  background-attachment: fixed;
  min-height: 100vh;
  padding-bottom: 20vh;
  position: relative;
  bottom: 0;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`;
