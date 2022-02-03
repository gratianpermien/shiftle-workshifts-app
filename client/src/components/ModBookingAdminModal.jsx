import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenteredButton } from './Buttons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';

export default function ModBookingModal({
  booking,
  allUsers,
  currentUserName,
  setModBookingModalIsOpen,
  setAllBookings,
}) {
  const [bookingDetails, setBookingDetails] = useState({
    _id: booking._id,
    client: booking.client,
    fahrzeug: booking.fahrzeug,
    kennzeichen: booking.kennzeichen,
    bemerkung: booking.bemerkung,
    kombidatum_start: booking.kombidatum_start,
    kombidatum_ende: booking.kombidatum_ende,
    rk: booking.rk,
    uek: booking.uek,
  });
  const [updatedBooking, setUpdatedBooking] = useState('');
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    updateBooking(updatedBooking);
  }, [updatedBooking]);

  //Prepare user list for select
  const usersList = [];
  allUsers.forEach((user) =>
    user.name !== currentUserName && user.role !== 'ADMIN' ? usersList.push(user.name) : null
  );

  // const staffNameStampUEK = currentUserRole == "UEK" ? subst : booking.uek;
  // const staffNameStampRK = currentUserRole == "RK" ? subst : booking.rk;
  // const modifier = {
  //   uek: staffNameStampUEK,
  //   rk: staffNameStampRK,
  // };
  function checkModifiedBooking(bookingDetails) {
    setAccepted(true);
    setUpdatedBooking(bookingDetails);
    setTimeout(() => {
      setModBookingModalIsOpen(false);
    }, 3000);
  }
  //Update Admin-Parameters in DB
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
      const res = await fetch('api/shifts');
      const fetchedData = await res.json();
      setTimeout(() => {
        setAllBookings(fetchedData);
      }, 2000);
    }
  }

  return (
    <>
      <Modal accepted={accepted}>
        <InputContainer>
          <CenteredButton onClick={() => setModBookingModalIsOpen(false)}>Schließen</CenteredButton>{' '}
          <Title>Ändern.</Title>
          <div>Änderungen einer Buchung sind hier möglich.</div>
          <InputGroup>
            <label htmlFor="client">Kunde*</label>
            <input
              type="text"
              name="client"
              id="client"
              required
              onChange={(event) => {
                setBookingDetails({
                  ...bookingDetails,
                  client: event.target.value,
                });
              }}
              value={bookingDetails.client}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="fahrzeug">Fahrzeug*</label>
            <select
              name="fahrzeug"
              id="fahrzeug"
              required
              onChange={(event) =>
                setBookingDetails({
                  ...bookingDetails,
                  fahrzeug: event.target.value,
                })
              }
              value={bookingDetails.fahrzeug}
            >
              <option>Auswählen</option>
              <option value="ADVENTURER">Adventurer</option>
              <option value="TRAVELER">Traveler</option>
              <option value="DREAMER">Dreamer</option>
            </select>
          </InputGroup>
          <InputGroup>
            <label htmlFor="kennzeichen">Kennzeichen</label>
            <input
              type="text"
              name="kennzeichen"
              id="kennzeichen"
              required
              onChange={(event) =>
                setBookingDetails({
                  ...bookingDetails,
                  kennzeichen: event.target.value,
                })
              }
              value={bookingDetails.kennzeichen}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="bemerkung">Bemerkung</label>
            <textarea
              name="bemerkung"
              id="bemerkung"
              rows="3"
              onChange={(event) =>
                setBookingDetails({
                  ...bookingDetails,
                  bemerkung: event.target.value,
                })
              }
              value={bookingDetails.bemerkung}
            />
          </InputGroup>
          <InputGroup>
            <label>Abfahrt</label>
            <DatePicker
              wrapperClassName="date_picker--adjustedwidthlarge"
              selected={Date.parse(bookingDetails.kombidatum_start)}
              onChange={(date) =>
                setBookingDetails({
                  ...bookingDetails,
                  kombidatum_start: date,
                })
              }
              showTimeSelect
              timeIntervals={60}
              timeCaption="Uhrzeit"
              dateFormat="dd/MM/yyyy HH:mm"
            />
          </InputGroup>
          <InputGroup>
            <label>Ankunft</label>
            <DatePicker
              wrapperClassName="date_picker--adjustedwidthlarge"
              selected={Date.parse(bookingDetails.kombidatum_ende)}
              onChange={(date) =>
                setBookingDetails({
                  ...bookingDetails,
                  kombidatum_ende: date,
                })
              }
              showTimeSelect
              timeIntervals={60}
              timeCaption="Uhrzeit"
              dateFormat="dd/MM/yyyy HH:mm"
            />
          </InputGroup>
          <DatePickerWrapperStyles />
          <InputGroup>
            <label htmlFor="rk">Name RK</label>
            <select
              name="rk"
              id="rk"
              onChange={(event) => {
                setBookingDetails({
                  ...bookingDetails,
                  rk: event.target.value,
                });
              }}
            >
              <option value="">Auswählen</option>
              {usersList.map((user, index) => (
                <option value={user} key={index}>
                  {user}
                </option>
              ))}
            </select>
          </InputGroup>
          <InputGroup>
            <label htmlFor="uek">Name UEK</label>
            <select
              name="uek"
              id="uek"
              onChange={(event) => {
                setBookingDetails({
                  ...bookingDetails,
                  uek: event.target.value,
                });
              }}
            >
              <option value="">Auswählen</option>
              {usersList.map((user, index) => (
                <option value={user} key={index}>
                  {user}
                </option>
              ))}
            </select>
          </InputGroup>
          <Confirm>{accepted ? <div>Gespeichert.</div> : null}</Confirm>
          <SaveButton
            onClick={() => {
              checkModifiedBooking(bookingDetails);
            }}
          >
            Ändern
          </SaveButton>
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
const Modal = styled.div`
  background-color: ${(props) => (props.accepted ? `rgba(208, 243, 225, 0.9)` : `rgba(255, 255, 255, 0.9)`)};
  width: 100vw;
  height: 100vh;
  z-index: 499;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  overflow-y: auto;
`;
const InputContainer = styled.div`
  width: min(38vw, 600px);
  margin: 0 auto;
  padding: min(5vw, 2em);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    display: block;
    padding: 0.4em 1em;
    text-transform: uppercase;
    font-weight: 600;
    text-align: left;
  }
  input,
  select,
  textarea {
    font-size: var(--basic-font-size);
    padding: 0.4em 1em;
    width: 200px;
    border-radius: 2em;
    box-sizing: border-box;
    outline: none;
    border: 2px solid var(--primary-color);
  }
  textarea {
    border-radius: 1em;
  }
`;
const SaveButton = styled(CenteredButton)`
  pointer-events: auto;
`;
