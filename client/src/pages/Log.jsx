import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import shiftle_watermark from '../assets/shiftle_watermark.svg';
import shiftle_logo from '../assets/shiftle_logo.svg';
import { CenteredButton, SingleRouteButton } from '../components/Buttons';

export default function Log({
  allUsers,
  authenticated,
  currentUser,
  setAdmin,
  setAllUsers,
  setAuthenticated,
  setUser,
}) {
  const [error, setError] = useState('');

  const Login = (details) => {
    allUsers.forEach((user) => {
      try {
        if (
          details.email.split('@')[1].includes('.') &&
          details.password.length > 0 &&
          details.email == user.email &&
          details.password == user.password
        ) {
          setUser({
            name: user.name,
            email: user.email,
            role: user.role,
          });
          setAuthenticated(true);
          user.role == 'ADMIN' ? setAdmin(true) : setAdmin(false);
        } else {
          setError('Ungültig.');
        }
      } catch (error) {
        setError('Ungültig.');
      }
    });
  };

  const Logout = () => {
    setUser({
      name: '',
      email: '',
      role: '',
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
                <h1>Moin, {currentUser.name}.</h1>
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
      url('https://www.hamburg-startups.net/wp-content/uploads/2021/06/Produkt_Aussen_Dreamer_0035-1030x687.jpg');
  background-attachment: fixed;
  min-height: 100vh;
`;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: min(38vw, 600px);
`;

const Logo = styled.img`
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  margin: 3em auto 1em;
  width: min(64px, 10vw);
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: min(3vw, 0.4em);
  justify-content: center;
`;

const Welcome = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: min(3vh, 1em);
  justify-content: space-evenly;
  h3 {
    color: var(--headings-color);
  }
`;
