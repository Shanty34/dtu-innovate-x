import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import Header from "../components/UI/Header";
import Cards from "../components/UI/Cards";
import WalleConnect from "../components/WalletConnect/WalletConnect";

const HomeScreen = () => {
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
      {/* <WalleConnect/> */}
      <ScrollView horizontal style={{ maxHeight: 300 }}>
        <Cards />
        <Cards />
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
