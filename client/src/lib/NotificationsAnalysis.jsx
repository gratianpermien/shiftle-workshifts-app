//Funktion schreiben, die "allBookings" importiert
// zu jedem Booking über find Funktion (in users controller umstellen) und untersucht auf
// - Beginn in 24h bei vergebenen schichten
// - Bei (allen) Änderungen in vergebenen Schichten mit der Bitte um Prüfung und Behalten oder ggf. Übergabe (Login-Stempel am Userdatensatz als Vergleichsmoment? Kann ich Datum / Uhrzeit isolieren?)
// - Mail an Admin bei 30d vorher und 7d vorher nicht vergebenen Schichten
// - Andere Schichtenänderungen als Datum / Uhrzeit seit dem letzten Login (Login-Stempel am Userdatensatz als Vergleichsmoment?)
// IDEE: 2. API Fetch bei Monday.com --> https://api.developer.monday.com/docs/activity-logs, gefilter nach den Spalten Kombidatum Start und Ende, Append als Array an die zugehörige Item ID in MongoDB?

import React, { useState } from 'react';
import { CenteredButton } from '../components/Buttons';

export default function NotificationsAnalysis() {
  //   const [bookingsToAnalyze, setbookingsToAnalyze] = useState(allBookings);
  const [mailerState, setMailerState] = useState({
    email: 'gratian@klarhe.it',
    subject: 'Testbetreff',
    message: 'Moin, Testnachricht',
  });

  async function submitEmail() {
    console.log({ mailerState });
    const response = await fetch('api/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailerState }),
    });
    if (response.status == 200) {
      // let json = await response.json();
      const resData = await response.json();
      console.log(resData);
      if (resData.status === 'success') {
        alert('Message Sent');
      } else if (resData.status === 'fail') {
        alert('Message failed to send');
      }
      setMailerState({
        name: 'test',
        email: 'test@test.com',
        message: 'Moin, Testnachricht',
      });
    }
  }

  return <CenteredButton onClick={submitEmail}>TESTMAIL</CenteredButton>;
}
