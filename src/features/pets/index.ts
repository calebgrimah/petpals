import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackPageList } from "../user";
import { array, number, object, string } from "yup";

export interface PetSliceState {
  selectedPet: Pet | null;
  pets: Pet[];
  createPetUIStatus: CreatePetUIStatus;
  fetchPetUIStatus: CreatePetUIStatus;
}

export type Pet = {
  petId?: string;
  userId?: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  species: string;
  description: string;
  traits: string;
  aggressionLevel: number;
  rating: number;
  images: string[];
  isAvailable: boolean;
};

export type CreatePetRequestPayload = {
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  species: string;
  description: string;
  traits: string;
  aggressionLevel: number;
};

export const createPetRequestSchema = object({
    name: string().required(),
    description: string().required(),
    breed: string().required(),
    color: string().required(),
    age: number().required(),
    weight: number().required(),
    species: string().required(),
    traits: string().required(),
    aggressionLevel: number().required(),
  });

export enum CreatePetUIStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type PetDetailScreenNavigationProp = NativeStackNavigationProp<
  AppStackPageList,
  "PetDetailPage"
>;
export type PetDetailScreenRouteProp = RouteProp<
  AppStackPageList,
  "PetDetailPage"
>;

export type PetScreenNavigationProp = NativeStackNavigationProp<
  AppStackPageList,
  "PetPage"
>;
export type PetScreenRouteProp = RouteProp<AppStackPageList, "PetPage">;
