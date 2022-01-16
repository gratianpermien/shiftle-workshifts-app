import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import shiftle_logo from "../assets/shiftle_logo.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function AppHeader({
  filterDateArrivalEarliest,
  filterDateArrivalLatest,
}) {
  return (
    <Header>
      <img src={shiftle_logo} alt="icon shiftle" />
      <Nav>
        <NavItem to="/">Alle</NavItem>
        <NavItem to="myshifts">Meine</NavItem>
        <NavItem to="admin">Admin</NavItem>
      </Nav>
      <HeaderInteraction>
        <p>Ankunft zwischen</p>
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
        </FilterSection>
        <h1>Alle Buchungen</h1>
      </HeaderInteraction>
    </Header>
  );
}
//DatePicker lives in GlobalStyles
const Header = styled.header`
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 3vw;
  position: sticky;
  top: 0;
  width: 100%;
  max-height: 30vw;
  background: var(--tertiary-bg);
  margin-bottom: 1em;
  padding: 5vw;
  img {
    width: 10vw;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  }
`;
const Nav = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  gap: 2vw;
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
