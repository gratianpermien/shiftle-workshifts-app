import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import { NavItem } from "../components/Buttons";
import NewUserAdminForm from "../components/NewUserAdminForm";
import { CenteredButton, SingleRouteButton } from "../components/Buttons";

function Admin() {
  const [parameters, setParameters] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState("");
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }
  //Get Admin-Parameters from DB
  async function fetchAdminParameters() {
    const res = await fetch("api/admin");
    const fetchedData = await res.json();
    setParameters(fetchedData);
  }
  useEffect(() => {
    fetchAdminParameters();
  }, []);

  //Update Admin-Parameters in DB
  async function updateParameters(parameters) {
    const result = await fetch("api/admin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    });
    return await result.json();
  }

  //User: check form data and submit
  const SubmitUser = (userDetails) => {
    if (
      userDetails.email.length > 0 &&
      userDetails.email.split("@")[1].includes(".") &&
      userDetails.password.length > 0
    ) {
      setNewUser({
        role: userDetails.role,
        email: userDetails.email,
        password: userDetails.password,
      });
      createUser(newUser);
    } else {
      setError("Eingabe ist ungültig.");
    }
  };
  //Post new user to DB
  async function createUser(newUser) {
    console.log(newUser);
    const result = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return await result.json();
  }
  return (
    <View>
      <BaseContainer>
        <ButtonSection>
          <CenteredButton onClick={handleToggle}>Switch</CenteredButton>
          <SingleRouteButton to="/buchungen">Zurück</SingleRouteButton>
        </ButtonSection>
        <FormContainer>
          <NewUserAdminForm
            visible={toggle}
            parameters={parameters}
            SubmitUser={SubmitUser}
            newUser={newUser}
            error={error}
          />
          //HIER KOMMT MORGEN DAS NÄCHSTE FORM
        </FormContainer>
      </BaseContainer>
    </View>
  );
}
export default Admin;

const View = styled.div`
  background: 50% 95% no-repeat url(${shiftle_watermark}), var(--primary-bg);
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

const FormContainer = styled.div`
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
  margin: 3em auto;
`;
