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
            type="email"
            name="email"
            id="email"
            onChange={(event) =>
              setDetails({ ...details, email: event.target.value })
            }
            value={details.email}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) =>
              setDetails({ ...details, password: event.target.value })
            }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    display: block;
    padding: 0.4em 1em;
    text-transform: uppercase;
    font-weight: 600;
    text-align: left;
  }
  input {
    font-size: var(--basic-font-size);
    padding: 0.4em 1em;
    width: min(100%, 200px);
    border-radius: 2em;
    box-sizing: border-box;
    outline: none;
    border: 2px solid var(--primary-color);
  }
`;
