import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import fs from "fs";
import { Pet } from "..";
import { firebaseDb, firebaseStorage } from "../../../config/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//create pet
//provide name,traits, description, color, image
import uuid from "react-native-uuid";

export async function uploadImages(images: string[]): Promise<string[]> {
  const downloadURLs: string[] = [];
  await Promise.all(
    images.map(async (image) => {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const fileRef = ref(getStorage(), uuid.v4().toString());
      const result = await uploadBytes(fileRef, blob);

      // We're done with the blob, close and release it
      //   blob.close;

      const dUrl = await getDownloadURL(fileRef);
      downloadURLs.push(dUrl);
    })
  );

  return downloadURLs;
}

export async function createPetOnFirebase(pet: Pet): Promise<void> {
  try {
    const petRef = await addDoc(collection(firebaseDb, "pets"), pet);
    const petId = petRef.id;
    await updateDoc(petRef, {
      petId,
      traits: pet.traits,
    });
    console.log("Pet created successfully!");
  } catch (error) {
    console.error("Error creating pet:", error);
  }
}

//delete pet
export async function deletePet(petId: string): Promise<void> {
  try {
    await deleteDoc(doc(firebaseDb, "pets", petId));

    console.log("Pet deleted successfully!");
  } catch (error) {
    console.error("Error deleting pet:", error);
  }
}

//fetch all pets
export async function fetchAllPets(): Promise<Pet[]> {
  try {
    const petQuerySnapshot = await getDocs(collection(firebaseDb, "pets"));

    // Extract pet data from query snapshot
    const pets: Pet[] = [];
    petQuerySnapshot.forEach((doc) => {
      pets.push(doc.data() as Pet);
    });
    return pets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return [];
  }
}

//update single pet
export async function updatePet(
  petId: string,
  updatedPetData: Partial<Pet>
): Promise<void> {
  try {
    const petRef = doc(firebaseDb, "pets", petId);
    await updateDoc(petRef, updatedPetData);
    console.log("Pet updated successfully!");
  } catch (error) {
    console.error("Error updating pet:", error);
  }
}
