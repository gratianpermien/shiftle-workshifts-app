import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const textButtonBasics = `
  background-color: var(--primary-color);
  border-radius: 2em;
  border: 2px solid var(--primary-color);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: var(--secondary-bg);
  display: block;
  font-size: var(--basic-font-size);
  font-weight: 600;
  padding: 0.4em 0.5em;
  text-align: center;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
  width: min(25vw, 150px);
  &:hover {
    border: 2px solid var(--headings-color);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    color: var(--headings-color);
  }
  &.active {
    border: 2px solid var(--headings-color);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    color: var(--headings-color);
  }
`;

const CenteredButton = styled.button`
  ${textButtonBasics};
`;
const InputButton = styled.input`
  ${textButtonBasics};
`;
const SingleRouteButton = styled(Link)`
  ${textButtonBasics};
`;
const NavItem = styled(NavLink)`
  ${textButtonBasics};
`;

export { CenteredButton, SingleRouteButton, InputButton, NavItem };
