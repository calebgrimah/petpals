import { object, string, number, date, bool } from "yup";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export interface UserState {
  user: User | null;
  signUpStatus: UserAuthStatus;
  signInStatus: UserAuthStatus;
  appLoadCachedUserStatus: CachedUserFetchStatus
}

export type User = {
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
};

export type CreateUserRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type LoginUserRequestPayload = {
  email: string;
  password: string;
};

export const createUserSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  password: string()
    .required()
    .min(9, "Password must be at least 9 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  email: string().email().required(),
});
export const loginUserSchema = object({
  password: string()
    .required()
    .min(9, "Password must be at least 9 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
  email: string().email().required(),
});

export enum UserAuthStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum CachedUserFetchStatus {
  IDLE = "IDLE",
  FETCHING_USER = "LOADING",
  COMPLETE = "SUCCESS",
}

export type AppStackPageList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  MyPets: undefined;
  PetPage: undefined;
  PetDetailPage: undefined;
  Booking: undefined;
  BookingDetail: undefined;
  // Details: { itemId: number };
};


interface SignInPageProps {}

export type SignInScreenNavigationProp = NativeStackNavigationProp<AppStackPageList, 'SignIn'>;
export type SignInScreenRouteProp = RouteProp<AppStackPageList, 'SignIn'>;

export type HomeViewNavigationProp = NativeStackNavigationProp<AppStackPageList, 'MyPets'>;
export type HomeViewRouteProp = RouteProp<AppStackPageList, 'MyPets'>;

export type SignUpScreenNavigationProp = NativeStackNavigationProp<AppStackPageList, 'SignUp'>;
export type SignUpScreenRouteProp = RouteProp<AppStackPageList, 'SignUp'>;
