// - 24h vor Schichtstart
// - Bei (allen) Änderungen in vergebenen Schichten mit der Bitte um Prüfung und Behalten oder ggf. Übergabe (Login-Stempel am Userdatensatz als Vergleichsmoment? Kann ich Datum / Uhrzeit isolieren?)
// - Mail an Admin bei 30d vorher und 7d vorher nicht vergebenen Schichten
// - Andere Schichtenänderungen als Datum / Uhrzeit seit dem letzten Login (Login-Stempel am Userdatensatz als Vergleichsmoment?)
// IDEE: 2. API Fetch bei Monday.com --> https://api.developer.monday.com/docs/activity-logs, gefilter nach den Spalten Kombidatum Start und Ende, Append als Array an die zugehörige Item ID in MongoDB?

import React, { useState, useEffect } from 'react';
import { CenteredButton } from '../components/Buttons';
import BookingModifier from './ModifyBooking';

export default function PrepareNotifications({ allUsers, allBookings, newParameters }) {
  // const [mailerState, setMailerState] = useState({
  //   email: `${newParameters.adminEmail}`,
  //   subject: 'Keine Regel hat gegriffen',
  //   message: `Alle Buchungen als Datenobjekt: ${JSON.stringify(allBookings)}`,
  // });

  useEffect(() => {
    regularReminder(allBookings, allUsers);
  }, []);

  // Get corresponding user mail address
  function getUserMail(allUsers, searchUser) {
    let foundUserMail = '';
    allUsers.forEach((user) => {
      user.name == searchUser ? (foundUserMail = user.email) : null;
    });
    return foundUserMail != '' ? foundUserMail : newParameters.adminEmail;
  }
  // Reminder 24h pre shift start (RK first, UEK second)
  function regularReminder(allBookings, allUsers) {
    allBookings.forEach((booking) => {
      if (
        !booking.mails_meta.time_oneday_rk &&
        Date.parse(booking.kombidatum_ende) - Date.parse(new Date()) < 86400 * 1000 &&
        Date.parse(booking.kombidatum_ende) - Date.parse(new Date()) > 0
      ) {
        let searchUser = booking.rk;
        let foundUser = getUserMail(allUsers, searchUser);
        let mailContent = {
          email: foundUser,
          subject: 'Deine Aufbereitung beginnt in 24 Stunden',
          message: `Hallo ${booking.rk}, in 24 Stunden kommt das Fahrzeug ${booking.kennzeichen} zurück. Du bist für die Aufbereitung eingetragen.`,
        };
        let modifier = {
          mails_meta: {
            time_oneday_rk: true,
            time_oneday_uek: booking.mails_meta.time_oneday_uek,
            time_sevendays: booking.mails_meta.time_sevendays,
            time_thirtydays: booking.mails_meta.time_thirtydays,
            func_groupinfo: booking.mails_meta.func_groupinfo,
            func_shiftconfirmation_rk: booking.mails_meta.func_shiftconfirmation_rk,
            func_shiftconfirmation_uek: booking.mails_meta.func_shiftconfirmation_uek,
            func_shiftchange: booking.mails_meta.func_shiftchange,
          },
        };
        BookingModifier(booking, modifier);
        () => {
          submitEmail(mailContent);
        };
        console.log('mail sent to ' + foundUser);
      } else if (
        !booking.mails_meta.time_oneday_uek &&
        Date.parse(booking.kombidatum_start) - Date.parse(new Date()) < 86400 * 1000 &&
        Date.parse(booking.kombidatum_start) - Date.parse(new Date()) > 0
      ) {
        let searchUser = booking.uek;
        let foundUser = getUserMail(allUsers, searchUser);
        let mailContent = {
          email: foundUser,
          subject: 'Deine Aufbereitung beginnt in 24 Stunden',
          message: `Hallo ${booking.rk}, in 24 Stunden kommt das Fahrzeug ${booking.kennzeichen} zurück. Du bist für die Aufbereitung eingetragen.`,
        };
        let modifier = {
          mails_meta: {
            time_oneday_rk: booking.mails_meta.time_oneday_uek,
            time_oneday_uek: true,
            time_sevendays: booking.mails_meta.time_sevendays,
            time_thirtydays: booking.mails_meta.time_thirtydays,
            func_groupinfo: booking.mails_meta.func_groupinfo,
            func_shiftconfirmation_rk: booking.mails_meta.func_shiftconfirmation_rk,
            func_shiftconfirmation_uek: booking.mails_meta.func_shiftconfirmation_uek,
            func_shiftchange: booking.mails_meta.func_shiftchange,
          },
        };
        BookingModifier(booking, modifier);
        submitEmail(mailContent);
        console.log('mail sent to ' + foundUser);
      }
    });
  }

  async function submitEmail(mailContent) {
    const response = await fetch('api/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ mailContent }),
    });
    if (response.status == 200) {
      const resData = await response.json();
      console.log(resData);
    }
  }
  return null;
  // <CenteredButton
  // onClick={() => {
  //   submitEmail();
  // }}
  // >
  //   TEST
  // </CenteredButton>
  //)
}
