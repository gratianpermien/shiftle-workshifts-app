import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myHeadline, setMyHeadline] = useState("");

  useEffect(() => {
    const fetchMyHeadline = async () => {
      const response = await fetch("http://localhost:4000/api");
      const data = await response.json();
      setMyHeadline(data.message);
    };
    fetchMyHeadline();
  }, []);
  return (
    <div className="App">
      <h1>{myHeadline}</h1>
    </div>
  );
}

export default App;
