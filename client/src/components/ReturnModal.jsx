import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CenteredButton } from './Buttons';

export default function ReturnModal({
  allUsers,
  booking,
  currentUserName,
  currentUserRole,
  newParameters,
  setReturnModalIsOpen,
}) {
  const [updatedBooking, setUpdatedBooking] = useState('');
  const [saveActivated, setSaveActivated] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [subst, setSubst] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    updateBooking(updatedBooking);
  }, [updatedBooking]);

  //Calculation for days to start
  const shiftBeginTime =
    currentUserRole == 'UEK'
      ? Date.parse(booking.kombidatum_start) - newParameters.shiftBufferHandoverMins * 1000 * 60
      : Date.parse(booking.kombidatum_ende) + newParameters.shiftBufferReturnMins * 1000 * 60;
  const daysToStart = (shiftBeginTime - Date.parse(new Date())) / 86400000;

  const usersList = [];
  allUsers.forEach((user) =>
    user.name !== currentUserName && user.role !== 'ADMIN' ? usersList.push(user.name) : null
  );

  const staffNameStampUEK = currentUserRole == 'UEK' ? subst : booking.uek;
  const staffNameStampRK = currentUserRole == 'RK' ? subst : booking.rk;
  const modifier = {
    uek: staffNameStampUEK,
    rk: staffNameStampRK,
  };
  function checkTimeLeft(modifier, booking, daysToStart) {
    if (daysToStart <= 7) {
      subst !== '' ? setAccepted(true) : setError(true);
    } else {
      setAccepted(true);
    }
    setUpdatedBooking(Object.assign(booking, modifier));
    setSaveActivated(false);
    setTimeout(() => {
      setReturnModalIsOpen(false);
    }, 2000);
  }
  //Update Admin-Parameters in DB
  async function updateBooking(updatedBooking) {
    if (updatedBooking !== '') {
      const bookingId = updatedBooking._id;
      const result = await fetch(`api/shifts/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
      return await result.json();
    }
  }

  return (
    <Modal accepted={accepted}>
      <InputContainer>
        <CenteredButton onClick={() => setReturnModalIsOpen(false)}>Schließen</CenteredButton>
        <Title>Stattdessen?</Title>
        <div>
          {daysToStart <= 7
            ? 'Du kannst die Schicht nicht zurückgeben, da der Start weniger als 7 Tage in der Zukunft liegt. Bitte wähle eine Vertretung.'
            : 'Du kannst die Schicht zurückgeben, da der Start mehr als 7 Tage in der Zukunft liegt. Besser ist es, wenn du dich direkt um eine Vertretung kümmerst.'}
        </div>
        <InputGroup>
          <label htmlFor="subst">Vertretung</label>
          <select
            name="subst"
            id="subst"
            onChange={(event) => {
              setSubst(event.target.value);
              setSaveActivated(true);
            }}
            value={subst}
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
        <Error>{error ? <div>Wähle eine Stellvertretung.</div> : null}</Error>
        <SaveButton
          saveActivated={saveActivated}
          onClick={() => {
            checkTimeLeft(modifier, booking, daysToStart);
          }}
        >
          Übergeben
        </SaveButton>
      </InputContainer>
    </Modal>
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
  select {
    border-radius: 2em;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    font-size: var(--basic-font-size);
    outline: none;
    padding: 0.4em 1em;
    width: 200px;
  }
`;
const SaveButton = styled(CenteredButton)`
  pointer-events: ${(props) => (props.saveActivated ? `auto` : `none`)};
`;
