import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import shiftle_logo from "../assets/shiftle_logo.svg";
import greeting from "greeting";

export default function Log({
  currentUser,
  setUser,
  authenticated,
  setAuthenticated,
}) {
  const [error, setError] = useState("");

  //Get all users for comparison in Login function
  const [allUsers, setAllUsers] = useState([]);
  async function fetchUsers() {
    const res = await fetch("api/Users");
    const fetchedData = await res.json();
    setAllUsers(fetchedData);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const Login = (details) => {
    allUsers.forEach((user) => {
      if (
        details.email.split("@")[1].includes(".") &&
        details.password.length > 0 &&
        details.email == user.email &&
        details.password == user.password
      ) {
        setUser({ name: details.name, email: details.email });
        setAuthenticated(true);
      } else {
        setError("Details do not match. Email or password empty or invalid.");
      }
    });
  };

  const Logout = () => {
    setUser({
      name: "",
      email: "",
    });
    setAllUsers([]);
    setAuthenticated(false);
  };
  return (
    <View>
      <StartContainer>
        <Logo src={shiftle_logo} alt="shiftle_logo" />
        <LoginContainer>
          {authenticated ? (
            <Welcome>
              <div>
                <h1>{greeting.random()}</h1>
                <h3>Du bist eingeloggt als {currentUser.name}.</h3>
              </div>
              <ButtonSection>
                <button onClick={Logout}>Logout</button>
                <SingleRoute to="/buchungen">Buchungen</SingleRoute>
              </ButtonSection>
            </Welcome>
          ) : (
            <LoginForm Login={Login} error={error} />
          )}
        </LoginContainer>
      </StartContainer>
    </View>
  );
}

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}),
    top left / cover no-repeat
      url("https://www.hamburg-startups.net/wp-content/uploads/2021/06/Produkt_Aussen_Dreamer_0035-1030x687.jpg");
  background-attachment: fixed;
  min-height: 100vh;
  padding: 1rem 5vw 25vh;
`;

const StartContainer = styled.div`
  width: 70vw;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`;

const Logo = styled.img`
  width: min(256px, 10vw);
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
  margin: 3em auto;
`;

const LoginContainer = styled.div`
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;
  background: var(--tertiary-bg);
  margin: 0 auto;
  border-radius: 1em;
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: min(3vw, 0.4em);
`;

const Welcome = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: min(3vh, 1em);
  button {
    font-size: var(--basic-font-size);
    width: min(20vw, 100px);
    border: none;
    display: block;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    padding: 0.4em 1em;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--primary-color);
    opacity: 0.7;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
    }
    &.active {
      opacity: 1;
    }
  }
`;
const SingleRoute = styled(Link)`
  font-size: var(--basic-font-size);
  width: min(20vw, 100px);
  display: block;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 0.4em 1em;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--primary-color);
  opacity: 0.7;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
  }
`;
