import { FunctionComponent } from "react";
import { View } from "react-native";
import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet } from "react-native";

import {
  CreateUserRequestPayload,
  SignUpScreenNavigationProp,
  SignUpScreenRouteProp,
  UserAuthStatus,
  createUserSchema,
} from "..";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { currentSignUpStatus, registerUser } from "../slice/user_slice";
import { ScrollView } from "react-native-gesture-handler";

const SignUpPage: React.FC<{
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}> = ({ navigation }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserRequestPayload>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const loadingState = useAppSelector(currentSignUpStatus);
  const dispatch = useAppDispatch();

  const onSubmit = (userPayload: CreateUserRequestPayload) => {
    dispatch(registerUser(userPayload));
  };

  return (
    <ScrollView>
      <View>
      <View style={styles.imageRow}>
        <Image source={require("assets/icon.png")} style={styles.topImage} />
      </View>

      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              mode="outlined"
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text style={[{ color: "red" }]}>{errors?.firstName.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              mode="outlined"
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text style={[{ color: "red" }]}>{errors?.lastName.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              mode="outlined"
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={[{ color: "red" }]}>{errors?.email.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry= {true}
              onBlur={onBlur}
              mode="outlined"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={[{ color: "red" }]}>{errors?.password.message}</Text>
        )}
        <Button
          icon="face-man-profile"
          mode="contained-tonal"
          onPress={handleSubmit(onSubmit)}
          loading={loadingState === UserAuthStatus.LOADING}
          disabled={loadingState === UserAuthStatus.LOADING}
        >
          Create Account
        </Button>
        <Button
          icon="face-man-profile"
          mode="text"
          onPress={() => {
            navigation.replace("SignIn");
          }}
        >
          Already have an account?
        </Button>
      </View>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginTop: 16,
  },
  input: {
    marginBottom: 8,
  },
  imageRow: {
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
  },
  topImage: {
    width: 280,
    height: 280,
  },
});

export default SignUpPage;
