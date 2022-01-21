import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function AppHeader({
  authenticated,
  currentUser,
  currentPage,
  filterDateArrivalEarliest,
  filterDateArrivalLatest,
  setFilterDateArrivalEarliest,
  setFilterDateArrivalLatest,
}) {
  //Refresh shift information from Monday
  async function updateShifts() {
    const response = await fetch("api/shifts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const syncData = await response;
    // location.reload(); //brauche ich das? Ist die Antwort vom Server korrekt?
    alert("Sync successful", syncData);
  }
  useEffect(async () => {
    await updateShifts();
  }, []);

  const headerTheming = {
    log: false,
    buchungen: true,
    schichten: true,
    admin: false,
  };
  const headerTheme = authenticated && headerTheming[currentPage];
  return (
    <>
      <UserRibbonWrapper headerTheme={headerTheme}>
        <UserRibbon>{currentUser}</UserRibbon>
      </UserRibbonWrapper>
      <HeaderWrapper headerTheme={headerTheme}>
        <Header>
          <Nav>
            <NavItem to="/">Logout</NavItem>
            <NavItem to="/buchungen">Buchungen</NavItem>
            <NavItem to="/schichten">Schichten</NavItem>
            <NavItem to="/admin">Admin</NavItem>
          </Nav>

          <HeaderInteraction>
            <h1>{currentPage}</h1>
            <FilterSection>
              {/* <TemporarySyncButton href="#">
              <FontAwesomeIcon icon={faSyncAlt} onClick={updateShifts} />
            </TemporarySyncButton> */}
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
    </>
  );
}
//Styling for DatePicker lives in GlobalStyles
const HeaderWrapper = styled.footer`
  display: ${(props) => (props.headerTheme ? `block` : `none`)};
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--tertiary-bg);
  padding: 5vw;
  z-index: 200;
`;
const Header = styled.div`
  display: flex;
  gap: min(3vw, 1em);
  max-width: 600px;
  margin: 0 auto;
`;
const UserRibbonWrapper = styled.div`
  display: ${(props) => (props.headerTheme ? `block` : `none`)};
  width: 80px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  right: 0;
  z-index: 300;
`;
const UserRibbon = styled.div`
  color: #333;
  text-align: center;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  position: relative;
  padding: min(1vw, 7px);
  top: 20px;
  right: 10px;
  width: 120px;
  background-color: var(--primary-color);
  color: #fff;
  font-size: var(--basic-font-size);
  font-weight: 600;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
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
