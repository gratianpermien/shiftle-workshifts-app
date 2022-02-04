export default function checkParallel(
  allBookings,
  booking,
  currentUserName,
  currentUserRole,
  rkTimestamp,
  setAccepted,
  setBookingToShiftModalIsOpen,
  setError,
  setSaveActivated,
  setUpdatedBooking,
  uekTimestamp
) {
  //Define worktime for return only
  let durationReturn = '';
  switch (booking.fahrzeug.substring(0, 3)) {
    case 'DRE':
      durationReturn = newParameters.durationDreamerHrs;
      break;
    case 'ADV':
      durationReturn = newParameters.durationAdventurerHrs;
      break;
    case 'TRA':
      durationReturn = newParameters.durationTravelerHrs;
      break;
  }
  //Calculate first and last hour and construct presence slides array
  const firstHour = new Date(currentUserRole == 'UEK' ? uekTimestamp : rkTimestamp).getHours();
  const lastHour = currentUserRole == 'UEK' ? firstHour : firstHour + durationReturn - 1;
  const presenceDate = new Date(currentUserRole == 'UEK' ? uekTimestamp : rkTimestamp);
  const year = presenceDate.getFullYear();
  const month = presenceDate.getMonth() + 1;
  const day = presenceDate.getDate();
  const dayAfter = day + 1;
  let presenceSlices = [];
  if (lastHour < 24) {
    for (let i = firstHour; i <= lastHour; i++) {
      presenceSlices = [...presenceSlices, parseInt(`${year}${month}${day}${i < 10 ? '0' + i : i}`)];
    }
  } else {
    const lastHourNextDay = lastHour - 24;
    for (let i = firstHour; i < 24; i++) {
      presenceSlices = [...presenceSlices, parseInt(`${year}${month}${day}${i < 10 ? '0' + i : i}`)];
    }
    for (let i = 0; i <= lastHourNextDay; i++) {
      presenceSlices = [...presenceSlices, parseInt(`${year}${month}${dayAfter}${i < 10 ? '0' + i : i}`)];
    }
  }
  //Check for parallel vehicles (through array comparison) and if allowed, write to DB, otherwise stop and display error
  let parallelPresence = 0;
  const overlap = (element) => presenceSlices.includes(element);
  allBookings.some((element) => {
    let bookingpresence = element.presence_slices;
    let doublePresence = bookingpresence.some(overlap);
    doublePresence ? parallelPresence++ : parallelPresence;
    if (parallelPresence >= newParameters.presenceParallel) {
      setError(true);
      return false;
    } else {
      setAccepted(true);
      setError(false);
      const staffNameStampUEK = currentUserRole == 'UEK' ? currentUserName : booking.uek;
      const staffNameStampRK = currentUserRole == 'RK' ? currentUserName : booking.rk;
      let totalSlices = [booking.presence_slices, ...presenceSlices];
      const modifier = {
        presence_slices: totalSlices.flat().sort(),
        uek: staffNameStampUEK,
        rk: staffNameStampRK,
      };
      setUpdatedBooking(Object.assign(booking, modifier));
      setSaveActivated(false);
      setTimeout(() => {
        setBookingToShiftModalIsOpen(false);
      }, 2000);
      return true;
    }
  });
}
