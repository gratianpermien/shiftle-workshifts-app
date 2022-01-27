import React, { useState } from "react";
import styled from "styled-components";
import { CenteredButton } from "./Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapperStyles } from "../shared/GlobalStyle";

export default function BookingToShiftModal({
  booking,
  currentUserRole,
  setModalIsOpen,
  newParameters,
  allBookings,
}) {
  const [saveActivated, setSaveActivated] = useState(false);
  const [error, setError] = useState(false);
  console.log(allBookings);
  //Calculation for datepicker limitation (role: RK) and state
  const shiftBeginTime =
    currentUserRole == "UEK"
      ? Date.parse(booking.kombidatum_start) -
        newParameters.shiftBufferHandoverMins * 60 * 1000
      : Date.parse(booking.kombidatum_ende) +
        newParameters.shiftBufferReturnMins * 60 * 1000 -
        1 * 60 * 1000;
  const msPerDay = 24 * 3600 * 1000;
  const shiftTimeOnly = msPerDay - (shiftBeginTime % msPerDay);
  const morningTimeOnly = 3 * 3600 * 1000;
  const shiftEndNextMorning = shiftTimeOnly + morningTimeOnly + shiftBeginTime;
  const filterTimeWindow = (time) => {
    if (currentUserRole == "UEK") {
      const earliestDate = new Date(shiftBeginTime);
      const latestDate = new Date(shiftBeginTime);
      const selectedDate = new Date(time);
      return (
        earliestDate.getTime() < selectedDate.getTime() &&
        selectedDate.getTime() < latestDate.getTime()
      );
    } else {
      const earliestDate = new Date(shiftBeginTime);
      const latestDate = new Date(shiftEndNextMorning);
      const selectedDate = new Date(time);
      return (
        earliestDate.getTime() < selectedDate.getTime() &&
        selectedDate.getTime() < latestDate.getTime()
      );
    }
  };
  const [rkTimestamp, setRKTimestamp] = useState(shiftBeginTime);
  const [uekTimestamp, setUEKTimestamp] = useState(shiftBeginTime);

  //Define worktime for return only (!), build time config array (presenceSlices)
  let durationReturn = "";
  switch (booking.fahrzeug.substring(0, 3)) {
    case "DRE":
      durationReturn = newParameters.durationDreamerHrs;
      break;
    case "ADV":
      durationReturn = newParameters.durationAdventurerHrs;
      break;
    case "TRA":
      durationReturn = newParameters.durationTravelerHrs;
      break;
  }
  const firstHour = new Date(
    currentUserRole == "UEK" ? uekTimestamp : rkTimestamp
  ).getHours();
  const lastHour =
    currentUserRole == "UEK"
      ? rkTimestamp.getHours()
      : firstHour + durationReturn - 1;
  let presenceSlices = [];
  if (lastHour < 24) {
    for (let i = firstHour; i <= lastHour; i++) {
      presenceSlices = [...presenceSlices, i];
    }
  } else {
    const lastHourNextDay = lastHour - 24;
    for (let i = firstHour; i < 24; i++) {
      presenceSlices = [...presenceSlices, i];
    }
    for (let i = 0; i <= lastHourNextDay; i++) {
      presenceSlices = [...presenceSlices, i];
    }
  }

  //Check for parallel vehicles (through array comparison) and if allowed, write to DB
  function checkParallel(presenceSlices, newParameters) {
    let parallelPresence = 0;
    allBookings.every((booking) => {
      const doublePresence = booking.presenceSlices.some((presenceSlice) =>
        presenceSlices.includes(presenceSlice)
      );
      doublePresence && parallelPresence + 1;
      if (parallelPresence > newParameters.presenceParallel) {
        console.log("too many cars at the same time");
        setError(true);
        return false;
      } else {
        console.log("shift allowed");
        setSaveActivated(true);
        //Datenbank schreiben
        return true;
      }
    });
  }
  return (
    <>
      <Modal>
        <InputContainer>
          <CenteredButton onClick={() => setModalIsOpen(false)}>
            Schließen
          </CenteredButton>{" "}
          <Title>Startzeit?</Title>
          <Confirm>
            {saveActivated ? <div>Schicht gespeichert.</div> : null}
          </Confirm>
          <Error>
            {error ? <div>Zu viele Fahrzeuge gleichzeitig.</div> : null}
          </Error>
          <div>Wähle bitte deine Startzeit im angezeigten Zeitraum.</div>
          <DatePicker
            wrapperClassName="date_picker--adjustedwidthlarge"
            selected={currentUserRole == "UEK" ? uekTimestamp : rkTimestamp}
            onChange={
              currentUserRole == "UEK"
                ? (date) => setUEKTimestamp(date)
                : (date) => setRKTimestamp(date)
            }
            onCalendarClose={() => setSaveActivated(true)}
            showTimeSelect
            minDate={shiftBeginTime}
            maxDate={shiftEndNextMorning}
            filterTime={filterTimeWindow}
            timeIntervals={60}
            timeCaption="Uhrzeit"
            dateFormat="dd/MM/yyyy HH:mm"
          />
          <DatePickerWrapperStyles />
          <div>
            Mit diesem Startzeitpunkt wäre das Fahrzeug für {durationReturn}{" "}
            Stunden in den Stunden {presenceSlices.join(", ")} in der
            Aufbereitung. Zeitgleich anwesende Fahrzeuge:
          </div>
          <SaveButton
            saveActivated={saveActivated}
            onClick={() => {
              checkParallel();
              setTimeout(() => {
                setModalIsOpen(false);
              }, 2000);
            }}
          >
            Prüfen
          </SaveButton>{" "}
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
  background-color: rgba(255, 255, 255, 0.9);
  width: 100vw;
  height: 100vh;
  z-index: 499;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
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

const SaveButton = styled(CenteredButton)`
  pointer-events: ${(props) => (props.saveActivated ? `auto` : `none`)};
`;
