import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const CenteredButton = styled.button`
  font-size: var(--basic-font-size);
  width: min(25vw, 150px);
  text-align: center;
  border: none;
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 0.5em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondary-bg);
  background-color: var(--primary-color);
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
  }
`;
const SingleRouteButton = styled(Link)`
  font-size: var(--basic-font-size);
  width: min(25vw, 150px);
  text-align: center;
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 0.5em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondary-bg);
  background-color: var(--primary-color);
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
  }
`;

const InputButton = styled.input`
  font-size: var(--basic-font-size);
  width: min(25vw, 150px);
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 0.4em 0.5em;
  border-radius: 2em;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondary-bg);
  background-color: var(--primary-color);
  transition: all 0.2s;
  &:hover {
    color: var(--headings-color);
  }
  &.active {
    color: var(--headings-color);
  }
`;
const NavItem = styled(NavLink)`
  display: block;
  width: min(25vw, 150px);
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
export { CenteredButton, SingleRouteButton, InputButton, NavItem };
