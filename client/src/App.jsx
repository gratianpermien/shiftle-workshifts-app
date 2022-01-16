import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import AppHeader from "./components/Header";
import BookingCard from "./components/BookingCard";

//import fetchBookingDataFromMonday from "./lib/mondayFetch"
//import fetch, components (admin form, shift create and edit form, cards, buttons) and local storage

function App() {
  const [allBookings, setAllBookings] = useState([]);
  const [filterDateArrivalEarliest, setFilterDateArrivalEarliest] = useState(
    new Date()
  );
  const [filterDateArrivalLatest, setFilterDateArrivalLatest] = useState(
    new Date().setDate(new Date().getDate() + 30)
  );
  //First & most important step: Prepare asynchronous fetch from Monday GraphQL API (fetchBookingDataFromMonday();) and update / post shift information to server / database (mondayFetch.js)
  //definierte Route auf dem Server anwerfen

  //Get shift information from server / database on opening the app
  async function fetchShifts() {
    const res = await fetch("api/shifts");
    const fetchedData = await res.json();
    setAllBookings(fetchedData);
  }
  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <View>
      <AppHeader
        filterDateArrivalEarliest={filterDateArrivalEarliest}
        filterDateArrivalLatest={filterDateArrivalLatest}
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
`;

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
