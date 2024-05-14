import { getDocs, collection, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";
import { Booking, BookingStatus } from "..";
import { firebaseDb } from "../../../config/firebaseConfig";

export async function fetchAllBookings(): Promise<Booking[]> {
    try {
      const bookingQuerySnapshot = await getDocs(
        collection(firebaseDb, "bookings")
      );
  
      // Extract booking data from query snapshot
      const bookings: Booking[] = [];
      bookingQuerySnapshot.forEach((doc) => {
        bookings.push(doc.data() as Booking);
      });
  
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  }

  export async function createBookingOnFirebase(booking: Booking): Promise<void> {
    try {
      const bookingRef = await addDoc(collection(firebaseDb, "bookings"), booking);
      const bookingId = bookingRef.id;
      await updateDoc(bookingRef, {
        bookingId,
      });
      console.log("Booking created successfully!");
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  }
  
  export async function updateBookingStatusOnFirebase(
    bookingId: string,
    newStatus: BookingStatus
  ): Promise<void> {
    try {
      const bookingRef = doc(firebaseDb, "bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });
  
      console.log("Booking status updated successfully!");
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  }
  
  //reviews
  export interface Review {
    reviewId: string;
    bookingId: string;
    userId: string;
    rating: number;
    comment: string;
  }
  
  export async function addReviewToBooking(
    bookingId: string,
    review: Review
  ): Promise<void> {
    try {
      const reviewRef = await addDoc(collection(firebaseDb, "reviews"), review);
  
      const bookingRef = doc(firebaseDb, "bookings", bookingId);
      await updateDoc(bookingRef, { reviewId: reviewRef.id });
      console.log("Review added to booking successfully!");
    } catch (error) {
      console.error("Error adding review to booking:", error);
    }
  }
  
  export async function fetchAllReviews(): Promise<Review[]> {
    try {
      const reviewQuerySnapshot = await getDocs(
        collection(firebaseDb, "reviews")
      );
  
      const reviews: Review[] = [];
      reviewQuerySnapshot.forEach((doc) => {
        reviews.push(doc.data() as Review);
      });
  
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  }
  
  export type BookingWithReview = Booking & { review?: Review };
  export async function getAllBookingsWithReviews(): Promise<
    BookingWithReview[]
  > {
    try {
      const bookingQuerySnapshot = await getDocs(
        collection(firebaseDb, "bookings")
      );
  
      // Extract booking data from query snapshot
      const bookingsWithReviews: BookingWithReview[] = [];
      for (const bookingDoc of bookingQuerySnapshot.docs) {
        const bookingData = bookingDoc.data() as Booking;
  
        // Check if the booking has a review associated with it
        if (bookingData.reviewId) {
          // Get the review document associated with this booking
          const docRef = doc(firebaseDb, "reviews", bookingData.reviewId);
          const reviewDoc = await getDoc(docRef);
  
          if (reviewDoc.exists()) {
            const reviewData = reviewDoc.data() as Review;
            // Combine booking and review data
            const bookingWithReview: BookingWithReview = {
              ...bookingData,
              review: reviewData,
            };
            bookingsWithReviews.push(bookingWithReview);
          }
        } else {
          // If there's no review associated with the booking, just include the booking data
          bookingsWithReviews.push(bookingData);
        }
      }
      return bookingsWithReviews;
    } catch (error) {
      console.error("Error fetching bookings with reviews:", error);
      return [];
    }
  }