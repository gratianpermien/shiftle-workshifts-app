import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default async function fetchBookingDataFromMonday() {
  const monday_api = process.env.API_KEY_MONDAY;
  const board_id = process.env.BOOKINGS_BOARD_ID_MONDAY;
  const query = `query { boards (ids: ${board_id}) {groups (ids: topics) {items (newest_first:true) {id column_values {title text}}}}},`;

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
  const flattenedData = flatten(data)[0].boards[0].groups[0].items;

  //Important info for client: do not change column titles
  const keyProperties = [
    "Name",
    "Kennzeichen",
    "Fahrzeug",
    "Kombidatum Start",
    "Kombidatum Ende",
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
    const bookingData = {
      id: booking.id,
    };
    booking.column_values.forEach((column) => {
      if (keyProperties.includes(column.title)) {
        bookingData[column.title.toLowerCase().replace(" ", "_")] = column.text;
      }
    });
    return bookingData;
  });
  return restructuredData;
}
