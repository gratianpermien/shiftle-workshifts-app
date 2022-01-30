import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";

import Log from "./pages/Log";
import Admin from "./pages/Admin";
import Schichten from "./pages/Shifts";
import Buchungen from "./pages/Bookings";

import AppHeader from "./components/Header";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [newParameters, setNewParameters] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [filterDateEarliest, setFilterDateEarliest] = useState(
    new Date()
  );
  const [filterDateLatest, setFilterDateLatest] = useState(
    new Date().setDate(new Date().getDate() + 30)
  );


  //Read path for path-dependant theming of header (log is for "/" route)
  const pageSlug = useLocation().pathname.replace("/", "");
  const currentPage = pageSlug ? pageSlug : "log";
  return (
    <View>
      <AppHeader
        authenticated={authenticated}
        currentUserRole={user.role}
        admin={admin} //überflüssig?
        setNewParameters={setNewParameters}
        newParameters={newParameters}
        currentPage={currentPage}
        filterDateEarliest={filterDateEarliest}
        filterDateLatest={filterDateLatest}
        setFilterDateEarliest={setFilterDateEarliest}
        setFilterDateLatest={setFilterDateLatest}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Log
              currentUser={user}
              setUser={setUser}
              admin={admin}
              setAdmin={setAdmin}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          }
        />
        {
          //Check if authenticated and activate all routes
          authenticated ? (
            <>
              <Route
                exact
                path="buchungen"
                element={
                  <Buchungen
                    filterDateEarliest={filterDateEarliest}
                    filterDateLatest={filterDateLatest}
                    simpleSite={false}
                    currentUser={user}
                    setNewParameters={setNewParameters}
                    newParameters={newParameters}
                  />
                }
              />
              <Route
                exact
                path="schichten"
                element={<Schichten simpleSite={false} />}
              />
              user.role == "ADMIN" ? (
              <Route
                exact
                path="admin"
                element={
                  <Admin
                    simpleSite={true}
                    newParameters={newParameters}
                    setNewParameters={setNewParameters}
                  />
                }
              />
              ) : (
              <Route
                exact
                path="buchungen"
                element={
                  <Buchungen
                    filterDateEarliest={filterDateEarliest}
                    filterDateLatest={filterDateLatest}
                    simpleSite={false}
                    currentUser={user}
                  />
                }
              />
              )
            </>
          ) : (
            <>
              <Route
                exact
                path="buchungen"
                element={<Navigate to="/" replace={true} />}
              />
              <Route
                exact
                path="schichten"
                element={<Navigate to="/" replace={true} />}
              />
              <Route
                exact
                path="buchungen"
                element={<Navigate to="/" replace={true} />}
              />
              <Route
                exact
                path="admin"
                element={<Navigate to="/" replace={true} />}
              />
              <Route
                exact
                path="/"
                element={
                  <Log
                    currentUser={user}
                    setUser={setUser}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                    simpleSite={true}
                  />
                }
              />
            </>
          )
        }
      </Routes>
    </View>
  );
}

export default App;

const View = styled.div``;
