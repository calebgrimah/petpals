import { FunctionComponent } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import {
  LoginUserRequestPayload,
  SignInScreenNavigationProp,
  SignInScreenRouteProp,
  UserAuthStatus,
  loginUserSchema,
} from "..";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { currentSignInStatus, loginUser } from "../slice/user_slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { View, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const SignInPage: React.FC<{
  navigation: SignInScreenNavigationProp;
  route: SignInScreenRouteProp;
}> = ({ navigation }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserRequestPayload>({
    resolver: yupResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loadingState = useAppSelector(currentSignInStatus);
  const dispatch = useAppDispatch();

  const onSubmit = (userPayload: LoginUserRequestPayload) => {
    dispatch(loginUser(userPayload.email, userPayload.password));
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
                placeholder="Email"
                onBlur={onBlur}
                mode="outlined"
                onChangeText={onChange}
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
                mode="outlined"
              secureTextEntry= {true}
                onBlur={onBlur}
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
            style={styles.input}
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}
            loading={loadingState === UserAuthStatus.LOADING}
            disabled={loadingState === UserAuthStatus.LOADING}
          >
            Login User
          </Button>
          <Button
            icon="face-man-profile"
            mode="text"
            onPress={() => {
              navigation.replace("SignUp");
            }}
          >
            Don't have an account?
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

export default SignInPage;
