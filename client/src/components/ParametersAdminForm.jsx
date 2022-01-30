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
      <ParameterForm onSubmit={submitHandler} visible={visible}>
        <Title>Parameter.</Title>
        <Confirm>{parameterConf ? <div>{parameterConf}</div> : ""}</Confirm>
        <Error>{parameterError ? <div>{parameterError}</div> : ""}</Error>
        <InputGroup>
          <label htmlFor="adminEmail">Admin-Email</label>
          <input
            type="email"
            name="adminEmail"
            id="adminEmail"
            onInput={(event) =>
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
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftReminderHrs: event.target.value,
              })
            }
            value={parameterDetails.shiftReminderHrs}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="presenceWindowMins">Analysegranularität (min)</label>
          <input
            disabled //First off, only hour windows will be possible
            type="number"
            name="presenceWindowMins"
            id="presenceWindowMins"
            onInput={(event) =>
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
            onInput={(event) =>
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
            onInput={(event) =>
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
          <label htmlFor="presenceParallel">Parallele Fahrzeuge</label>
          <SliderGroup>
            <Slider
              type="range"
              id="presenceParallel"
              name="presenceParallel"
              min="1"
              max="4"
              step="1"
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  presenceParallel: event.target.value,
                })
              }
              value={parameterDetails.presenceParallel}
            />
            <output className="output">
              {parameterDetails.presenceParallel}
            </output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationAdventurerHrs">Dauer RK Adventurer (h)</label>
          <SliderGroup>
            <Slider
              type="range"
              id="durationAdventurerHrs"
              name="durationAdventurerHrs"
              min="3"
              max="6"
              step="1"
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationAdventurerHrs: event.target.value,
                })
              }
              value={parameterDetails.durationAdventurerHrs}
            />
            <output className="output">
              {parameterDetails.durationAdventurerHrs}
            </output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationDreamerHrs">Dauer RK Dreamer (h) </label>
          <SliderGroup>
            <Slider
              type="range"
              id="durationDreamerHrs"
              name="durationDreamerHrs"
              min="3"
              max="6"
              step="1"
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationDreamerHrs: event.target.value,
                })
              }
              value={parameterDetails.durationDreamerHrs}
            />
            <output className="output">
              {parameterDetails.durationDreamerHrs}
            </output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationTravelerHrs">Dauer RK Traveler (h)</label>
          <SliderGroup>
            <Slider
              type="range"
              id="durationTravelerHrs"
              name="durationTravelerHrs"
              min="3"
              max="6"
              step="1"
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationTravelerHrs: event.target.value,
                })
              }
              value={parameterDetails.durationTravelerHrs}
            />
            <output className="output">
              {parameterDetails.durationTravelerHrs}
            </output>
          </SliderGroup>
        </InputGroup>
        <InputButton type="submit" value="Anpassen" />
      </ParameterForm>
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
const ParameterForm = styled.form`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: min(3vh, 1em);
`;
const Slider = styled.input`
  color: var(--primary-color);
  overflow: hidden;
  -webkit-appearance: none;
  background-color: var(--secondary-bg);
  ::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: var(--primary-color);
  }
`;

const SliderGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  width: 200px;
  align-items: center;
  .output {
    font-weight: 600;
    color: var(--primary-color);
  }
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
