import React, { useState } from 'react';
import styled from 'styled-components';
import { InputButton } from './Buttons';

export default function ParametersAdminForm({
  newParameters,
  parameterConf,
  parameterError,
  SubmitParameters,
  visible,
}) {
  const initState = {
    adminEmail: newParameters.adminEmail,
    durationAdventurerHrs: newParameters.durationAdventurerHrs,
    durationDreamerHrs: newParameters.durationDreamerHrs,
    durationTravelerHrs: newParameters.durationTravelerHrs,
    presenceParallel: newParameters.presenceParallel,
    presenceWindowMins: newParameters.presenceWindowMins,
    shiftBufferHandoverMins: newParameters.shiftBufferHandoverMins,
    shiftBufferReturnMins: newParameters.shiftBufferReturnMins,
    shiftReminderHrs: newParameters.shiftReminderHrs,
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

        <InputGroup>
          <label htmlFor="adminEmail">Admin-Email</label>
          <input
            id="adminEmail"
            name="adminEmail"
            type="email"
            value={parameterDetails.adminEmail}
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                adminEmail: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftReminderHrs">Erinnerungsvorlauf (Std)</label>
          <input
            id="shiftReminderHrs"
            name="shiftReminderHrs"
            type="number"
            value={parameterDetails.shiftReminderHrs}
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftReminderHrs: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="presenceWindowMins">Analysegranularität (min)</label>
          <input
            disabled //in MVP, only hour windows will be possible
            id="presenceWindowMins"
            name="presenceWindowMins"
            type="number"
            value={parameterDetails.presenceWindowMins}
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                presenceWindowMins: event.target.value,
              })
            }
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftBufferHandoverMins">Übergabepuffer (min)</label>
          <select
            id="shiftBufferHandoverMins"
            name="shiftBufferHandoverMins"
            value={parameterDetails.shiftBufferHandoverMins}
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftBufferHandoverMins: event.target.value,
              })
            }
          >
            <option value="60">60</option>
            <option value="45">45</option>
            <option value="90">90</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="shiftBufferReturnMins">Rückgabepuffer (min)</label>
          <select
            id="shiftBufferReturnMins"
            name="shiftBufferReturnMins"
            value={parameterDetails.shiftBufferReturnMins}
            onInput={(event) =>
              setParameterDetails({
                ...parameterDetails,
                shiftBufferReturnMins: event.target.value,
              })
            }
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
              id="presenceParallel"
              max="4"
              min="1"
              name="presenceParallel"
              step="1"
              type="range"
              value={parameterDetails.presenceParallel}
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  presenceParallel: event.target.value,
                })
              }
            />
            <output className="output">{parameterDetails.presenceParallel}</output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationAdventurerHrs">Dauer RK Adventurer (h)</label>
          <SliderGroup>
            <Slider
              id="durationAdventurerHrs"
              max="6"
              min="3"
              name="durationAdventurerHrs"
              step="1"
              type="range"
              value={parameterDetails.durationAdventurerHrs}
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationAdventurerHrs: event.target.value,
                })
              }
            />
            <output className="output">{parameterDetails.durationAdventurerHrs}</output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationDreamerHrs">Dauer RK Dreamer (h) </label>
          <SliderGroup>
            <Slider
              id="durationDreamerHrs"
              max="6"
              min="3"
              name="durationDreamerHrs"
              step="1"
              type="range"
              value={parameterDetails.durationDreamerHrs}
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationDreamerHrs: event.target.value,
                })
              }
            />
            <output className="output">{parameterDetails.durationDreamerHrs}</output>
          </SliderGroup>
        </InputGroup>
        <InputGroup>
          <label htmlFor="durationTravelerHrs">Dauer RK Traveler (h)</label>
          <SliderGroup>
            <Slider
              id="durationTravelerHrs"
              max="6"
              min="3"
              name="durationTravelerHrs"
              step="1"
              type="range"
              value={parameterDetails.durationTravelerHrs}
              onInput={(event) =>
                setParameterDetails({
                  ...parameterDetails,
                  durationTravelerHrs: event.target.value,
                })
              }
            />
            <output className="output">{parameterDetails.durationTravelerHrs}</output>
          </SliderGroup>
        </InputGroup>
        <Confirm>{parameterConf ? <div>{parameterConf}</div> : ''}</Confirm>
        <Error>{parameterError ? <div>{parameterError}</div> : ''}</Error>
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
  align-items: center;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: min(3vh, 1em);
`;
const Slider = styled.input`
  -webkit-appearance: none;
  background-color: var(--secondary-bg);
  color: var(--primary-color);
  overflow: hidden;
  ::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: var(--primary-color);
  }
`;

const SliderGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1em;
  width: 200px;
  .output {
    font-weight: 600;
    color: var(--primary-color);
  }
`;
const InputGroup = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  label {
    display: block;
    font-weight: 600;
    padding: 0.4em 1em;
    text-align: left;
    text-transform: uppercase;
  }
  input,
  select {
    border-radius: 2em;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    font-size: var(--basic-font-size);
    outline: none;
    padding: 0.4em 1em;
    width: 200px;
  }
`;
