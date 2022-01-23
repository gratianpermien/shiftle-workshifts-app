import React, { useState } from "react";
import styled from "styled-components";

export default function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  function submitHandler(event) {
    event.preventDefault();
    Login(details);
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <h1>Login</h1>
        <Error>{error != "" ? <div>{error}</div> : ""}</Error>
        <InputGroup>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(event) =>
              setDetails({ ...details, name: event.target.value })
            }
            value={details.name}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Passwort:</label>
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
        <InputButton type="submit" value="Login" />
      </Form>
    </>
  );
}

const Form = styled.form`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: min(3vh, 1em);
`;

const Error = styled.h2`
  color: var(--primary-color);
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    display: block;
    padding: 0.4em 1em;
    box-sizing: border-box;
    text-transform: uppercase;
    font-weight: 600;
    text-align: left;
  }
  input {
    font-size: var(--basic-font-size);
    padding: 0.4em 1em;
    width: min(60%, 200px);
    border-radius: 2em;
    box-sizing: border-box;
    outline: none;
    border: 2px solid var(--primary-color);
  }
`;

const InputButton = styled.input`
  font-size: var(--basic-font-size);
  width: min(33vw, 140px);
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 1em;
  border-radius: 2em;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary-color);
  opacity: 0.7;
  text-align: left;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
  }
`;
