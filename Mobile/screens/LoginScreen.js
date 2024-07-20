import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Register/Input";
import Button from "../components/UI/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        navigation.replace("HomeScreen");
      }
    }
    checkToken();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.1.7:8000/login", user)
      .then((response) => {
        const token = response.data.token;

        //Storing token to device
        AsyncStorage.setItem("authToken", token).then(() =>
          navigation.replace("HomeScreen")
        );

        //Navigating to Home Screen
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Login error", "Invalid Email or Password");
      });
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView behavior="position">
        <View
          style={{
            marginTop: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#4A55A2",
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Sign-in to Your Account
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Input
            title="Email"
            placeholder="Enter your email"
            stateManager={setEmail}
            value={email}
          />
          <Input
            title="Password"
            placeholder="Enter your password"
            stateManager={setPassword}
            value={password}
            isSecure={true}
          />
          <Button onPress={loginHandler}>Login</Button>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 16,
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.replace("RegisterScreen")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A55A2",
                }}
              >
                Sign-up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
