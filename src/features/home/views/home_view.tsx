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
  Image,
} from "react-native";
import { ActivityIndicator, AnimatedFAB } from "react-native-paper";
import {
  AppStackPageList,
  HomeViewNavigationProp,
  HomeViewRouteProp,
} from "../../user";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  currentUser,
  currentUserAppLoadCacheStatus,
} from "../../user/slice/user_slice";
import {
  fetchUserPets,
  currentFetchedPets,
  currentFetchPetsUIState,
} from "../../pets/slice/pets_slice";
import PetItem from "../../pets/view/pet_item";
import {
  PetScreenNavigationProp,
  PetScreenRouteProp,
  CreatePetUIStatus,
} from "../../pets";

const HomeView: React.FC<{
  navigation: HomeViewNavigationProp;
  route: HomeViewRouteProp;
}> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(fetchUserPets());
    });

    return unsubscribe;
  }, [navigation]);

  const dispatch = useAppDispatch();
  const pets = useAppSelector(currentFetchedPets);
  const fetchPetsUIStatus = useAppSelector(currentFetchPetsUIState);
  const cacheUserFetchState = useAppSelector(currentUserAppLoadCacheStatus);

  if (fetchPetsUIStatus === CreatePetUIStatus.ERROR) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("assets/no-data.gif")}
            width={240}
            height={240}
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
      <FlatList
        data={pets}
        renderItem={({ item }) => <PetItem pet={item} isUsersPet={true} />}
        keyExtractor={(item) => item.petId ?? ""}
        style={styles.container}
      />
      <AnimatedFAB
        icon={"plus"}
        label={"Add Pet"}
        extended={false}
        onPress={() => {
          navigation.navigate("PetDetailPage");
        }}
        visible={true}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle]}
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
export default HomeView;
