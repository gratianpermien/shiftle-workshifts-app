export default function BookingModifier(booking, modifier) {
  const updatedBooking = Object.assign(booking, modifier);
  updateBooking(updatedBooking);

  //Update Admin-Parameters in DB
  async function updateBooking(updatedBooking) {
    if (updatedBooking) {
      const bookingId = updatedBooking._id;
      await fetch(`api/shifts/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
      await fetch('api/shifts');
    }
  }
}
