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
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSend = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("userName", username);
      formData.append("fullName", name);
      formData.append("password", password);
      formData.append("avatar", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });

      //if the message type id image or a normal text

      const response = await axios.post(
        "http://192.168.13.45:8000/api/v1/users/register",
        formData
      );

      if (response.status === 201) {
        Alert.alert("Register Done");
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
            title="Username"
            placeholder="Enter a username"
            stateManager={setUsername}
            value={username}
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
          <Button onPress={pickImage}>Select Avatar</Button>
          <Button onPress={handleSend}>Register</Button>
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
