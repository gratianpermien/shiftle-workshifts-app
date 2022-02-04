import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenteredButton } from './Buttons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';

export default function ModBookingModal({
  allUsers,
  booking,
  currentUserName,
  setAllBookings,
  setModBookingModalIsOpen,
}) {
  const [bookingDetails, setBookingDetails] = useState({
    _id: booking._id,
    bemerkung: booking.bemerkung,
    client: booking.client,
    fahrzeug: booking.fahrzeug,
    kennzeichen: booking.kennzeichen,
    kombidatum_ende: booking.kombidatum_ende,
    kombidatum_start: booking.kombidatum_start,
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

  function modifyBooking(bookingDetails) {
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
              id="fahrzeug"
              name="fahrzeug"
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
              id="kennzeichen"
              name="kennzeichen"
              required
              type="text"
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
              id="bemerkung"
              name="bemerkung"
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
              dateFormat="dd/MM/yyyy HH:mm"
              selected={Date.parse(bookingDetails.kombidatum_start)}
              showTimeSelect
              timeCaption="Uhrzeit"
              timeIntervals={60}
              wrapperClassName="date_picker--adjustedwidthlarge"
              onChange={(date) =>
                setBookingDetails({
                  ...bookingDetails,
                  kombidatum_start: date,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <label>Ankunft</label>
            <DatePicker
              dateFormat="dd/MM/yyyy HH:mm"
              selected={Date.parse(bookingDetails.kombidatum_ende)}
              showTimeSelect
              timeCaption="Uhrzeit"
              timeIntervals={60}
              wrapperClassName="date_picker--adjustedwidthlarge"
              onChange={(date) =>
                setBookingDetails({
                  ...bookingDetails,
                  kombidatum_ende: date,
                })
              }
            />
          </InputGroup>
          <DatePickerWrapperStyles />
          <InputGroup>
            <label htmlFor="rk">Name RK</label>
            <select
              id="rk"
              name="rk"
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
              id="uek"
              name="uek"
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
              modifyBooking(bookingDetails);
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
  height: 100vh;
  left: 50%;
  overflow-y: auto;
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
const InputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  label {
    display: block;
    font-weight: 600;
    padding: 0.4em 1em;
    text-align: left;
    text-transform: uppercase;
  }
  input,
  select,
  textarea {
    border-radius: 2em;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    font-size: var(--basic-font-size);
    outline: none;
    padding: 0.4em 1em;
    width: 200px;
  }
  textarea {
    border-radius: 1em;
    font-family: inherit;
  }
`;
const SaveButton = styled(CenteredButton)`
  pointer-events: auto;
`;
