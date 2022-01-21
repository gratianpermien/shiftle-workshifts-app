//https://www.npmjs.com/package/react-form

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";

function Admin() {
  return (
    <View>
      <AdminContainer>
        <p>Das ist die Adminseite</p>
      </AdminContainer>
      <FooterWrapper>
        <Footer>
          <NavItem to="/buchungen">Zurück</NavItem>
          <NavItem to="/buchungen">Speichern</NavItem>
        </Footer>
      </FooterWrapper>
    </View>
  );
}
export default Admin;

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}), var(--primary-bg);
  background-attachment: fixed;
  min-height: 100vh;
  padding: 1rem 5vw 25vh;
`;

const AdminContainer = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 0 auto;
  z-index: 99;
`;

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 3vw;
  z-index: 999;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: min(3vw, 1em);
  max-width: 600px;
  margin: 0 auto;
`;

const NavItem = styled(Link)`
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
