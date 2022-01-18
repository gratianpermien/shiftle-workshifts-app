import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
  const [pageTitle, setPageTitle] = useState("Test title from state");
  const [currentUser, setCurrentUser] = useState("Natalie Portman");
  console.log(filterDateArrivalEarliest);
  return (
    <>
      <View>
        <AppHeader
          user={currentUser} //aus dem Login
          title={pageTitle} //hier mit useParams arbeiten?
          filterDateArrivalEarliest={filterDateArrivalEarliest}
          filterDateArrivalLatest={filterDateArrivalLatest}
          setFilterDateArrivalEarliest={setFilterDateArrivalEarliest}
          setFilterDateArrivalLatest={setFilterDateArrivalLatest}
        />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="buchungen" element={<Buchungen />} />
          <Route path="schichten" element={<Schichten />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </View>
    </>
  );
}

export default App;

const View = styled.div`
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
