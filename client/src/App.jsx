import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bookingDataFromMonday, setBookingDataFromMonday] = useState("");

  // const api_monday = import.meta.env.VITE_API_KEY_MONDAY;

  useEffect(() => {
    const fetchBookingDataFromMonday = async () => {
      const query =
        "{ boards (ids: 1096884858) { name state board_folder_id items {id name column_values {title text}}}}";
      const response = await fetch("https://api.monday.com/v2", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: import.meta.env.VITE_API_KEY_MONDAY,
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      setBookingDataFromMonday(JSON.stringify(data, null, 2));
    };
    fetchBookingDataFromMonday();
  }, []);

  return (
    <div className="App">
      <h1>Raw Booking Data</h1>
      <p>{bookingDataFromMonday}</p>
    </div>
  );
}

export default App;
