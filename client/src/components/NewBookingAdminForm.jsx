import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButton } from './Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';

export default function NewBookingAdminForm({ newBooking, bookingError, SubmitBooking, visible }) {
  const [bookingDetails, setBookingDetails] = useState({
    bemerkung: '',
    client: '',
    fahrzeug: '',
    kennzeichen: '',
    kombidatum_ende: '',
    kombidatum_start: '',
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 14));

  function submitHandler(event) {
    event.preventDefault();
    SubmitBooking(bookingDetails);
  }

  return (
    <>
      <BookingForm onSubmit={submitHandler} visible={visible}>
        <Title>Buchung.</Title>

        <InputGroup>
          <label htmlFor="client">Kunde*</label>
          <input
            id="client"
            name="client"
            required
            type="text"
            value={bookingDetails.client}
            onChange={(event) =>
              setBookingDetails({
                ...bookingDetails,
                client: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="fahrzeug">Fahrzeug*</label>
          <select
            id="fahrzeug"
            name="fahrzeug"
            required
            value={bookingDetails.fahrzeug}
            onChange={(event) =>
              setBookingDetails({
                ...bookingDetails,
                fahrzeug: event.target.value,
              })
            }
          >
            <option>Auswählen</option>
            <option value="ADVENTURER">Adventurer</option>
            <option value="TRAVELER">Traveler</option>
            <option value="DREAMER">Dreamer</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="kennzeichen">Kennzeichen*</label>
          <input
            id="kennzeichen"
            name="kennzeichen"
            placeholder="VT1234"
            required
            type="text"
            value={bookingDetails.kennzeichen}
            onChange={(event) =>
              setBookingDetails({
                ...bookingDetails,
                kennzeichen: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="bemerkung">Bemerkung</label>
          <textarea
            id="bemerkung"
            name="bemerkung"
            rows="3"
            value={bookingDetails.bemerkung}
            onChange={(event) =>
              setBookingDetails({
                ...bookingDetails,
                bemerkung: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label>Abfahrt*</label>
          <DatePicker
            dateFormat="dd/MM/yyyy HH:mm"
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            showTimeSelect
            timeCaption="Uhrzeit"
            timeIntervals={60}
            wrapperClassName="date_picker--adjustedwidthlarge"
            onCalendarClose={() =>
              setBookingDetails({
                ...bookingDetails,
                kombidatum_start: startDate,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label>Ankunft*</label>
          <DatePicker
            dateFormat="dd/MM/yyyy HH:mm"
            onChange={(date) => setEndDate(date)}
            selected={endDate}
            showTimeSelect
            timeCaption="Uhrzeit"
            timeIntervals={60}
            wrapperClassName="date_picker--adjustedwidthlarge"
            onCalendarClose={() => setBookingDetails({ ...bookingDetails, kombidatum_ende: endDate })}
          />
        </InputGroup>
        <DatePickerWrapperStyles />
        <Confirm>{newBooking ? <div>Angelegt.</div> : ''}</Confirm>
        <Error>{bookingError ? <div>{bookingError}</div> : ''}</Error>
        <InputButton type="submit" value="Anlegen" />
      </BookingForm>
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
const BookingForm = styled.form`
  align-items: center;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: min(3vh, 1em);
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
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
    border-radius: 2em;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.4em 1em;
    width: 200px;
  }
  textarea {
    border-radius: 1em;
  }
`;
