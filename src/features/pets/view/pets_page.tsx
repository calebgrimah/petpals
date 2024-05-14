import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
  FlatList,
  View,
  Image
} from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import { AppStackPageList } from "../../user";
import {
  CreatePetUIStatus,
  PetScreenNavigationProp,
  PetScreenRouteProp,
} from "..";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  currentUser,
  currentUserAppLoadCacheStatus,
} from "../../user/slice/user_slice";
import {
  fetchUserPets,
  currentFetchedPets,
  currentFetchPetsUIState,
  fetchAllUploadedPets,
} from "../slice/pets_slice";
import PetItem from "./pet_item";
import { Pet } from "../index";

const PetListingPage: React.FC<{
  navigation: PetScreenNavigationProp;
  route: PetScreenRouteProp;
}> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchAllUploadedPets());
    });
    return unsubscribe;
  }, [navigation]);

  const dispatch = useAppDispatch();
  const pets = useAppSelector(currentFetchedPets);
  const fetchPetsUIStatus = useAppSelector(currentFetchPetsUIState);
  const cacheUserFetchState = useAppSelector(currentUserAppLoadCacheStatus);
  const usr = useAppSelector(currentUser);

  if (fetchPetsUIStatus === CreatePetUIStatus.ERROR) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("assets/no-data.gif")}
            width={80}
            height={80}
            style={styles.image}
          />
                    <Text>No Pets Available</Text>

        </View>
      </>
    );
  }
  if (fetchPetsUIStatus === CreatePetUIStatus.LOADING) {
    return (
      <>
        <View style={styles.container}>
          <ActivityIndicator
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            animating={true}
          />
        </View>
      </>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView onScroll={onScroll}>
        {[...new Array(100).keys()].map((_, i) => (
          <Text>{i}</Text>
        ))}
      </ScrollView> */}
      <FlatList
        data={pets}
        renderItem={({ item }) => (
          <PetItem
            pet={item}
            isUsersPet={usr?.userId === item.userId}
          />
        )}
        keyExtractor={(item) => item.petId ?? ""}
        style={styles.container}
      />
    </SafeAreaView>
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
  image: {
    width: 240,
    height: 240,
  },
});
export default PetListingPage;
