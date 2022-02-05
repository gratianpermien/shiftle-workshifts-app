import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import NewUserAdminForm from "../components/NewUserAdminForm";
import ParametersAdminForm from "../components/ParametersAdminForm";
import NewBookingAdminForm from "../components/NewBookingAdminForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import { SingleRouteButton } from "../components/Buttons";

function Admin({
  newParameters,
  setNewParameters,
  newUser,
  setNewUser,
  newBooking,
  setNewBooking,
}) {
  const [userError, setUserError] = useState("");
  const [parameterError, setParameterError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [parameterConf, setParameterConf] = useState("");
  const [slideA, setSlideA] = useState(true);
  const [slideB, setSlideB] = useState(false);
  const [slideC, setSlideC] = useState(false);

  useEffect(() => {
    createUser(newUser);
  }, [newUser]);

  useEffect(() => {
    updateParameters(newParameters);
  }, [newParameters]);

  useEffect(() => {
    createBooking(newBooking);
  }, [newBooking]);

  function handleSlide() {
    if (slideA) {
      setSlideA(false);
      setSlideB(true);
    } else if (slideB) {
      setSlideB(false);
      setSlideC(true);
    } else {
      setSlideC(false);
      setSlideA(true);
    }
  }

  //Parameters: get and submit form data (no validation needed)
  const SubmitParameters = async (parameterDetails) => {
    //async State Update? 2x Event handling required, why?
    try {
      await setNewParameters({
        presenceWindowMins: parameterDetails.presenceWindowMins,
        presenceParallel: parameterDetails.presenceParallel,
        shiftBufferHandoverMins: parameterDetails.shiftBufferHandoverMins,
        shiftBufferReturnMins: parameterDetails.shiftBufferReturnMins,
        shiftReminderHrs: parameterDetails.shiftReminderHrs,
        adminEmail: parameterDetails.adminEmail,
        durationAdventurerHrs: parameterDetails.durationAdventurerHrs,
        durationDreamerHrs: parameterDetails.durationDreamerHrs,
        durationTravelerHrs: parameterDetails.durationTravelerHrs,
      });
      // updateParameters(newParameters);
      setParameterError("");
      setParameterConf("Geändert.");
    } catch (error) {
      setParameterError("Eingabe ist ungültig." + { error });
      setParameterConf("");
    }
  };
  //Update Admin-Parameters in DB
  async function updateParameters(newParameters) {
    const result = await fetch("api/admin/61e146a9fbc9e947b9f19496", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParameters),
    });
  }
  //User: check form data and submit
  const SubmitUser = (userDetails) => {
    try {
      if (
        userDetails.name.length > 0 &&
        userDetails.email.length > 0 &&
        userDetails.email.split("@")[1].includes(".") &&
        userDetails.password.length > 0
      ) {
        setNewUser({
          name: userDetails.name,
          role: userDetails.role,
          email: userDetails.email,
          password: userDetails.password,
        });
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
    if (newUser != "") {
      const result = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setTimeout(() => {
        setNewUser("");
      }, 2000);
    }
  }
  //Manual booking: check form data and submit
  const SubmitBooking = (bookingDetails) => {
    try {
      if (
        bookingDetails.client.length > 0 &&
        bookingDetails.kennzeichen.length > 0
      ) {
        setNewBooking({
          client: bookingDetails.client,
          fahrzeug: bookingDetails.fahrzeug,
          kennzeichen: bookingDetails.kennzeichen,
          bemerkung: bookingDetails.bemerkung,
          kombidatum_start: bookingDetails.kombidatum_start,
          kombidatum_ende: bookingDetails.kombidatum_ende,
        });
        setBookingError("");
      } else {
        setBookingError("Eingabe ungültig.");
      }
    } catch (error) {
      setBookingError("Eingabe ungültig." + { error });
    }
  };

  //Post new booking to DB
  async function createBooking(newBooking) {
    if (newBooking != "") {
      const result = await fetch("api/shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });
      setTimeout(() => {
        setNewBooking("");
      }, 2000);
    }
  }

  return (
    <View>
      <SlideButton onClick={handleSlide}>
        <FontAwesomeIcon icon={faChevronCircleRight} />
      </SlideButton>
      <BaseContainer>
        <ButtonSection>
          <SingleRouteButton to="/buchungen">Buchungen</SingleRouteButton>
          <SingleRouteButton to="/api/export" target="_blank">
            CSV
          </SingleRouteButton>
        </ButtonSection>
        <FormContainer>
          <NewUserAdminForm
            visible={slideA}
            SubmitUser={SubmitUser}
            newUser={newUser}
            error={userError}
          />
          <ParametersAdminForm
            visible={slideC}
            newParameters={newParameters}
            SubmitParameters={SubmitParameters}
            parameterError={parameterError}
            parameterConf={parameterConf}
          />
          <NewBookingAdminForm
            visible={slideB}
            newBooking={newBooking}
            bookingError={bookingError}
            SubmitBooking={SubmitBooking}
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
  padding: min(5vw, 2em) 0 25vh;
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
  width: 100%;
`;
const ButtonSection = styled.div`
  display: flex;
  gap: min(3vw, 1em);
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const SlideButton = styled.a`
  position: fixed;
  display: block;
  z-index: 200;
  font-size: var(--icon-size);
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
  display: block;
  right: 1em;
  top: 50vh;
  color: #8f8f8f;
  cursor: pointer;
  transition: all 0.2s;
  &:hover,
  &:active {
    color: #444444;
  }
`;
