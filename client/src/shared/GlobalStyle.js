import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
:root {
--primary-bg: linear-gradient(245deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%); //hell
--secondary-bg: #FFfdfd;
--tertiary-bg: rgba(86, 90, 94, 1);
--headings-color: #eeeeee; //in Admin
--primary-color: #F56FA8; //in Admin
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
  font-size: clamp(1.7rem,-0.875rem + 8.333vw,3.5rem);
  color: var(--headings-color);
  margin:0;
  text-transform: uppercase;
  font-weight: 900;
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
        width: min(26vw,120px);
        margin-right: 0.2em;
    }
     .date_picker--adjustedwidthlarge {
        width: min(32vw,170px);
    }
    .date_picker--adjustedwidthlarge .react-datepicker__input-container > *, .date_picker--adjustedwidth .react-datepicker__input-container > *{
        width: 100%;
        font-size: var(--basic-font-size);
        padding: 0.4em 1em;
        border-radius: 2em;
        box-sizing: border-box;
        outline: none;
        border: 2px solid var(--primary-color);
    }
`;

export { GlobalStyle, DatePickerWrapperStyles };
