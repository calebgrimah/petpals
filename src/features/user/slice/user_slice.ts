import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../store/store";
import {
  CachedUserFetchStatus,
  CreateUserRequestPayload,
  User,
  UserAuthStatus,
  UserState,
} from "..";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseDb } from "../../../config/firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";

const initialState: UserState = {
  user: null,
  signInStatus: UserAuthStatus.IDLE,
  signUpStatus: UserAuthStatus.IDLE,
  appLoadCachedUserStatus: CachedUserFetchStatus.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateSignUpStatus: (state, action: PayloadAction<UserAuthStatus>) => {
      state.signUpStatus = action.payload;
    },
    updateSignInStatus: (state, action: PayloadAction<UserAuthStatus>) => {
      state.signInStatus = action.payload;
    },    
    updateCachedUserFetchStatus: (state, action: PayloadAction<CachedUserFetchStatus>) => {
      state.appLoadCachedUserStatus = action.payload;
    },
  },
});

export const { setUser, updateSignInStatus, updateSignUpStatus, updateCachedUserFetchStatus } =
  userSlice.actions;

export const registerUser =
  (createUserPayload: CreateUserRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    dispatch(updateSignUpStatus(UserAuthStatus.LOADING));
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        createUserPayload.email,
        createUserPayload.password
      );
      const appUser: User = {
        userId: response.user.uid,
        firstName: createUserPayload.firstName,
        lastName: createUserPayload.lastName,
        email: createUserPayload.email,
      };
      await setDoc(doc(firebaseDb, "users", appUser.userId ?? ""), appUser);
      dispatch(setUser(appUser));
      dispatch(updateSignUpStatus(UserAuthStatus.SUCCESS));
    } catch (error) {
      console.log("failed to create user =>", error);
      dispatch(updateSignUpStatus(UserAuthStatus.ERROR));
    }
  };

export const loginUser =
  (email: string, password: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(updateSignInStatus(UserAuthStatus.LOADING));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        //retrieve user using uid
        const appUser = await getFirebaseUser(userCredential.user.uid);
        if (appUser) {
          dispatch(setUser(appUser));
          dispatch(updateSignInStatus(UserAuthStatus.SUCCESS));
        } else {
          console.log("failed to login user =>", "user does not exist !");
          dispatch(updateSignInStatus(UserAuthStatus.ERROR));
        }
      } else {
        console.log("failed to login user =>", "no user with credentials");
        dispatch(updateSignInStatus(UserAuthStatus.ERROR));
      }
    } catch (error) {
      console.log("failed to login user =>", error);
      dispatch(updateSignInStatus(UserAuthStatus.ERROR));
    }
  };

export async function getFirebaseUser(userId: string): Promise<User | null> {
  const docRef = doc(firebaseDb, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const fbDoc = docSnap.data();
    const appUser: User = {
      userId: fbDoc["userId"],
      firstName: fbDoc["firstName"],
      lastName: fbDoc["lastName"],
      email: fbDoc["email"],
    };
    return appUser;
  } else {
    return null;
  }
}

export const logoutUser = (): AppThunk => async (dispatch, getState) => {
  signOut(auth).then(() => {
    dispatch(setUser(null))
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const currentSignInStatus = (state: RootState) =>
  state.user.signInStatus;
export const currentUser = (state: RootState) => state.user.user;
export const currentUserAppLoadCacheStatus = (state: RootState) => state.user.appLoadCachedUserStatus;
export const currentSignUpStatus = (state: RootState) =>
  state.user.signUpStatus;

export default userSlice.reducer;
