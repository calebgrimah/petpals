import React, { FunctionComponent } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import HomeView from "./home_view";
import PetListingPage from "../../pets/view/pets_page";
import AppointmentsPage from "../../bookings/views/pet_booking";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppStackPageList } from "../../user";

interface HomeProps {}

const Tab = createMaterialBottomTabNavigator<AppStackPageList>();

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyPets"
        component={HomeView}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PetPage"
        component={PetListingPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="paw" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={AppointmentsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" color={color} size={26} />
          ),    
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
