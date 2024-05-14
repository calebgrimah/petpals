//booking
export enum BookingStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Cancelled = "cancelled",
  }
  export function isoToReadable(isoString: string): string {
    // Parse ISO string to Date object
    const dateObject = new Date(isoString);
    // Format Date object as a readable date string
    const readableDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return readableDate;
}
  
  export interface Booking {
    bookingId?: string;
    petId: string;
    userId: string;
    startDate?: string;
    endDate?: string;
    status: BookingStatus;
    reviewId?: string;
  } 
   export interface BookingWithPet {
    bookingId?: string
    petName?: string;
    petImage?: string;
    petId?: string;
    userId: string;
    startDate?: string;
    endDate?: string;
    status: BookingStatus;
  }

  
  export enum BookingsUIStatus {
    IDLE = "IDLE",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
  }
  export type BookingState = {
    allBookings:BookingWithPet[]
    selectedBooking: BookingWithPet | null
    fetchAllBookingsUISate: BookingsUIStatus
    createBookingStatus: BookingsUIStatus
  }

