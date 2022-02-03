import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButton } from './Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerWrapperStyles } from '../shared/GlobalStyle';

export default function NewBookingAdminForm({ newBooking, bookingError, SubmitBooking, visible }) {
  const [bookingDetails, setBookingDetails] = useState({
    client: '',
    fahrzeug: '',
    kennzeichen: '',
    bemerkung: '',
    kombidatum_start: '',
    kombidatum_ende: '',
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
            type="text"
            name="client"
            id="client"
            required
            onChange={(event) =>
              setBookingDetails({
                ...bookingDetails,
                client: event.target.value,
              })
            }
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
          <label htmlFor="kennzeichen">Kennzeichen*</label>
          <input
            type="text"
            name="kennzeichen"
            id="kennzeichen"
            placeholder="VT1234"
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
          <label>Abfahrt*</label>
          <DatePicker
            wrapperClassName="date_picker--adjustedwidthlarge"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            onCalendarClose={() =>
              setBookingDetails({
                ...bookingDetails,
                kombidatum_start: startDate,
              })
            }
            showTimeSelect
            timeIntervals={60}
            timeCaption="Uhrzeit"
            dateFormat="dd/MM/yyyy HH:mm"
          />
        </InputGroup>
        <InputGroup>
          <label>Ankunft*</label>
          <DatePicker
            wrapperClassName="date_picker--adjustedwidthlarge"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            onCalendarClose={() => setBookingDetails({ ...bookingDetails, kombidatum_ende: endDate })}
            showTimeSelect
            timeIntervals={60}
            timeCaption="Uhrzeit"
            dateFormat="dd/MM/yyyy HH:mm"
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
  display: ${(props) => (props.visible ? 'flex' : 'none')};
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
    font-family: inherit;
    font-size: inherit;
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
