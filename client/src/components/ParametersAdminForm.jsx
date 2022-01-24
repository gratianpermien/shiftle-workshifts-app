import React, { useState } from "react";
import styled from "styled-components";
import { InputButton } from "./Buttons";

export default function ParametersAdminForm({
  visible,
  newParameters,
  SubmitParameters,
  parameterError,
  parameterConf,
}) {
  const initState = {
    presenceWindowMins: newParameters.presenceWindowMins,
    presenceParallel: newParameters.presenceParallel,
    shiftBufferHandoverMins: newParameters.shiftBufferHandoverMins,
    shiftBufferReturnMins: newParameters.shiftBufferReturnMins,
    shiftReminderHrs: newParameters.shiftReminderHrs,
    adminEmail: newParameters.adminEmail,
    durationAdventurerHrs: newParameters.durationAdventurerHrs,
    durationDreamerHrs: newParameters.durationDreamerHrs,
    durationTravelerHrs: newParameters.durationTravelerHrs,
  };
  const [parameterDetails, setParameterDetails] = useState(initState);

  function submitHandler(event) {
    event.preventDefault();
    SubmitParameters(parameterDetails);
  }

  return (
    <>
      <UserForm onSubmit={submitHandler} visible={visible}>
        <h1>Parameter.</h1>
        <Confirm>{parameterConf ? <div>{parameterConf}</div> : ""}</Confirm>
        <Error>{parameterError ? <div>{parameterError}</div> : ""}</Error>
        <InputGroup>
          <label htmlFor="adminEmail">Admin-Email</label>
          <input
            type="email"
            name="adminEmail"
            id="adminEmail"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                adminEmail: event.target.value,
              })
            }
            value={parameterDetails.adminEmail}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftReminderHrs">Erinnerungsvorlauf (Std)</label>
          <input
            type="number"
            name="shiftReminderHrs"
            id="shiftReminderHrs"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftReminderHrs: event.target.value,
              })
            }
            value={parameterDetails.shiftReminderHrs}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="presenceWindowMins">
            Granularität Aufbereitung (min)
          </label>
          <input
            disabled //First off, only hour windows will be possible
            type="number"
            name="presenceWindowMins"
            id="presenceWindowMins"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                presenceWindowMins: event.target.value,
              })
            }
            value={parameterDetails.presenceWindowMins}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftBufferHandoverMins">Übergabepuffer (min)</label>
          <select
            name="shiftBufferHandoverMins"
            id="shiftBufferHandoverMins"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftBufferHandoverMins: event.target.value,
              })
            }
            value={parameterDetails.shiftBufferHandoverMins}
          >
            <option value="60">60</option>
            <option value="45">45</option>
            <option value="90">90</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftBufferReturnMins">Rückgabepuffer (min)</label>
          <select
            name="shiftBufferReturnMins"
            id="shiftBufferReturnMins"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftBufferReturnMins: event.target.value,
              })
            }
            value={parameterDetails.shiftBufferReturnMins}
          >
            <option value="120">120</option>
            <option value="60">60</option>
            <option value="180">180</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="presenceParallel">
            Parallele Fahrzeuge Aufbereitung (1-4)
          </label>
          <Slider
            type="range"
            id="presenceParallel"
            name="presenceParallel"
            min="1"
            max="4"
            step="1"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                presenceParallel: event.target.value,
              })
            }
            value={parameterDetails.presenceParallel}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationAdventurerHrs">
            Aufbereitung Adventurer (3-6Std)
          </label>
          <Slider
            type="range"
            id="durationAdventurerHrs"
            name="durationAdventurerHrs"
            min="3"
            max="6"
            step="1"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                durationAdventurerHrs: event.target.value,
              })
            }
            value={parameterDetails.durationAdventurerHrs}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationDreamerHrs">
            Aufbereitung Dreamer (3-6Std)
          </label>
          <Slider
            type="range"
            id="durationDreamerHrs"
            name="durationDreamerHrs"
            min="3"
            max="6"
            step="1"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                durationDreamerHrs: event.target.value,
              })
            }
            value={parameterDetails.durationDreamerHrs}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationTravelerHrs">
            Aufbereitung Traveler (3-6Std)
          </label>
          <Slider
            type="range"
            id="durationTravelerHrs"
            name="durationTravelerHrs"
            min="3"
            max="6"
            step="1"
            onChange={(event) =>
              setParameterDetails({
                ...parameterDetails,
                durationTravelerHrs: event.target.value,
              })
            }
            value={parameterDetails.durationTravelerHrs}
          />
        </InputGroup>
        <InputButton type="submit" value="Anpassen" />
      </UserForm>
    </>
  );
}

const Confirm = styled.h3`
  color: var(--secondary-bg);
`;
const Error = styled.h3`
  color: var(--primary-color);
`;
const UserForm = styled.form`
  display: ${(props) => (props.visible ? "none" : "flex")};
  padding: 1em;
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
`;
const Slider = styled.input`
  background: var(--primary-color);
  width: 200px;
  outline: none;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
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
