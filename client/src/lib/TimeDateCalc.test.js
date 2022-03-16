import bookingPresenceSlices from './TimeDateCalc';
describe('does it return correct presence slices when booking?', () => {
  it('Role RK: should return an array of 4 presence slices', () => {
    const currentUserRole = 'RK';
    const uekTimestamp = 1644002223000; // (4.2.22, 20:17)
    const rkTimestamp = 1644002223000;
    const newParameters = {
      _id: {
        $oid: '61e146a9fbc9e947b9f19496',
      },
      presenceWindowMins: 60,
      presenceParallel: 2,
      shiftBufferHandoverMins: 90,
      shiftBufferReturnMins: 120,
      shiftReminderHrs: 24,
      versionKey: 'false',
      durationAdventurerHrs: 3,
      durationDreamerHrs: 4,
      durationTravelerHrs: 5,
    };
    const booking = {
      _id: {
        $oid: '61e5e298ea07ba65605311e3',
      },
      monday_id: 2126001004,
      __v: 0,
      bemerkung: '',
      fahrzeug: 'DREAMER #_13',
      kennzeichen: 'VT2051',
      kombidatum_ende: {
        $date: '2022-02-11T18:00:00.000Z',
      },
      kombidatum_start: {
        $date: '2022-01-10T10:00:00.000Z',
      },
      presence_slices: [],
      rk: '',
      timestamp_creation: {
        $date: '2022-01-17T21:41:44.359Z',
      },
      uek: '',
      zusatz_1: 'Campingtoilette Bivvy Loo',
      zusatz_10: '-',
      zusatz_2: 'Omnia Camping-Backofen',
      zusatz_3: '-',
      zusatz_4: '-',
      zusatz_5: '-',
      zusatz_6: '-',
      zusatz_7: '-',
      zusatz_8: '-',
      zusatz_9: '-',
      client: 'Ann-Kristin Ohling',
      letztes_update: {
        $date: '2022-01-10T09:05:32.000Z',
      },
    };
    expect(bookingPresenceSlices(booking, newParameters, currentUserRole, uekTimestamp, rkTimestamp)).toHaveLength(4);
  });
});
