import React, { useState, useEffect } from "react";
import { Route, Routes, NavLink, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function AppHeader({
  currentUser,
  currentPage,
  filterDateArrivalEarliest,
  filterDateArrivalLatest,
  setFilterDateArrivalEarliest,
  setFilterDateArrivalLatest,
}) {
  //Refresh shift information from Monday --> Database on clicking Sync
  async function updateShifts(e) {
    e.preventDefault();
    const response = await fetch("api/shifts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const syncData = await response;
    location.reload(); //brauche ich das?
    alert("Sync successful", syncData);
  }

  // switch (case) {
  //   case "1":
  //       // some code
  //       break;
  //   case "two":
  //       // some code
  //       break;
  //   case "III":
  //       if (!shouldProceed) {
  //         return false;
  //       }
  //       // tasks to be done for case III
  //       break;
  //   case "4":
  //       // case 4 code
  //       break;
  //   default:
  //       // default tasks
  //       break;
  //   }

  return (
    <HeaderWrapper>
      <Header>
        <Nav>
          <NavItem to="/">Start</NavItem>
          <NavItem to="/buchungen">Buchungen</NavItem>
          <NavItem to="/schichten">Schichten</NavItem>
          <NavItem to="/admin">Admin</NavItem>
        </Nav>
        <HeaderInteraction headerTheming={headerTheming}>
          <h3>Moin, {currentUser}!</h3>
          <h1>{currentPage}</h1>
          <FilterSection>
            <TemporarySyncButton href="#">
              <FontAwesomeIcon icon={faSyncAlt} onClick={updateShifts} />
            </TemporarySyncButton>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                wrapperClassName="date_picker--adjustedwidth"
                selected={filterDateArrivalEarliest}
                onChange={(date) => setFilterDateArrivalEarliest(date)}
              />
            </div>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                wrapperClassName="date_picker--adjustedwidth"
                selected={filterDateArrivalLatest}
                onChange={(date) => setFilterDateArrivalLatest(date)}
              />
              <DatePickerWrapperStyles />
            </div>
          </FilterSection>
        </HeaderInteraction>
      </Header>
    </HeaderWrapper>
  );
}
//Styling for DatePicker lives in GlobalStyles
const HeaderWrapper = styled.div`
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--tertiary-bg);
  padding: 5vw;
  z-index: 999;
`;
const Header = styled.header`
  display: flex;
  gap: min(3vw, 1em);
  max-width: 600px;
  margin: 0 auto;
`;
const Nav = styled.div`
  width: min(27vw, 140px);
  display: flex;
  flex-direction: column;
  gap: min(3vw, 0.4em);
`;
const NavItem = styled(NavLink)`
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 1em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary-color);
  opacity: 0.7;
  text-align: left;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
  }
`;
const FilterSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.2em;
  max-width: 100%;
`;
const HeaderInteraction = styled.div`
  display: ${(props) => (props.headerTheming ? `none` : `flex`)};
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const TemporarySyncButton = styled.a`
  font-size: 1em;
  padding: 0.4em;
  align-self: end;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
  color: #707070;
  display: block;
  cursor: pointer;
  transition: all 0.2s;
  &:hover,
  &:active {
    color: #ca6e44;
  }
`;
