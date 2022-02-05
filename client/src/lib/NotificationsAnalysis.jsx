//Funktion schreiben, die "allBookings" importiert
// zu jedem Booking über find Funktion (in users controller umstellen) und untersucht auf
// - Beginn in 24h bei vergebenen schichten
// - Bei (allen) Änderungen in vergebenen Schichten mit der Bitte um Prüfung und Behalten oder ggf. Übergabe (Login-Stempel am Userdatensatz als Vergleichsmoment? Kann ich Datum / Uhrzeit isolieren?)
// - Mail an Admin bei 30d vorher und 7d vorher nicht vergebenen Schichten
// - Andere Schichtenänderungen als Datum / Uhrzeit seit dem letzten Login (Login-Stempel am Userdatensatz als Vergleichsmoment?)
// IDEE: 2. API Fetch bei Monday.com --> https://api.developer.monday.com/docs/activity-logs, gefilter nach den Spalten Kombidatum Start und Ende, Append als Array an die zugehörige Item ID in MongoDB?

import React, { useState, useEffect } from 'react';
import { CenteredButton } from '../components/Buttons';

export default function PrepareNotifications({ allUsers, allBookings, newParameters }) {
  const [mailerState, setMailerState] = useState({
    email: `${newParameters.adminEmail}`,
    subject: 'Keine Regel hat gegriffen',
    message: `Alle Buchungen als Datenobjekt: ${JSON.stringify(allBookings)}`,
  });

  useEffect(() => {
    regularReminder(allBookings, allUsers);
  }, []);

  function getUserMail(allUsers, searchUser) {
    let foundUserMail = '';
    allUsers.forEach((user) => {
      user.name == searchUser ? (foundUserMail = user.email) : null;
    });
    return foundUserMail;
  }

  function regularReminder(allBookings, allUsers) {
    allBookings.forEach((booking) => {
      if (Date.parse(booking.kombidatum_ende) - Date.parse(new Date()) < 86400 * 1000) {
        let searchUser = booking.rk;
        let foundUser = getUserMail(allUsers, searchUser);
        setMailerState({
          email: foundUser,
          subject: 'Deine Schicht beginnt in 24 Stunden',
          message: `Hallo ${booking.rk}, in 24 Stunden kommt das Fahrzeug ${booking.kennzeichen} zurück. Du bist für die Aufbereitung eingetragen.`,
        });
      } else if (Date.parse(booking.kombidatum_start) - Date.parse(new Date()) < 86400 * 1000) {
        let searchUser = booking.uek;
        let foundUser = getUserMail(allUsers, searchUser);
        setMailerState({
          email: foundUser,
          subject: 'Deine Schicht beginnt in 24 Stunden',
          message: `Hallo ${booking.uek}, in 24 Stunden wird das Fahrzeug ${booking.kennzeichen} übergeben. Du bist für die Übergabe eingetragen.`,
        });
      }
    });
  }

  async function submitEmail() {
    const response = await fetch('api/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailerState }),
    });
    if (response.status == 200) {
      const resData = await response.json();
      console.log(resData);
      setMailerState({
        email: '',
        subject: '',
        message: '',
      });
    }
  }
  return (
    <CenteredButton
      onClick={() => {
        submitEmail();
      }}
    >
      TEST
    </CenteredButton>
  );
}
