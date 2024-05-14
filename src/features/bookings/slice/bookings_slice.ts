import { BookingWithPet } from "./../index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Booking, BookingState, BookingStatus, BookingsUIStatus } from "..";
import { AppThunk, RootState } from "../../../store/store";
import {
  createBookingOnFirebase,
  fetchAllBookings,
  updateBookingStatusOnFirebase,
} from "../service/booking_service";
import { fetchAllPets } from "../../pets/service/pets_service";

const initialState: BookingState = {
  allBookings: [],
  selectedBooking: null,
  fetchAllBookingsUISate: BookingsUIStatus.IDLE,
  createBookingStatus: BookingsUIStatus.IDLE,
};

export const bookingSlice = createSlice({
  name: "bookings-slice",
  initialState,
  reducers: {
    setSelectedBooking: (
      state,
      action: PayloadAction<BookingWithPet | null>
    ) => {
      state.selectedBooking = action.payload;
    },
    updateFetchBookingStatus: (
      state,
      action: PayloadAction<BookingsUIStatus>
    ) => {
      state.fetchAllBookingsUISate = action.payload;
    },
    updateCreateBookingUIStatus: (
      state,
      action: PayloadAction<BookingsUIStatus>
    ) => {
      state.createBookingStatus = action.payload;
    },
    updateBookings: (state, action: PayloadAction<BookingWithPet[]>) => {
      state.allBookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchPets, (state) => {
    //     state.fetchPetUIStatus = CreatePetUIStatus.LOADING;
    //   })
    //   .addCase(incrementAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.value = action.payload;
    //   });
  },
});

export const {
  updateCreateBookingUIStatus,
  setSelectedBooking,
  updateBookings,
  updateFetchBookingStatus,
} = bookingSlice.actions;

export const fetchAllUserBookings =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(updateFetchBookingStatus(BookingsUIStatus.LOADING));
      const bookings = await fetchAllBookings();
      const pets = await fetchAllPets();
      const bookingsWithPetNames: BookingWithPet[] = [];
      const userId = getState().user.user?.userId;
      bookings.forEach((booking) => {
        const pet = pets.find((p) => p.petId === booking.petId);
        if (pet) {
          const bookingWitPetName: BookingWithPet = {
            userId: booking.userId,
            status: booking.status,
            petId: pet?.petId,
            petImage: pet.images[0],
            petName: pet.name,
            startDate: booking.startDate,
            endDate: booking.endDate,
            bookingId: booking.bookingId,
          };
          bookingsWithPetNames.push(bookingWitPetName);
        }
      });
      const userBookings = bookingsWithPetNames.filter(
        (b) => b.userId === userId
      );
      dispatch(updateBookings(userBookings));

      if (userBookings.length === 0) {
        dispatch(updateFetchBookingStatus(BookingsUIStatus.ERROR));
      } else {
        dispatch(updateFetchBookingStatus(BookingsUIStatus.SUCCESS));
      }
    } catch (error) {
      console.log("error fetching bookings ->", error);
      dispatch(updateFetchBookingStatus(BookingsUIStatus.ERROR));
    }
  };

export const createUserBooking =
  (petId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(updateCreateBookingUIStatus(BookingsUIStatus.LOADING));
      const userId = getState().user.user?.userId ?? "";
      const newBooking: Booking = {
        petId: petId,
        userId: userId,
        startDate: new Date().toISOString(),
        endDate: "",
        status: BookingStatus.Pending,
      };
      const newBk = await createBookingOnFirebase(newBooking);
      dispatch(setSelectedBooking(newBooking));
      dispatch(updateCreateBookingUIStatus(BookingsUIStatus.SUCCESS));
      alert("Booking created successfully");
    } catch (error) {
      console.log("error fetching bookings ->", error);
      dispatch(updateCreateBookingUIStatus(BookingsUIStatus.ERROR));
    }
  };

export const updateBookingStatus =
  (newStatus: BookingStatus): AppThunk =>
  async (dispatch, getState) => {
    try {
      const userId = getState().user.user?.userId ?? "";
      const selectedBooking = getState().bookings.selectedBooking;
      if (selectedBooking && selectedBooking.bookingId) {
        const updatedBooking: BookingWithPet = {
          petId: selectedBooking.petId,
          userId: selectedBooking.userId,
          status: newStatus,
          petName: selectedBooking.petName,
        };
        dispatch(setSelectedBooking(updatedBooking));
        await updateBookingStatusOnFirebase(
          selectedBooking.bookingId,
          newStatus
        );
      }

      dispatch(updateCreateBookingUIStatus(BookingsUIStatus.SUCCESS));
    } catch (error) {
      console.log("error fetching bookings ->", error);
      dispatch(updateCreateBookingUIStatus(BookingsUIStatus.ERROR));
    }
  };

export const currentFetchedBookings = (state: RootState) =>
  state.bookings.allBookings;
export const currentFetchBookingsUIState = (state: RootState) =>
  state.bookings.fetchAllBookingsUISate;
export const currentCreateBookingUIStatus = (state: RootState) =>
  state.bookings.createBookingStatus;
export const currentSelectedBooking = (state: RootState) =>
  state.bookings.selectedBooking;

export default bookingSlice.reducer;
