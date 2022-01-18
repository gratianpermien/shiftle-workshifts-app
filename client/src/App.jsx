import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import shiftle_logo from "./assets/shiftle_logo.svg";

import AppHeader from "./components/Header";
import BookingCard from "./components/BookingCard";

function App() {
  const [allBookings, setAllBookings] = useState([]);
  const [filterDateArrivalEarliest, setFilterDateArrivalEarliest] = useState(
    new Date()
  );
  const [filterDateArrivalLatest, setFilterDateArrivalLatest] = useState(
    new Date().setDate(new Date().getDate() + 30)
  );

  //Get shift information from server / database on opening the app
  async function fetchShifts() {
    const res = await fetch("api/shifts");
    const fetchedData = await res.json();
    setAllBookings(fetchedData);
  }
  useEffect(() => {
    fetchShifts();
    //update Data with Monday Data
  }, []);

  return (
    <View>
      <AppHeader
        filterDateArrivalEarliest={filterDateArrivalEarliest}
        filterDateArrivalLatest={filterDateArrivalLatest}
        setFilterDateArrivalEarliest={setFilterDateArrivalEarliest}
        setFilterDateArrivalLatest={setFilterDateArrivalLatest}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              {allBookings
                .filter(
                  (booking) =>
                    new Date(booking.kombidatum_ende) >=
                      new Date(filterDateArrivalEarliest) &&
                    new Date(booking.kombidatum_ende) <=
                      new Date(filterDateArrivalLatest)
                )
                .map((booking) => (
                  <BookingCard id={booking._id} booking={booking} />
                ))}
            </Container>
          }
        />
      </Routes>
    </View>
  );
}

export default App;

const View = styled.div`
  background: var(--primary-bg);
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
