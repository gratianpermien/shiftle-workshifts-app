import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";

function Schichten() {
  return (
    <View>
      <ShiftsContainer>
        <p>Das ist die Schichtenseite, hier ist noch Baustelle 🚧</p>
      </ShiftsContainer>
    </View>
  );
}
export default Schichten;

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}), var(--primary-bg);
  background-attachment: fixed;
  min-height: 100vh;
  padding: 1rem 5vw 25vh;
`;

const ShiftsContainer = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`;
