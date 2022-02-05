import React, { useState } from 'react';
import styled from 'styled-components';
import BookingToShiftModal from './BookingToShiftModal';
import ReturnModal from './ReturnModal';
import ModBookingModal from './ModBookingAdminModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleDown,
  faCog,
  faMinusCircle,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function BookingCard({
  isAdmin,
  allBookings,
  allUsers,
  booking,
  bookingIndex,
  currentPage,
  currentUserName,
  currentUserRole,
  deleted,
  newParameters,
  setAllBookings,
  setDeleted,
}) {
  const [bookingToShiftModalIsOpen, setBookingToShiftModalIsOpen] = useState(false);
  const [returnModalIsOpen, setReturnModalIsOpen] = useState(false);
  const [modBookingModalIsOpen, setModBookingModalIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  async function deleteBooking(booking) {
    const bookingId = booking._id;
    await fetch(`api/shifts/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    setDeleted(true);
    const res = await fetch('api/shifts');
    const fetchedData = await res.json();
    setTimeout(() => {
      setAllBookings(fetchedData);
      setDeleted(false);
    }, 2000);
  }

  const bookingRK = booking.rk;
  const bookingUEK = booking.uek;
  const isStaffedRK = currentUserRole == 'RK' && bookingRK != '';
  const isStaffedUEK = currentUserRole == 'UEK' && bookingUEK != '';
  const isShifts = currentPage == 'schichten' ? true : false;

  return (
    <Card deleted={deleted} key={bookingIndex.toString()}>
      <UserRibbonWrapper isAdmin={isAdmin} isStaffedRK={isStaffedRK} isStaffedUEK={isStaffedUEK}>
        <UserRibbon>{currentUserRole == 'RK' ? bookingRK : bookingUEK}</UserRibbon>
      </UserRibbonWrapper>
      <CardRow>
        <BasicInfo>
          <h2>{booking.client}</h2>
          <h3>
            {booking.fahrzeug}, {'HH-' + booking.kennzeichen}
          </h3>
          <p>
            Abfahrt:
            {' ' +
              Intl.DateTimeFormat('de-DE', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              }).format(Date.parse(booking.kombidatum_start))}
          </p>
          <p>
            Ankunft:
            {' ' +
              Intl.DateTimeFormat('de-DE', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              }).format(Date.parse(booking.kombidatum_ende))}{' '}
          </p>

          <AdminInfo isAdmin={isAdmin}>
            <p>
              Zuletzt aktualisiert:
              {' ' +
                Intl.DateTimeFormat('de-DE', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(Date.parse(booking.letztes_update))}
            </p>
            <p>
              Schichtbeginn Aufbereitung:{' '}
              {booking.presence_slices[0] > 0
                ? booking.presence_slices[1] - booking.presence_slices[0] > 1
                  ? String(booking.presence_slices[1]).substring(String(booking.presence_slices[1]).length - 2) + ':00'
                  : String(booking.presence_slices[0]).substring(String(booking.presence_slices[0]).length - 2) + ':00'
                : ' noch nicht vergeben'}
            </p>
            <p>Übergabe: {booking.uek != '' ? booking.uek : ' noch nicht vergeben'}</p>
            <p>Rücknahme: {booking.rk != '' ? booking.rk : ' noch nicht vergeben'}</p>
          </AdminInfo>
        </BasicInfo>
        <Interaction>
          <EditButton isAdmin={isAdmin} onClick={() => setModBookingModalIsOpen(true)}>
            <FontAwesomeIcon icon={faCog} />
          </EditButton>
          <DeleteButton deleted={deleted} isAdmin={isAdmin} onClick={() => deleteBooking(booking)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </DeleteButton>
          {isShifts ? null : (
            <BookmarkButton
              onClick={() => setBookingToShiftModalIsOpen(true)}
              isStaffedUEK={isStaffedUEK}
              isStaffedRK={isStaffedRK}
              isAdmin={isAdmin}
              isShifts={isShifts}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </BookmarkButton>
          )}
          {isShifts ? (
            <ReturnButton
              onClick={() => setReturnModalIsOpen(true)}
              isStaffedUEK={isStaffedUEK}
              isStaffedRK={isStaffedRK}
              isAdmin={isAdmin}
              isShifts={isShifts}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </ReturnButton>
          ) : null}
          <InfoButton onClick={handleToggle}>
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </InfoButton>
        </Interaction>
      </CardRow>
      <AddInformation visible={toggle}>
        <h3>Bemerkung:</h3>
        <p>{booking.bemerkung ? booking.bemerkung : ' keine Besonderheiten'}</p>
        <h3>Zusatzausstattung:</h3>
        <p>
          {booking.zusatz_1 != '-' ? booking.zusatz_1 : ''}
          {booking.zusatz_2 != '-' ? ', ' + booking.zusatz_2 : ''}
          {booking.zusatz_3 != '-' ? ', ' + booking.zusatz_3 : ''}
          {booking.zusatz_4 != '-' ? ', ' + booking.zusatz_4 : ''}
          {booking.zusatz_5 != '-' ? ', ' + booking.zusatz_5 : ''}
          {booking.zusatz_6 != '-' ? ', ' + booking.zusatz_6 : ''}
          {booking.zusatz_7 != '-' ? ', ' + booking.zusatz_7 : ''}
          {booking.zusatz_8 != '-' ? ', ' + booking.zusatz_8 : ''}
          {booking.zusatz_9 != '-' ? ', ' + booking.zusatz_9 : ''}
          {booking.zusatz_10 != '-' ? ', ' + booking.zusatz_10 : ''}
        </p>
      </AddInformation>
      {bookingToShiftModalIsOpen && (
        <BookingToShiftModal
          allBookings={allBookings}
          booking={booking}
          bookingToShiftModalIsOpen={bookingToShiftModalIsOpen}
          currentUserName={currentUserName}
          currentUserRole={currentUserRole}
          newParameters={newParameters}
          setBookingToShiftModalIsOpen={setBookingToShiftModalIsOpen}
        />
      )}
      {returnModalIsOpen && (
        <ReturnModal
          allBookings={allBookings}
          allUsers={allUsers}
          booking={booking}
          currentUserName={currentUserName}
          currentUserRole={currentUserRole}
          newParameters={newParameters}
          returnModalIsOpen={returnModalIsOpen}
          setReturnModalIsOpen={setReturnModalIsOpen}
        />
      )}
      {modBookingModalIsOpen && (
        <ModBookingModal
          allBookings={allBookings}
          allUsers={allUsers}
          booking={booking}
          currentUserName={currentUserName}
          modBookingModalIsOpen={modBookingModalIsOpen}
          newParameters={newParameters}
          setAllBookings={setAllBookings}
          setModBookingModalIsOpen={setModBookingModalIsOpen}
        />
      )}
    </Card>
  );
}

const Card = styled.article`
  background-color: var(--secondary-bg);
  border-radius: 1em;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CardRow = styled.article`
  display: flex;
  gap: 5vw;
  justify-content: space-between;
  padding: 1em;
`;
const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;
const Interaction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const AdminInfo = styled.div`
  border-left: 2px solid var(--headings-color);
  display: ${(props) => (props.isAdmin ? `block` : `none`)};
  padding-left: 0.4em;
`;
const AddInformation = styled.div`
  background: var(--headings-color);
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  height: ${(props) => (props.visible ? '1' : '0')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  padding-bottom: ${(props) => (props.visible ? '1em' : '0')};
  padding-left: 1em;
  padding-right: 1em;
  padding-top: ${(props) => (props.visible ? '1em' : '0')};
  transition: padding-bottom 600ms, padding-top 600ms, height 600ms, opacity 600ms;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const BookmarkButton = styled.a`
  color: ${(props) => (props.isStaffedRK || props.isStaffedUEK || props.isAdmin ? `#8f8f8f;` : `#44d68d;`)};
  cursor: pointer;
  display: ${(props) => (props.isAdmin ? `none;` : `block;`)};
  font-size: var(--icon-size);
  pointer-events: ${(props) => (props.isStaffedRK || props.isStaffedUEK || props.isAdmin ? `none` : `auto`)};
  transition: all 0.2s;
  &:hover,
  &:active {
    color: #2a8658;
  }
`;
const ReturnButton = styled(BookmarkButton)`
  color: #f1a54e;
  pointer-events: auto;
  &:hover,
  &:active {
    color: #d18c3d;
  }
`;
const InfoButton = styled(BookmarkButton)`
  color: #4e95f1;
  &:hover,
  &:active {
    color: #3c74bd;
  }
`;
const EditButton = styled(BookmarkButton)`
  color: #f1bd4e;
  display: ${(props) => (props.isAdmin ? `block` : `none`)};
  pointer-events: ${(props) => (props.isAdmin ? `auto` : `none`)};
  &:hover,
  &:active {
    color: #d4a744;
  }
`;
const DeleteButton = styled(EditButton)`
  color: #f1614e;
  display: ${(props) => (props.isAdmin ? `block` : `none`)};
  pointer-events: ${(props) => (props.isAdmin ? `auto` : `none`)};
  &:hover,
  &:active {
    color: #b64738;
  }
`;
const UserRibbonWrapper = styled.div`
  display: ${(props) => (props.isStaffedRK || props.isStaffedUEK ? `block` : `none`)};
  height: 88px;
  overflow: hidden;
  position: absolute;
  width: 80px;
  z-index: 19;
`;
const UserRibbon = styled.div`
  background-color: var(--primary-color);
  color: #333;
  color: var(--secondary-bg);
  display: block;
  font-size: var(--basic-font-size);
  font-weight: 600;
  padding: min(1vw, 7px);
  position: relative;
  right: 35px;
  text-align: center;
  top: 11px;
  transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 120px;
`;
