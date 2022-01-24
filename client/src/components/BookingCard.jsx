import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function BookingCard({ booking, id, currentUserRole }) {
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <Card key={id}>
      <CardRow>
        <BasicInfo>
          <h2>{booking.client}</h2>
          <h3>
            {booking.fahrzeug}, {"HH-" + booking.kennzeichen}
          </h3>
          <p>
            Abfahrt:
            {" " +
              Intl.DateTimeFormat("de-DE", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              }).format(Date.parse(booking.kombidatum_start))}
          </p>
          <p>
            Ankunft:
            {" " +
              Intl.DateTimeFormat("de-DE", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              }).format(Date.parse(booking.kombidatum_ende))}
          </p>
          <p>Übergabe: {booking.uek != "" ? booking.uek : " John"}</p>
          <p>Rücknahme: {booking.rk != "" ? booking.rk : " Judy"}</p>
        </BasicInfo>
        <Interaction>
          <EditButton href="#" currentUserRole={currentUserRole}>
            <FontAwesomeIcon icon={faCog} />
          </EditButton>
          <BookmarkButton href="#">
            <FontAwesomeIcon icon={faPlusCircle} />
          </BookmarkButton>
          <InfoButton href="#" onClick={handleToggle}>
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </InfoButton>
        </Interaction>
      </CardRow>
      <AddInformation visible={toggle}>
        <h3>Bemerkung:</h3>
        <p>{booking.bemerkung ? booking.bemerkung : " keine Besonderheiten"}</p>
        <h3>Zusatzausstattung:</h3>
        <p>
          {booking.zusatz_1 != "-" ? booking.zusatz_1 : ""}
          {booking.zusatz_2 != "-" ? ", " + booking.zusatz_2 : ""}
          {booking.zusatz_3 != "-" ? ", " + booking.zusatz_3 : ""}
          {booking.zusatz_4 != "-" ? ", " + booking.zusatz_4 : ""}
          {booking.zusatz_5 != "-" ? ", " + booking.zusatz_5 : ""}
          {booking.zusatz_6 != "-" ? ", " + booking.zusatz_6 : ""}
          {booking.zusatz_7 != "-" ? ", " + booking.zusatz_7 : ""}
          {booking.zusatz_8 != "-" ? ", " + booking.zusatz_8 : ""}
          {booking.zusatz_9 != "-" ? ", " + booking.zusatz_9 : ""}
          {booking.zusatz_10 != "-" ? ", " + booking.zusatz_10 : ""}
        </p>
      </AddInformation>
    </Card>
  );
}

const Card = styled.article`
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: var(--secondary-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CardRow = styled.article`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  gap: 5vw;
`;
const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;
const Interaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const AddInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  background: var(--headings-color);
  padding-left: 1em;
  padding-right: 1em;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  padding-bottom: ${(props) => (props.visible ? "1em" : "0")};
  padding-top: ${(props) => (props.visible ? "1em" : "0")};
  height: ${(props) => (props.visible ? "1" : "0")};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: padding-bottom 600ms, padding-top 600ms, height 600ms,
    opacity 600ms;
`;
const BookmarkButton = styled.a`
  font-size: var(--icon-size);
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
  color: #44d68d;
  display: block;
  cursor: pointer;
  transition: all 0.2s;
  &:hover,
  &:active {
    color: #2a8658;
  }
`;
const InfoButton = styled(BookmarkButton)`
  color: #4e95f1;
  &:hover,
  &:active {
    color: #3c74bd;
  }
`;
const EditButton = styled(BookmarkButton)`
  display: ${(props) => (props.currentUserRole == "ADMIN" ? `block` : `none`)};
  color: #f1bd4e;
  &:hover,
  &:active {
    color: #d4a744;
  }
`;
