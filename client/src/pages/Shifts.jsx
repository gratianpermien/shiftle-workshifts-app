import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shiftle_watermark from "../assets/shiftle_watermark.svg";
import BookingCard from "../components/BookingCard";

export default function Shifts({
  currentUser,
  currentPage,
  allUsers,
  simpleSite,
  filterDateEarliest,
  filterDateLatest,
  newParameters,
  allBookings,
}) {
  const userShifts = allBookings.filter(
    (booking) =>
      booking.rk == currentUser.name || booking.uek == currentUser.name
  );
  console.log(currentUser, allBookings);

  return (
    <View simpleTheming={simpleSite}>
      <BookingContainer>
        {userShifts
          .filter(
            (booking) =>
              new Date(
                currentUser.role === "UEK"
                  ? booking.kombidatum_start
                  : booking.kombidatum_ende
              ) >= new Date(filterDateEarliest) &&
              new Date(
                currentUser.role === "UEK"
                  ? booking.kombidatum_start
                  : booking.kombidatum_ende
              ) <= new Date(filterDateLatest)
          )
          .map((booking) => (
            <BookingCard
              currentPage={currentPage}
              id={booking._id}
              booking={booking}
              allUsers={allUsers}
              currentUserRole={currentUser.role}
              currentUserName={currentUser.name}
              newParameters={newParameters}
              allBookings={allBookings}
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
  /* width: 90vw; */
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99;
`;
