import { FunctionComponent, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import {
  currentFetchBookingsUIState,
  currentFetchedBookings,
  fetchAllUserBookings,
} from "../slice/bookings_slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { BookingsUIStatus } from "..";
import BookingItem from "./booking_item";

interface AppointmentsPageProps {}

const AppointmentsPage: FunctionComponent<AppointmentsPageProps> = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector(currentFetchedBookings);
  const fetchBookingsUIStatus = useAppSelector(currentFetchBookingsUIState);

  useEffect(() => {
    dispatch(fetchAllUserBookings());
  }, []);

  if (fetchBookingsUIStatus === BookingsUIStatus.ERROR) {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require("assets/no-data.gif")}
            width={80}
            height={80}
            style={styles.image}
          />
          <Text>No Bookings Available</Text>
        </View>
      </>
    );
  }
  if (fetchBookingsUIStatus === BookingsUIStatus.LOADING) {
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      </>
    );
  }
  return (
    <>
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <BookingItem
              petName={item.petName ?? ""}
              petImage={item.petImage ?? ""}
              bookingDate={item?.startDate ?? ""}
            />
          )}
          keyExtractor={(item) => item.petId ?? ""}
          style={styles.flatlist}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flexGrow: 1,
  },
  image: {
    width: 240,
    height: 240,
  },
});

export default AppointmentsPage;
