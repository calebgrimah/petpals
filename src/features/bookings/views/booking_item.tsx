import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import * as React from "react";
import { Text } from "react-native-paper";
import { isoToReadable } from "..";

interface BookingItemProps {
  petImage: string;
  petName: string;
  bookingDate: string;
}

const BookingItem: React.FC<BookingItemProps> = ({
  petImage,
  petName,
  bookingDate,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: petImage }} />
      <Text style={styles.title} variant="titleLarge">
        {petName}
      </Text>
      <Text variant="bodyLarge">
        {`You have booked to spend time with ${petName} on ` +
          isoToReadable(bookingDate)}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  card: {
    margin: 8,
    padding: 16,
  },
  title: {
    marginTop: 16,
  },
});
export default BookingItem;
