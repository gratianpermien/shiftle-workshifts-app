import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import shiftle_logo from "../assets/shiftle_logo.svg";
import greeting from "greeting";
import { CenteredButton, SingleRouteButton } from "../components/Buttons";

export default function Log({
  currentUser,
  setUser,
  setAdmin,
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
        setUser({
          name: details.name,
          email: user.email,
          role: user.role,
        });
        setAuthenticated(true);
        user.role == "ADMIN" ? setAdmin(true) : setAdmin(false);
      } else {
        setError("Eingabe ungültig.");
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
    setAdmin(false);
    location.reload();
  };
  return (
    <View>
      <BaseContainer>
        <Logo src={shiftle_logo} alt="shiftle_logo" />
        <LoginContainer>
          {authenticated ? (
            <Welcome>
              <div>
                <h1>
                  {greeting.random()}, {currentUser.name}.
                </h1>
                <h3>Du bist mit der Rolle {currentUser.role} eingeloggt.</h3>
              </div>
              <ButtonSection>
                <CenteredButton onClick={Logout}>Logout</CenteredButton>
                <SingleRouteButton to="/buchungen">Buchungen</SingleRouteButton>
              </ButtonSection>
            </Welcome>
          ) : (
            <LoginForm Login={Login} loginError={error} />
          )}
        </LoginContainer>
      </BaseContainer>
    </View>
  );
}

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}),
    top left / cover no-repeat
      url("https://www.hamburg-startups.net/wp-content/uploads/2021/06/Produkt_Aussen_Dreamer_0035-1030x687.jpg");
  background-attachment: fixed;
  min-height: 100vh;
  /* padding: 1rem 5vw 25vh; */
`;

const BaseContainer = styled.div`
  width: min(38vw, 600px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.img`
  width: min(256px, 10vw);
  filter: drop-shadow(0px 1px 1px rgba(255, 255, 255, 0.2));
  margin: 3em auto;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: min(3vw, 1em);
  flex-direction: column;
  align-items: center;
`;

const Welcome = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
  h1 {
    color: var(--secondary-bg);
  }
  h3 {
    color: var(--secondary-bg);
  }
`;
