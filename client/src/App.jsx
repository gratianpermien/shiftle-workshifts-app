import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

function App() {
  const [bookingDataFromMonday, setBookingDataFromMonday] = useState([]);
  // const monday_api = import.meta.env.VITE_API_KEY_MONDAY;
  //Prepare asynchronous fetch from Monday GraphQL API and store in "data"
  useEffect(() => {
    const fetchBookingDataFromMonday = async () => {
      const query = `{ boards (ids: 1096884858) {items (limit: 20) {id column_values {title text}}}}`;
      const monday_api = import.meta.env.VITE_API_KEY_MONDAY; //import.meta.env.VITE_API_KEY_MONDAY;
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

      const flatten = (obj) => Object.values(obj).flat();
      const flattenedData = flatten(data)[0].boards[0].items;

      //Important info for client: do not change column titles
      const keyProperties = [
        "Name",
        "Kennzeichen",
        "Fahrzeug",
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
    <Container>
      <h1>Alle Buchungen</h1>
      {bookingDataFromMonday.map((booking) => (
        <Card key={booking.id}>
          <h2>{booking.name}</h2>
          <h3>
            {booking.fahrzeug}, {booking.kennzeichen}
          </h3>
          <p>
            Aufbereitung startet: {booking.datum_ende}, {booking.zeit_ende}
          </p>
        </Card>
      ))}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 90vw;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.article`
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 3px;
  width: 100%;
  padding: 1rem;
`;
