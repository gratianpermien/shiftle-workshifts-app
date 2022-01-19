//Login https://www.npmjs.com/package/react-simple-oauth2-login#basic-example

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";

function Start({ headerStrip }) {
  const [user, setUser] = useState([]);

  return (
    <View>
      <Container>
        <p>DAS IST DIE STARTSEITE</p>
      </Container>
    </View>
  );
}

export default Start;

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}),
    url("https://www.hamburg-startups.net/wp-content/uploads/2021/06/Produkt_Aussen_Dreamer_0035-1030x687.jpg");
  background-attachment: fixed;
  min-height: 100vh;
  padding-bottom: 20vh;
  position: relative;
  bottom: 0;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`;
