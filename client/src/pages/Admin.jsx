import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import NewUserAdminForm from "../components/NewUserAdminForm";
import ParametersAdminForm from "../components/ParametersAdminForm";
import { CenteredButton, SingleRouteButton } from "../components/Buttons";

function Admin({ newParameters, setNewParameters }) {
  const [userError, setUserError] = useState("");
  const [parameterError, setParameterError] = useState("");
  const [parameterConf, setParameterConf] = useState("");
  const [newUser, setNewUser] = useState("");
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  //Admin: submit form data (no validation needed)
  const SubmitParameters = (parameterDetails) => {
    try {
      setNewParameters({
        presenceWindowMins: newParameters.presenceWindowMins,
        presenceParallel: parameterDetails.presenceParallel,
        shiftBufferHandoverMins: parameterDetails.shiftBufferHandoverMins,
        shiftBufferReturnMins: parameterDetails.shiftBufferReturnMins,
        shiftReminderHrs: parameterDetails.shiftReminderHrs,
        adminEmail: parameterDetails.adminEmail,
        durationAdventurerHrs: parameterDetails.durationAdventurerHrs,
        durationDreamerHrs: parameterDetails.durationDreamerHrs,
        durationTravelerHrs: parameterDetails.durationTravelerHrs,
      });
      updateParameters(newParameters);
      setParameterError("");
      setParameterConf("Parameter geändert.");
    } catch (error) {
      setParameterError("Eingabe ist ungültig." + { error });
      setParameterConf("");
    }
  };
  //Update Admin-Parameters in DB
  async function updateParameters(newParameters) {
    console.log(newParameters);
    const result = await fetch("api/admin/61e146a9fbc9e947b9f19496", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParameters),
    });
    return await result.json();
  }

  //User: check form data and submit
  const SubmitUser = (userDetails) => {
    try {
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
        setUserError("");
      } else {
        setUserError("Eingabe ist ungültig.");
      }
    } catch (error) {
      setParameterError("Eingabe ist ungültig." + { error });
    }
  };
  //Post new user to DB
  async function createUser(newUser) {
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
            SubmitUser={SubmitUser}
            newUser={newUser}
            error={userError}
          />
          <ParametersAdminForm
            visible={toggle}
            newParameters={newParameters}
            SubmitParameters={SubmitParameters}
            parameterError={parameterError}
            parameterConf={parameterConf}
          />
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
