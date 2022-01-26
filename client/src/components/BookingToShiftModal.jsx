import React, { useState } from "react";
import styled from "styled-components";
import { InputButton, CenteredButton } from "./Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function BookingToShiftModal({
  booking,
  currentUserRole,
  modalIsOpen,
  setModalIsOpen,
  setNewParameters,
  newParameters,
}) {
  const shiftBeginTime =
    currentUserRole == "UEK"
      ? Date.parse(booking.kombidatum_start) +
        newParameters.shiftBufferHandoverMins * 60 * 1000
      : Date.parse(booking.kombidatum_ende) +
        newParameters.shiftBufferReturnMins * 60 * 1000;

  const [rkTimestamp, setRKTimestamp] = useState(shiftBeginTime);
  const [uekTimestamp, setUEKTimestamp] = useState(shiftBeginTime);

  console.log(rkTimestamp, uekTimestamp);

  const msPerDay = 24 * 3600 * 1000;
  const shiftTimeOnly = msPerDay - (shiftBeginTime % msPerDay);
  const morningTimeOnly = 3 * 3600 * 1000;
  const shiftNextMorning = shiftTimeOnly + morningTimeOnly + shiftBeginTime;

  const filterTimeWindow = (time) => {
    const earliestDate = new Date(shiftBeginTime);
    const latestDate = new Date(shiftNextMorning);
    const selectedDate = new Date(time);
    return (
      earliestDate.getTime() < selectedDate.getTime() &&
      selectedDate.getTime() < latestDate.getTime()
    );
  };
  return (
    <>
      <Modal>
        <InputContainer>
          <CenteredButton onClick={() => setModalIsOpen(false)}>
            Schließen
          </CenteredButton>{" "}
          <Title>Startzeit?</Title>
          {/* <Confirm>{newUser ? <div>User ist angelegt.</div> : ""}</Confirm>
          <Error>{error ? <div>{error}</div> : ""}</Error> */}
          <div>
            Wähle bitte deine Startzeit im angezeigten Zeitraum. Wenn bereits zu
            viele Fahrzeuge zur gleichen Zeit bearbeitet werden, erscheint eine
            Fehlermeldung – wähle dann bitte eine andere Zeit aus.
          </div>
          <DatePicker
            wrapperClassName="date_picker--adjustedwidthlarge"
            selected={currentUserRole == "UEK" ? uekTimestamp : rkTimestamp}
            onChange={
              currentUserRole == "UEK"
                ? (date) => setUEKTimestamp(date)
                : (date) => setRKTimestamp(date)
            }
            showTimeSelect
            minDate={shiftBeginTime}
            maxDate={shiftNextMorning}
            filterTime={filterTimeWindow}
            timeIntervals={60}
            timeCaption="Uhrzeit"
            dateFormat="dd/MM/yyyy HH:mm"
          />
          <CenteredButton onClick={() => setModalIsOpen(false)}>
            {/* Prüfen-Funktion */}Go! (inaktiv)
          </CenteredButton>{" "}
        </InputContainer>
      </Modal>
    </>
  );
}

const Title = styled.h1`
  color: rgba(42, 42, 42, 1);
`;
const Confirm = styled.h3`
  color: rgba(42, 42, 42, 1);
`;
const Error = styled.h3`
  color: var(--primary-color);
`;

const Modal = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  z-index: 499;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
const InputContainer = styled.div`
  width: min(38vw, 600px);
  margin: 0 auto;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
`;
