import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function AppHeader({
  authenticated,
  admin,
  currentUserName,
  currentPage,
  setNewParameters,
  newParameters,
  filterDateArrivalEarliest,
  filterDateArrivalLatest,
  setFilterDateArrivalEarliest,
  setFilterDateArrivalLatest,
}) {
  //Refresh shift information from Monday and get admin data if admin
  async function updateShifts() {
    const response = await fetch("api/shifts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const syncData = await response;
  }
  async function fetchAdminParameters() {
    const response = await fetch("api/admin");
    const fetchedData = await response.json();
    setNewParameters(fetchedData[0]);
  }
  useEffect(async () => {
    await updateShifts();
    await fetchAdminParameters();
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
        <UserRibbon>{currentUserName}</UserRibbon>
      </UserRibbonWrapper>
      <HeaderWrapper headerTheme={headerTheme}>
        <Header>
          <Nav>
            <NavItem to="/">Logout</NavItem>
            <NavItem to="/buchungen">Buchungen</NavItem>
            <NavItem to="/schichten">Schichten</NavItem>
            {admin ? <NavItem to="/admin">Admin</NavItem> : null}
          </Nav>
          <HeaderInteraction>
            <h1>{currentPage}</h1>
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
  position: fixed;
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
  top: 11px;
  right: 11px;
  width: 120px;
  background-color: var(--primary-color);
  color: var(--secondary-bg);
  font-size: var(--basic-font-size);
  font-weight: 600;
`;
const Nav = styled.div`
  width: min(25vw, 150px);
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
  color: var(--secondary-bg);
  background-color: var(--primary-color);
  opacity: 1;
  text-align: left;
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
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
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;
