import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import shiftle_logo from "../assets/shiftle_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function AppHeader({
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
    location.reload();
    alert("Sync successful", syncData);
  }
  return (
    <HeaderWrapper>
      <Header>
        <Nav>
          <NavItem to="/">Buchungen</NavItem>
          <NavItem to="myshifts">Schichten</NavItem>
          <NavItem to="admin">Admin</NavItem>
        </Nav>
        <HeaderInteraction>
          <FilterSection>
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
            <div>
              <TemporarySyncButton href="#">
                <FontAwesomeIcon icon={faSyncAlt} onClick={updateShifts} />
              </TemporarySyncButton>
            </div>
          </FilterSection>
          <h1>Alle Buchungen</h1>
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
  /* height: min(24vw, 200px); */
  background: var(--tertiary-bg);
  margin-bottom: 1em;
  padding: 5vw;
  z-index: 999;
`;
const Header = styled.header`
  display: flex;
  gap: min(3vw, 1em);
  max-width: 600px;
  margin: 0 auto;
  img {
    width: 6vw;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  }
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
  gap: 0.2em;
  max-width: 100%;
`;
const HeaderInteraction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TemporarySyncButton = styled.a`
  font-size: 2em;
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
