import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookingToShiftModal from "./BookingToShiftModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function BookingCard({
  booking,
  id,
  currentUserRole,
  currentUserName,
  setNewParameters,
  newParameters,
  allBookings,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }

  const bookingRK = booking.rk;
  const bookingUEK = booking.uek;
  const isAdmin = currentUserRole == "ADMIN";
  const isStaffedRK = currentUserRole == "RK" && bookingRK != "";
  const isStaffedUEK = currentUserRole == "UE" && bookingUEK != "";

  return (
    <Card key={id}>
      <UserRibbonWrapper
        isAdmin={isAdmin}
        isStaffedRK={isStaffedRK}
        isStaffedUEK={isStaffedUEK}
      >
        <UserRibbon>
          {currentUserRole == "RK" ? booking.rk : booking.uek}
        </UserRibbon>
      </UserRibbonWrapper>
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
          <AdminInfo isAdmin={isAdmin}>
            <p>
              Übergabe:{" "}
              {booking.uek != "" ? booking.uek : " noch nicht vergeben"}
            </p>
            <p>
              Rücknahme:{" "}
              {booking.rk != "" ? booking.rk : " noch nicht vergeben"}
            </p>
            {/* <p>
              Rücknahme:{" "}
              {booking.rk && booking.timestamp_start_rk != ""
                ? booking.rk +
                  ", Start: " +
                  Intl.DateTimeFormat("de-DE", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(Date.parse(booking.timestamp_start_rk))
                : " noch nicht vergeben"}
            </p> */}
          </AdminInfo>
        </BasicInfo>
        <Interaction>
          <EditButton href="#" isAdmin={isAdmin}>
            <FontAwesomeIcon icon={faCog} />
          </EditButton>
          <BookmarkButton
            onClick={() => setModalIsOpen(true)}
            isStaffedUEK={isStaffedUEK}
            isStaffedRK={isStaffedRK}
            isAdmin={isAdmin}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </BookmarkButton>
          <InfoButton onClick={handleToggle}>
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
      {modalIsOpen && (
        <BookingToShiftModal
          booking={booking}
          currentUserRole={currentUserRole}
          currentUserName={currentUserName}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setNewParameters={setNewParameters}
          newParameters={newParameters}
          allBookings={allBookings}
        />
      )}
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
const AdminInfo = styled.div`
  display: ${(props) => (props.isAdmin ? `block` : `none`)};
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
  display: block;
  color: ${(props) =>
    props.isStaffedRK || props.isStaffedUEK || props.isAdmin
      ? `#8f8f8f;`
      : `#44d68d;`};
  pointer-events: ${(props) =>
    props.isStaffedRK || props.isStaffedUEK || props.isAdmin ? `none` : `auto`};
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
  display: ${(props) => (props.isAdmin ? `block` : `none`)};
  pointer-events: ${(props) => (props.isAdmin ? `auto` : `none`)};
  color: #f1bd4e;
  &:hover,
  &:active {
    color: #d4a744;
  }
`;
const UserRibbonWrapper = styled.div`
  display: ${(props) =>
    props.isStaffedRK || props.isStaffedUEK ? `block` : `none`};
  width: 80px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  z-index: 200;
`;
const UserRibbon = styled.div`
  display: block;
  color: #333;
  text-align: center;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  position: relative;
  padding: min(1vw, 7px);
  top: 11px;
  right: 35px;
  width: 120px;
  background-color: var(--primary-color);
  color: var(--secondary-bg);
  font-size: var(--basic-font-size);
  font-weight: 600;
`;
