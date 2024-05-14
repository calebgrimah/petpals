import {
  CreatePetRequestPayload,
  CreatePetUIStatus,
  Pet,
  PetSliceState,
} from "../index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../store/store";
import {
  createPetOnFirebase,
  fetchAllPets,
  uploadImages,
} from "../service/pets_service";

const initialState: PetSliceState = {
  selectedPet: null,
  pets: [],
  createPetUIStatus: CreatePetUIStatus.IDLE,
  fetchPetUIStatus: CreatePetUIStatus.IDLE,
};

export const petSlice = createSlice({
  name: "pets-slice",
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<Pet | null>) => {
      state.selectedPet = action.payload;
    },
    updateCreatePetStatus: (
      state,
      action: PayloadAction<CreatePetUIStatus>
    ) => {
      state.createPetUIStatus = action.payload;
    },
    updateFetchPetStatus: (state, action: PayloadAction<CreatePetUIStatus>) => {
      state.fetchPetUIStatus = action.payload;
    },
    updatePets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
  },
});

export const {
  setSelectedPet,
  updateCreatePetStatus,
  updateFetchPetStatus,
  updatePets,
} = petSlice.actions;

export const createPet =
  (creatPetPayload: CreatePetRequestPayload, imageURI: string[]): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(updateCreatePetStatus(CreatePetUIStatus.LOADING));
      const storageUris = await uploadImages(imageURI);
      const newPet: Pet = {
        name: creatPetPayload.name,
        age: creatPetPayload.age,
        breed: creatPetPayload.breed,
        color: creatPetPayload.color,
        weight: creatPetPayload.weight,
        species: creatPetPayload.species,
        description: creatPetPayload.description,
        traits: creatPetPayload.traits,
        aggressionLevel: creatPetPayload.aggressionLevel,
        rating: 0,
        images: storageUris,
        isAvailable: true,
        userId: getState().user.user?.userId ?? "",
      };
      await createPetOnFirebase(newPet);
      dispatch(setSelectedPet(newPet)); //review
      alert("Pet Created Successfully.");
      dispatch(fetchAllUploadedPets());
      dispatch(updateCreatePetStatus(CreatePetUIStatus.SUCCESS));
    } catch (error) {
      console.log("error creating pets ->", error);
      dispatch(updateCreatePetStatus(CreatePetUIStatus.ERROR));
    }
  };

export const fetchAllUploadedPets =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(updateFetchPetStatus(CreatePetUIStatus.LOADING));
      const pets = await fetchAllPets();
      dispatch(updatePets(pets));
      if (pets.length === 0) {
        dispatch(updateFetchPetStatus(CreatePetUIStatus.ERROR));
      } else {
        dispatch(updateFetchPetStatus(CreatePetUIStatus.SUCCESS));
      }
    } catch (error) {
      console.log("error fetching pets ->", error);
      dispatch(updateFetchPetStatus(CreatePetUIStatus.ERROR));
    }
  };

export const fetchUserPets = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updateFetchPetStatus(CreatePetUIStatus.LOADING));
    const uid = getState().user.user?.userId;
    const pets = await fetchAllPets();
    const userPets = pets.filter((p) => p.userId === uid)
    dispatch(updatePets(userPets));
    if (userPets.length === 0) {
      dispatch(updateFetchPetStatus(CreatePetUIStatus.ERROR));
    } else {
      dispatch(updateFetchPetStatus(CreatePetUIStatus.SUCCESS));
    }
  } catch (error) {
    console.log("error fetching pets ->", error);
    dispatch(updateFetchPetStatus(CreatePetUIStatus.ERROR));
  }
};

export const currentFetchedPets = (state: RootState) => state.pet.pets;
export const currentFetchPetsUIState = (state: RootState) =>
  state.pet.fetchPetUIStatus;
export const currentCreatePetUIState = (state: RootState) =>
  state.pet.createPetUIStatus;
export const currentSelectedPet = (state: RootState) => state.pet.selectedPet;

export default petSlice.reducer;
