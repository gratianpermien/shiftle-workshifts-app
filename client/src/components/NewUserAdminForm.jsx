import React, { useState } from "react";
import styled from "styled-components";
import { InputButton } from "./Buttons";

export default function NewUserAdminForm({
  SubmitUser,
  newUser,
  error,
  visible,
}) {
  const [userDetails, setUserDetails] = useState({
    role: "",
    email: "",
    password: "",
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
            type="text"
            name="name"
            id="name"
            maxlength="10"
            onChange={(event) =>
              setUserDetails({ ...userDetails, name: event.target.value })
            }
            value={userDetails.name}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) =>
              setUserDetails({ ...userDetails, email: event.target.value })
            }
            value={userDetails.email}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="role">Rolle*</label>
          <select
            name="role"
            id="role"
            onChange={(event) =>
              setUserDetails({ ...userDetails, role: event.target.value })
            }
            value={userDetails.role}
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
            type="password"
            name="password"
            id="password"
            onChange={(event) =>
              setUserDetails({ ...userDetails, password: event.target.value })
            }
            value={userDetails.password}
          />
        </InputGroup>
        <Confirm>{newUser ? <div>Angelegt.</div> : ""}</Confirm>
        <Error>{error ? <div>{error}</div> : ""}</Error>
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
  display: ${(props) => (props.visible ? "flex" : "none")};
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
  select {
    font-size: var(--basic-font-size);
    padding: 0.4em 1em;
    width: 200px;
    border-radius: 2em;
    box-sizing: border-box;
    outline: none;
    border: 2px solid var(--primary-color);
  }
`;
