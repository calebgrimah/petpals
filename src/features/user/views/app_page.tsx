import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { Provider } from "react-redux";
import {
  Button,
  MD3LightTheme as DefaultTheme,
  MD2Colors,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { AppStackPageList, CachedUserFetchStatus } from "..";
import { auth } from "../../../config/firebaseConfig";
import AppointmentsPage from "../../bookings/views/pet_booking";
import Home from "../../home/views/home_page";
import PetListingPage from "../../pets/view/pets_page";
import {
  currentUser,
  currentUserAppLoadCacheStatus,
  getFirebaseUser,
  logoutUser,
  setUser,
  updateCachedUserFetchStatus,
} from "../slice/user_slice";
import SignInPage from "./sign_in_page";
import SignUpPage from "./sign_up_page";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PetDetailPage from "../../pets/view/pet_detail_page";

export const MainApp = () => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();
  const cachedUser = useAppSelector(currentUser);
  const cacheUserFetchState = useAppSelector(currentUserAppLoadCacheStatus);
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  useEffect(() => {
    dispatch(updateCachedUserFetchStatus(CachedUserFetchStatus.FETCHING_USER));
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (cachedUser) {
          dispatch(setUser(cachedUser));
        } else {
          const uid = user.uid;
          const cUser = await getFirebaseUser(uid);
          dispatch(setUser(cUser));
        }
        dispatch(updateCachedUserFetchStatus(CachedUserFetchStatus.COMPLETE));
      } else {
        dispatch(setUser(null));
        dispatch(updateCachedUserFetchStatus(CachedUserFetchStatus.COMPLETE));
      }
    });
  }, [cachedUser]);

  const getIsSignedIn = () => {
    return cachedUser !== null;
  };
  const isSignedIn = getIsSignedIn();
  const Stack = createNativeStackNavigator<AppStackPageList>();
  const defaultScreenOptions: NativeStackNavigationOptions = {
    presentation: "modal", // Set the presentation to modal
  };

  if (cacheUserFetchState === CachedUserFetchStatus.FETCHING_USER) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* content */}
      <NavigationContainer>
        {
          <PaperProvider theme={paperTheme}>
            {/* <Home/> */}
            <Stack.Navigator initialRouteName="Home">
              {isSignedIn ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation, route }) => ({
                      // Add a placeholder button without the `onPress` to avoid flicker
                      headerRight: () => (
                        <Button
                          icon="logout"
                          mode="text"
                          onPress={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </Button>
                      ),
                    })}
                  />
                  <Stack.Screen name="PetPage" component={PetListingPage} />
                  <Stack.Screen
                    name="PetDetailPage"
                    component={PetDetailPage}
                    options={defaultScreenOptions}
                  />
                  <Stack.Screen
                    name="BookingDetail"
                    component={AppointmentsPage}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="SignIn" component={SignInPage} />
                  <Stack.Screen name="SignUp" component={SignUpPage} />
                </>
              )}
              {/* <Stack.Screen name="Home" component={Home} /> */}
              {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
            </Stack.Navigator>
          </PaperProvider>
        }
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
