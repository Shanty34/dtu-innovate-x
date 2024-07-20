import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Register/Input";
import Button from "../components/UI/Button";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function registerHandler() {
    // Collecting form information
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    // Sending POST Request to Register a new user
    axios
      .post("http://192.168.1.7:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );

        // Resetting input
        setName("");
        setImage("");
        setEmail("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "Something went wrong",
          "There is an error while registering"
        );
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
            Sign Up
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Create a New Account
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Input
            title="Name"
            placeholder="Enter your name"
            stateManager={setName}
            value={name}
          />
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
          <Input
            title="Image"
            placeholder="Enter your image"
            stateManager={setImage}
            value={image}
          />
          <Button onPress={registerHandler}>Register</Button>
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
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.replace("LoginScreen")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A55A2",
                }}
              >
                Sign-in
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
