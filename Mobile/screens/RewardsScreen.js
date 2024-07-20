import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import Header from "../components/UI/Header";
import Cards from "../components/UI/Cards";
const RewardsScreen = () => {
  return (
    <ImageBackground
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
      source={require("../assets/backgroundGradient.png")}
    >
      <Header />
      <ScrollView>
        <Cards />
        <Cards />
      </ScrollView>
    </ImageBackground>
  );
};

export default RewardsScreen;
