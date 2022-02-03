//Funktion schreiben, die "allBookings" importiert
// zu jedem Booking über find Funktion (in users controller umstellen) und untersucht auf
// - Beginn in 24h bei vergebenen schichten
// - Bei (allen) Änderungen in vergebenen Schichten mit der Bitte um Prüfung und Behalten oder ggf. Übergabe (Login-Stempel am Userdatensatz als Vergleichsmoment? Kann ich Datum / Uhrzeit isolieren?)
// - Mail an Admin bei 30d vorher und 7d vorher nicht vergebenen Schichten
// - Andere Schichtenänderungen als Datum / Uhrzeit seit dem letzten Login (Login-Stempel am Userdatensatz als Vergleichsmoment?)
// IDEE: 2. API Fetch bei Monday.com --> https://api.developer.monday.com/docs/activity-logs, gefilter nach den Spalten Kombidatum Start und Ende, Append als Array an die zugehörige Item ID in MongoDB?

import React, { useState } from 'react';
import { CenteredButton } from './components/Buttons';

export default function NotificationsAnalysis() {
  //   const [bookingsToAnalyze, setbookingsToAnalyze] = useState(allBookings);
  const [mailerState, setMailerState] = useState({
    name: 'test',
    email: 'test@test.com',
    message: 'Moin, Testnachricht',
  });

  const submitEmail = async (event) => {
    event.preventDefault();
    console.log({ mailerState });
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailerState }),
    });
    await res.json();
    await setMailerState({
      name: 'test',
      email: 'test@test.com',
      message: 'Moin, Testnachricht',
    });
    //   .then((res) => res.json())
    //   .then(() => {
    //     setMailerState({
    //       email: '',
    //       name: '',
    //       message: '',
    //     });
    //   });
  };

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  return <CenteredButton onClick={submitEmail}>TESTMAIL</CenteredButton>;
}
