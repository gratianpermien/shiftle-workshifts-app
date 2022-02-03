import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const textButtonBasics = `
  font-size: var(--basic-font-size);
  width: min(25vw, 150px);
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
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
