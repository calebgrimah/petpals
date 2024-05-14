import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  I18nManager,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import * as React from "react";
import { Text, Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Pet } from "..";
import { setSelectedPet } from "../slice/pets_slice";
import {
  createUserBooking,
  currentCreateBookingUIStatus,
} from "../../bookings/slice/bookings_slice";
import { BookingsUIStatus } from "../../bookings";

interface PetItemProps {
  pet: Pet;
  isUsersPet: boolean;
}

const PetItem: React.FC<PetItemProps> = ({ pet, isUsersPet }) => {
  const dispatch = useAppDispatch();
  const createBookingUIStatus = useAppSelector(currentCreateBookingUIStatus);

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: pet?.images[0] }} />
      <Text style={styles.title} variant="titleLarge">
        {pet?.name}
      </Text>
      <Text variant="labelSmall">{pet.description}</Text>
      {isUsersPet ? null : (
        <View style={styles.buttonRow}>
          <Button
            icon="bookmark"
            mode="contained"
            onPress={() => {
              //book pet
              dispatch(setSelectedPet(pet));
              dispatch(createUserBooking(pet.petId ?? ""));
            }}
            loading={createBookingUIStatus === BookingsUIStatus.LOADING}
            disabled={createBookingUIStatus === BookingsUIStatus.LOADING}
          >
            Book Session
          </Button>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  card: {
    margin: 8,
    padding: 16,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  buttonRow: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    padding: 8,
    flexDirection: "row",
    marginTop: 8,
  },
});
export default PetItem;
