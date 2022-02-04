import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButton } from './Buttons';

export default function NewUserAdminForm({ error, newUser, SubmitUser, visible }) {
  const [userDetails, setUserDetails] = useState({
    role: '',
    email: '',
    password: '',
  });

  function submitHandler(event) {
    event.preventDefault();
    SubmitUser(userDetails);
  }
  return (
    <>
      <UserForm onSubmit={submitHandler} visible={visible}>
        <Title>User.</Title>
        <InputGroup>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            maxLength="10"
            name="name"
            type="text"
            value={userDetails.name}
            onChange={(event) => setUserDetails({ ...userDetails, name: event.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userDetails.email}
            onChange={(event) => setUserDetails({ ...userDetails, email: event.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="role">Rolle*</label>
          <select
            id="role"
            name="role"
            value={userDetails.role}
            onChange={(event) => setUserDetails({ ...userDetails, role: event.target.value })}
          >
            <option>Auswählen</option>
            <option value="ADMIN">Admin</option>
            <option value="RK">RK</option>
            <option value="UEK">ÜK</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Passwort*</label>
          <input
            id="password"
            name="password"
            type="password"
            value={userDetails.password}
            onChange={(event) => setUserDetails({ ...userDetails, password: event.target.value })}
          />
        </InputGroup>
        <Confirm>{newUser ? <div>Angelegt.</div> : ''}</Confirm>
        <Error>{error ? <div>{error}</div> : ''}</Error>
        <InputButton type="submit" value="Anlegen" />
      </UserForm>
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
const UserForm = styled.form`
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
