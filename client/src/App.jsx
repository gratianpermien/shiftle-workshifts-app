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
  const [currentPage, setCurrentPage] = useState("")(
    (function () {
      setCurrentPage(
        useLocation().pathname.replace("/", "")
          ? useLocation().pathname.replace("/", "")
          : "start"
      );
    })()
  );

  return (
    <View>
      <AppHeader
        currentUser={currentUser} //aus dem Login?
        currentPage={currentPage}
        filterDateArrivalEarliest={filterDateArrivalEarliest}
        filterDateArrivalLatest={filterDateArrivalLatest}
        setFilterDateArrivalEarliest={setFilterDateArrivalEarliest}
        setFilterDateArrivalLatest={setFilterDateArrivalLatest}
      />
      <Routes>
        <Route exact path="/" element={<Start simpleSite={true} />} />
        <Route
          exact
          path="buchungen"
          element={
            <Buchungen
              filterDateArrivalEarliest={filterDateArrivalEarliest}
              filterDateArrivalLatest={filterDateArrivalLatest}
              simpleSite={false}
            />
          }
        />
        <Route
          exact
          path="schichten"
          element={<Schichten simpleSite={false} />}
        />
        <Route exact path="admin" element={<Admin simpleSite={true} />} />
      </Routes>
    </View>
  );
}

export default App;

//Fallback, wenn keine Route was rendert --> brauche ich das?
const View = styled.div`
  min-height: 100vh;
  bottom: 0;
`;
