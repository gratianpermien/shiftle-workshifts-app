import React, { useState } from 'react';
import styled from 'styled-components';
import shiftle_watermark from '../assets/shiftle_watermark.svg';
import BookingCard from '../components/BookingCard';

export default function Bookings({
  allBookings,
  allUsers,
  currentPage,
  currentUser,
  filterDateEarliest,
  filterDateLatest,
  newParameters,
  setAllBookings,
}) {
  const [deleted, setDeleted] = useState(false);

  return (
    <View>
      <BookingContainer>
        {allBookings
          .filter(
            (booking) =>
              new Date(currentUser.role === 'UEK' ? booking.kombidatum_start : booking.kombidatum_ende) >=
                new Date(filterDateEarliest) &&
              new Date(currentUser.role === 'UEK' ? booking.kombidatum_start : booking.kombidatum_ende) <=
                new Date(filterDateLatest)
          )
          .map((booking, index) => (
            <BookingCard
              allBookings={allBookings}
              allUsers={allUsers}
              booking={booking}
              bookingIndex={index}
              currentPage={currentPage}
              currentUserName={currentUser.name}
              currentUserRole={currentUser.role}
              deleted={deleted}
              newParameters={newParameters}
              setAllBookings={setAllBookings}
              setDeleted={setDeleted}
            />
          ))}
      </BookingContainer>
    </View>
  );
}

const View = styled.div`
  background: ${(props) =>
    props.simpleTheming
      ? `50% 95% no-repeat url(${shiftle_watermark}),
    top left / cover no-repeat
      url("https://www.hamburg-startups.net/wp-content/uploads/2021/06/Produkt_Aussen_Dreamer_0035-1030x687.jpg")`
      : `50% 95% no-repeat url(${shiftle_watermark}), var(--primary-bg)`};
  background-attachment: fixed;
  min-height: 100vh;
  padding: 1rem 5vw 25vh;
`;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 600px;
  z-index: 9;
`;
