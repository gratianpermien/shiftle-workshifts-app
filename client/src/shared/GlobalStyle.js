import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
:root {
--primary-bg: linear-gradient(225deg, rgba(245,111,168,1) 0%, rgba(98,2,2,1) 100%);
--secondary-bg: #FFEEEE;
--tertiary-bg: linear-gradient(245deg, rgba(255,238,238,1) 0%, rgba(255,255,255,1) 100%);
--headings-color: #6B1525;
--primary-color: #F56FA8;
--icon-size: clamp(3rem, -0.875rem + 8.333vw, 5rem);
--basic-font-size: clamp(0.7rem, 0.4137rem + 1.2214vw, 1rem);;
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
  font-size: clamp(1.2rem, -0.875rem + 8.333vw, 3rem);
  color: var(--headings-color);
  margin:0;
}
h2 {
  font-size: clamp(1.1rem, -0.875rem + 8.333vw, 2rem);
  margin:0;
}
h3 {
  font-size: clamp(1rem, -0.875rem + 8.333vw, 1.5rem);
  margin:0;
}
`;

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker--adjustedwidth {
        width: 25vw;
        margin-right: 0.2em;
    }
    .date_picker--adjustedwidth .react-datepicker__input-container > *{
        width: 100%;
        font-size: var(--basic-font-size);
        padding: 0.4em 1em;
        border-radius: 2em;
        outline: none;
        border: 2px solid var(--primary-color);
    }
`;

export { GlobalStyle, DatePickerWrapperStyles };
