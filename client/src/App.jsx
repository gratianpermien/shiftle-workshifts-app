import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Log from './pages/Log';
import Admin from './pages/Admin';
import Shifts from './pages/Shifts';
import Bookings from './pages/Bookings';
import AppHeader from './components/Header';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [newParameters, setNewParameters] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newBooking, setNewBooking] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [filterDateEarliest, setFilterDateEarliest] = useState(new Date());
  const [filterDateLatest, setFilterDateLatest] = useState(new Date().setDate(new Date().getDate() + 30));

  //Get booking information from server / database (updates itself in backend) on opening the app / reloading and store in state
  async function fetchShifts() {
    const res = await fetch('api/shifts');
    const fetchedData = await res.json();
    setAllBookings(fetchedData);
  }

  //Get all users for comparison in Login function and dropdowns
  async function fetchUsers() {
    const res = await fetch('api/users');
    const fetchedData = await res.json();
    setAllUsers(fetchedData);
  }

  //Get all admin parameters (update sits in Admin)
  async function fetchAdminParams() {
    const res = await fetch('api/admin');
    const fetchedData = await res.json();
    setNewParameters(fetchedData[0]);
  }
  useEffect(() => {
    fetchShifts();
    fetchAdminParams();
    fetchUsers();
  }, [newBooking, newUser]);

  //Read path for path-dependant theming of components (log is for "/" route)
  const pageSlug = useLocation().pathname.replace('/', '');
  const currentPage = pageSlug ? pageSlug : 'log';

  return (
    <View>
      <AppHeader
        authenticated={authenticated}
        currentUserRole={user.role}
        currentUserName={user.name}
        admin={admin}
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
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              currentUser={user}
              setUser={setUser}
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
                  <Bookings
                    allUsers={allUsers}
                    filterDateEarliest={filterDateEarliest}
                    filterDateLatest={filterDateLatest}
                    currentUser={user}
                    currentPage={currentPage}
                    allBookings={allBookings}
                    setAllBookings={setAllBookings}
                    newParameters={newParameters}
                  />
                }
              />
              <Route
                exact
                path="schichten"
                element={
                  <Shifts
                    allUsers={allUsers}
                    filterDateEarliest={filterDateEarliest}
                    filterDateLatest={filterDateLatest}
                    currentUser={user}
                    currentPage={currentPage}
                    allBookings={allBookings}
                    newParameters={newParameters}
                  />
                }
              />
              user.role == "ADMIN" ? (
              <Route
                exact
                path="admin"
                element={
                  <Admin
                    newParameters={newParameters}
                    setNewParameters={setNewParameters}
                    newUser={newUser}
                    setNewUser={setNewUser}
                    newBooking={newBooking}
                    setNewBooking={setNewBooking}
                  />
                }
              />
              ) : (
              <Route
                exact
                path="buchungen"
                element={
                  <Bookings
                    filterDateEarliest={filterDateEarliest}
                    filterDateLatest={filterDateLatest}
                    currentUser={user}
                  />
                }
              />
              )
            </>
          ) : (
            <>
              <Route exact path="buchungen" element={<Navigate to="/" replace={true} />} />
              <Route exact path="schichten" element={<Navigate to="/" replace={true} />} />
              <Route exact path="buchungen" element={<Navigate to="/" replace={true} />} />
              <Route exact path="admin" element={<Navigate to="/" replace={true} />} />
              <Route
                exact
                path="/"
                element={
                  <Log
                    currentUser={user}
                    setUser={setUser}
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
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
