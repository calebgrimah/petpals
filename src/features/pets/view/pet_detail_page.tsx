import { FunctionComponent, useEffect, useState } from "react";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Image, LogBox } from "react-native";
import React from "react";
import {
  CreatePetRequestPayload,
  CreatePetUIStatus,
  PetDetailScreenNavigationProp,
  PetDetailScreenRouteProp,
  createPetRequestSchema,
} from "..";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View } from "react-native";
import { UserAuthStatus } from "../../user";
import { createPet, currentCreatePetUIState } from "../slice/pets_slice";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { ScrollView } from "react-native-gesture-handler";

const PetDetailPage: React.FC<{
  navigation: PetDetailScreenNavigationProp;
  route: PetDetailScreenRouteProp;
}> = () => {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerSuccessResult>();

  const createPetStatus = useAppSelector(currentCreatePetUIState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    requestFilesPermission();
  }, []);

  async function requestFilesPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setVisible(true);
      // alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePetRequestPayload>({
    resolver: yupResolver(createPetRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      age: 0,
      weight: 0,
      traits: "",
      color: "",
      species: "",
      aggressionLevel: 0,
      breed: "",
    },
  });

  const onSubmit = (petPayload: CreatePetRequestPayload) => {
    if (selectedImage === null || selectedImage === undefined) {
      setVisible(true);
      return;
    }
    const imageUris = selectedImage?.assets.map((img) => img.uri);
    dispatch(createPet(petPayload, imageUris));
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result);
    } else {
      // alert('You did not select any image.');
      setVisible(true);
    }
  };

  return (
    <ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        Pick an Image
      </Snackbar>
      <Image source={{ uri: selectedImage?.assets[0].uri }} style={{ width: 250, height: 250 }} />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => {
          pickImageAsync();
        }}
      >
        Select Image
      </Button>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Pet name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={[{ color: "red" }]}>{errors?.name.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Brief Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && (
          <Text style={[{ color: "red" }]}>{errors?.description.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              keyboardType="numeric"
            />
          )}
          name="age"
        />
        {errors.age && (
          <Text style={[{ color: "red" }]}>{errors?.age.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Breed"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="breed"
        />
        {errors.breed && (
          <Text style={[{ color: "red" }]}>{errors?.breed.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Color"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="color"
        />
        {errors.color && (
          <Text style={[{ color: "red" }]}>{errors?.color.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Weight"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
            />
          )}
          name="weight"
        />
        {errors.weight && (
          <Text style={[{ color: "red" }]}>{errors?.weight.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Specie"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="species"
        />
        {errors.species && (
          <Text style={[{ color: "red" }]}>{errors?.species.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Agression Level"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
            />
          )}
          name="aggressionLevel"
        />
        {errors.aggressionLevel && (
          <Text style={[{ color: "red" }]}>
            {errors?.aggressionLevel.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Traits"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
            />
          )}
          name="traits"
        />
        {errors.traits && (
          <Text style={[{ color: "red" }]}>{errors?.traits.message}</Text>
        )}
        <Button
          mode="contained-tonal"
          onPress={handleSubmit(onSubmit)}
          loading={createPetStatus === CreatePetUIStatus.LOADING}
          disabled={createPetStatus === CreatePetUIStatus.LOADING}
        >
          Create Pet
        </Button>
        {/* <Button
          icon="face-man-profile"
          mode="text"
          onPress={() => {
            navigation.replace("SignIn");
          }}
        >
          Already have an account?
        </Button> */}
      </View>
    </ScrollView>
  );
};

export default PetDetailPage;
