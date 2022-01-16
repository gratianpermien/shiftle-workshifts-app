import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
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

  //Post new shift data to Database with form (call within Form) --> overlay from admin
  async function updateDatebase() {
    const result = await fetch("api/update");
    const resultList = await result.json();
    const updated = await fetch("api/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultList),
    });
    return await result.json();
  }

  return (
    <View>
      <Header
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

// const Header = styled.header`
//   box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
//   display: flex;
//   gap: 3vw;
//   position: sticky;
//   top: 0;
//   width: 100%;
//   max-height: 30vw;
//   background: var(--tertiary-bg);
//   margin-bottom: 1em;
//   padding: 5vw;
//   img {
//     width: 10vw;
//     filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
//   }
// `;

const Container = styled.div`
  width: 90vw;
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
