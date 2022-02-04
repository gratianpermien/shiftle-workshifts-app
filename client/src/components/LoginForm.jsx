import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButton } from './Buttons';

export default function LoginForm({ Login, loginError }) {
  const [details, setDetails] = useState({ email: '', password: '' });

  function submitHandler(event) {
    event.preventDefault();
    Login(details);
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={(event) => setDetails({ ...details, email: event.target.value })}
            type="email"
            value={details.email}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Passwort</label>
          <input
            id="password"
            name="password"
            onChange={(event) => setDetails({ ...details, password: event.target.value })}
            type="password"
            value={details.password}
          />
        </InputGroup>
        <Error>{loginError != '' ? <div>{loginError}</div> : ''}</Error>
        <InputButton type="submit" value="Login" />
      </Form>
    </>
  );
}

const Error = styled.h3`
  color: var(--primary-color);
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: min(3vh, 1em);
`;

const InputGroup = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  label {
    display: block;
    font-weight: 600;
    padding: 0.4em 1em;
    text-align: left;
    text-transform: uppercase;
  }
  input {
    border-radius: 2em;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    font-size: var(--basic-font-size);
    outline: none;
    padding: 0.4em 1em;
    width: min(100%, 200px);
  }
`;
