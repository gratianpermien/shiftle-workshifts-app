//Calculate first and last hour and construct presence slides array
export default function bookingPresenceSlices(booking, newParameters, currentUserRole, uekTimestamp, rkTimestamp) {
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
  return presenceSlices;
}
