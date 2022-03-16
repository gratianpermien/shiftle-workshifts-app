import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bookingPresenceSlices from '../lib/TimeDateCalc';
import { CenteredButton } from './Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';

export default function BookingToShiftModal({
  allBookings,
  booking,
  currentUserName,
  currentUserRole,
  newParameters,
  setBookingToShiftModalIsOpen,
}) {
  const [updatedBooking, setUpdatedBooking] = useState('');
  const [saveActivated, setSaveActivated] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateBooking(updatedBooking);
  }, [updatedBooking]);

  //Calculation for datepicker limitation (role: RK) and state
  const shiftBeginTime =
    currentUserRole == 'UEK'
      ? Date.parse(booking.kombidatum_start) - newParameters.shiftBufferHandoverMins * 1000 * 60
      : Date.parse(booking.kombidatum_ende) + newParameters.shiftBufferReturnMins * 1000 * 60;
  const msPerDay = 24 * 3600 * 1000;
  const shiftTimeOnly = msPerDay - (shiftBeginTime % msPerDay);
  const morningTimeOnly = 3 * 3600 * 1000; //3 am the following day is limit for vehicle returns (RK role)
  const shiftEndTime =
    currentUserRole == 'UEK' ? shiftBeginTime + 1 * 3600 * 1000 : shiftTimeOnly + morningTimeOnly + shiftBeginTime;

  const filterTimeWindow = (time) => {
    const earliestDate = new Date(shiftBeginTime);
    const selectedDate = new Date(time);
    const latestDate = new Date(shiftEndTime);
    return earliestDate.getTime() <= selectedDate.getTime() && selectedDate.getTime() <= latestDate.getTime();
  };

  //Timestamps for datepicker and presence calculation
  const [rkTimestamp, setRKTimestamp] = useState(shiftBeginTime);
  const [uekTimestamp, setUEKTimestamp] = useState(shiftBeginTime);

  function checkParallel(booking, currentUserRole, currentUserName) {
    const presenceSlices = bookingPresenceSlices(booking, newParameters, currentUserRole, uekTimestamp, rkTimestamp);
    //Check for parallel vehicles (through array comparison) and if allowed, write to DB, otherwise stop and display error
    let parallelPresence = 0;
    const overlap = (element) => presenceSlices.includes(element);
    allBookings.some((element) => {
      let bookingpresence = element.presence_slices;
      let doublePresence = bookingpresence.some(overlap);
      doublePresence ? parallelPresence++ : parallelPresence;
      if (parallelPresence >= newParameters.presenceParallel) {
        setError(true);
        return false;
      } else {
        setAccepted(true);
        setError(false);
        const staffNameStampUEK = currentUserRole == 'UEK' ? currentUserName : booking.uek;
        const staffNameStampRK = currentUserRole == 'RK' ? currentUserName : booking.rk;
        const totalSlices = [booking.presence_slices, ...presenceSlices];
        const modifier = {
          presence_slices: totalSlices.flat().sort(),
          uek: staffNameStampUEK,
          rk: staffNameStampRK,
        };
        setUpdatedBooking(Object.assign(booking, modifier));
        setSaveActivated(false);
        setTimeout(() => {
          setBookingToShiftModalIsOpen(false);
        }, 2000);
        return parallelPresence;
      }
    });
  }
  //Update Booking in DB
  async function updateBooking(updatedBooking) {
    if (updatedBooking !== '') {
      const bookingId = updatedBooking._id;
      await fetch(`api/shifts/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
    }
  }

  return (
    <>
      <Modal accepted={accepted}>
        <InputContainer>
          <CenteredButton onClick={() => setBookingToShiftModalIsOpen(false)}>Schließen</CenteredButton>{' '}
          <Title>Startzeit?</Title>
          <Confirm>{accepted ? <div>{checkParallel} Fahrzeuge. Gespeichert!</div> : null}</Confirm>
          <Error>{error ? <div>Kein Platz, bitte wähle eine andere Zeit.</div> : null}</Error>
          <div>Wähle bitte deine Startzeit im angezeigten Zeitraum.</div>
          <DatePicker
            dateFormat="dd/MM/yyyy HH:mm"
            filterTime={filterTimeWindow}
            maxDate={shiftEndTime}
            minDate={shiftBeginTime}
            onCalendarClose={() => setSaveActivated(true)}
            onChange={currentUserRole == 'UEK' ? (date) => setUEKTimestamp(date) : (date) => setRKTimestamp(date)}
            selected={currentUserRole == 'UEK' ? uekTimestamp : rkTimestamp}
            showTimeSelect
            timeCaption="Uhrzeit"
            timeIntervals={60}
            wrapperClassName="date_picker--adjustedwidthlarge"
          />
          <DatePickerWrapperStyles />
          <SaveButton
            saveActivated={saveActivated}
            onClick={() => {
              checkParallel(booking, currentUserRole, currentUserName);
            }}
          >
            Prüfen
          </SaveButton>{' '}
        </InputContainer>
      </Modal>
    </>
  );
}

const Title = styled.h1`
  color: rgba(42, 42, 42, 1);
`;
const Confirm = styled.h3`
  color: #206643;
`;
const Error = styled.h3`
  color: var(--primary-color);
`;
const Modal = styled.div`
  background-color: ${(props) => (props.accepted ? `rgba(208, 243, 225, 0.9)` : `rgba(255, 255, 255, 0.9)`)};
  height: 100vh;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  z-index: 49;
`;
const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: min(3vh, 1em);
  margin: 0 auto;
  padding: min(5vw, 2em);
  width: min(38vw, 600px);
`;

const SaveButton = styled(CenteredButton)`
  pointer-events: ${(props) => (props.saveActivated ? `auto` : `none`)};
`;
