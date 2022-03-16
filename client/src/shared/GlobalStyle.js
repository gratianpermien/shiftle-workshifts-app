import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
:root {
--primary-bg: linear-gradient(245deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%); //light gradient
--secondary-bg: #FFfdfd; //light
--tertiary-bg: #565a5e; //gray
--headings-color: #eeeeee; //off-white
--primary-color: #F56FA8; //pink
--icon-size: clamp(1.5rem, -0.875rem + 8.333vw, 2.3rem);
--basic-font-size: clamp(0.7rem, 0.4137rem + 1.2214vw, 1rem);
}
body {
  font-size: var(--basic-font-size);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p {
  margin: 0;
}
h1 {
  color: var(--headings-color);
  font-size: clamp(1.7rem,-0.875rem + 8.333vw,3.5rem);
  font-weight: 900;
  margin:0;
  text-transform: uppercase;
}
h2 {
  font-size: clamp(1.3rem, -0.875rem + 8.333vw, 2rem);
  margin:0;
}
h3 {
  font-size: clamp(1.2rem, -0.875rem + 8.333vw, 1.5rem);
  margin:0;
}
`;

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker--adjustedwidth {
        margin-right: 0.2em;
        width: min(26vw,120px);
    }
     .date_picker--adjustedwidthlarge {
        width: min(32vw,170px);
    }
    .date_picker--adjustedwidthlarge .react-datepicker__input-container > *, .date_picker--adjustedwidth .react-datepicker__input-container > *{
        border-radius: 2em;
        border: 2px solid var(--primary-color);
        box-sizing: border-box;
        font-size: var(--basic-font-size);
        outline: none;
        padding: 0.4em 1em;
        width: 100%;
    }
`;

export { GlobalStyle, DatePickerWrapperStyles };
