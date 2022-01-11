import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bookingDataFromMonday, setBookingDataFromMonday] = useState([]);
  // const monday_api = import.meta.env.VITE_API_KEY_MONDAY;
  //Prepare asynchronous fetch from Monday GraphQL API and store in "data"
  useEffect(() => {
    const fetchBookingDataFromMonday = async () => {
      const query = `{ boards (ids: 1096884858) {items (limit: 20) {id column_values {title text}}}}`; //import.meta.env.VITE_BOOKINGS_BOARD_ID_MONDAY;
      const monday_api =
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEzOTgwOTU0NCwidWlkIjoxODQ1NzI4OCwiaWFkIjoiMjAyMi0wMS0wN1QxNzowMjo0OC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Nzk5ODY1NywicmduIjoidXNlMSJ9.gSFPbRKfcDcuEa-r355sBAVAQS_vDhwNvTP3IIFOhL4"; //import.meta.env.VITE_API_KEY_MONDAY;
      const response = await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: monday_api,
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      const data = await response.json();

      //Flatten and reconstruct API Result and store in state
      //Important info for client: do not change column titles
      const flatten = (obj) => Object.values(obj).flat();
      const flattenedData = flatten(data)[0].boards[0].items;

      const keyProperties = [
        "Name",
        "Kennzeichen",
        "Datum Start",
        "Zeit Start",
        "Datum Ende",
        "Zeit Ende",
        "Bemerkung",
        "Zusatz 1",
        "Zusatz 2",
        "Zusatz 3",
        "Zusatz 4",
        "Zusatz 5",
        "Zusatz 6",
        "Zusatz 7",
        "Zusatz 8",
        "Zusatz 9",
        "Zusatz 10",
      ];

      const restructuredData = flattenedData.map((booking) => {
        const bookingData = { id: booking.id };
        booking.column_values.forEach((column) => {
          if (keyProperties.includes(column.title)) {
            bookingData[column.title.toLowerCase().replace(" ", "_")] =
              column.text;
          }
        });
        return bookingData;
      });
      setBookingDataFromMonday(restructuredData);
    };
    //Invoke Fetch
    fetchBookingDataFromMonday();
  }, []);

  return (
    <div>
      <h1>Booking Data</h1>
      {bookingDataFromMonday.map((booking) => (
        <article>
          <h3>{booking.name}</h3>
          <p>
            {booking.kennzeichen} // {booking.zeit_ende}
          </p>
        </article>
      ))}
    </div>
  );
}

export default App;
