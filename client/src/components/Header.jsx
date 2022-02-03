import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';

export default function AppHeader({
  authenticated,
  admin,
  currentUserRole,
  currentUserName,
  currentPage,
  filterDateEarliest,
  filterDateLatest,
  setFilterDateEarliest,
  setFilterDateLatest,
}) {
  //Refresh shift information from Monday and get admin data if admin (preload sits in Header)
  async function updateShifts() {
    await fetch('api/shifts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
      <HeaderWrapper headerTheme={headerTheme}>
        <Header>
          <Nav>
            <NavItem to="/buchungen">Buchungen</NavItem>
            {admin ? <NavItem to="/admin">Settings</NavItem> : <NavItem to="/schichten">Schichten</NavItem>}
            <LogWrapper>
              <InfoTitle>{currentUserName}.</InfoTitle>
              <Icon to="/">
                <FontAwesomeIcon icon={faStopCircle} />
              </Icon>
            </LogWrapper>
          </Nav>
          <HeaderInteraction>
            <InfoTitle>{currentUserRole == 'UEK' ? 'Abfahrt? ' : 'Ankunft? '}</InfoTitle>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                wrapperClassName="date_picker--adjustedwidth"
                selected={filterDateEarliest}
                onChange={(date) => setFilterDateEarliest(date)}
              />
            </div>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                wrapperClassName="date_picker--adjustedwidth"
                selected={filterDateLatest}
                onChange={(date) => setFilterDateLatest(date)}
              />
              <DatePickerWrapperStyles />
            </div>
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
  padding: min(5vw, 2em);
  z-index: 250;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: min(3vw, 1em);
  max-width: 600px;
  margin: 0 auto;
`;
const Nav = styled.div`
  display: grid;
  grid-template-columns: min(25vw, 150px) min(25vw, 150px) auto;
  gap: min(3vw, 0.4em);
  align-items: center;
`;
const NavItem = styled(NavLink)`
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 0.5em;
  border-radius: 2em;
  border: 2px solid var(--primary-color);
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondary-bg);
  background-color: var(--primary-color);
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid var(--headings-color);
  }
`;

const LogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: end;
  gap: min(3vw, 0.4em);
  align-items: center;
`;
const Icon = styled(NavLink)`
  font-size: var(--icon-size);
  display: block;
  color: var(--primary-color);
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
  }
`;
const InfoTitle = styled.h3`
  font-weight: 600;
  text-transform: uppercase;
  color: var(--primary-color);
`;
const HeaderInteraction = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: min(3vw, 0.4em);
  max-width: 100%;
  align-items: center;
`;
