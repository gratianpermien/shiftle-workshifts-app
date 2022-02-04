import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavItem } from './Buttons';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';

export default function AppHeader({
  admin,
  authenticated,
  currentPage,
  currentUserName,
  currentUserRole,
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
    admin: false,
    buchungen: true,
    log: false,
    schichten: true,
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
              <LogIcon to="/">
                <FontAwesomeIcon icon={faStopCircle} />
              </LogIcon>
            </LogWrapper>
          </Nav>
          <HeaderInteraction>
            <InfoTitle>{currentUserRole == 'UEK' ? 'Abfahrt? ' : 'Ankunft? '}</InfoTitle>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setFilterDateEarliest(date)}
                selected={filterDateEarliest}
                wrapperClassName="date_picker--adjustedwidth"
              />
            </div>
            <div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setFilterDateLatest(date)}
                selected={filterDateLatest}
                wrapperClassName="date_picker--adjustedwidth"
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
  background: var(--tertiary-bg);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.headerTheme ? `block` : `none`)};
  padding: min(5vw, 2em);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 29;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: min(3vw, 1em);
  margin: 0 auto;
  max-width: 600px;
`;
const Nav = styled.div`
  align-items: center;
  display: grid;
  gap: min(3vw, 0.4em);
  grid-template-columns: min(25vw, 150px) min(25vw, 150px) auto;
`;

const LogWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: min(3vw, 0.4em);
  justify-self: end;
`;
const LogIcon = styled(NavLink)`
  color: var(--primary-color);
  display: block;
  font-size: var(--icon-size);
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
  }
`;
const InfoTitle = styled.h3`
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
`;
const HeaderInteraction = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: min(3vw, 0.4em);
  justify-content: flex-end;
  max-width: 100%;
  width: 100%;
`;
