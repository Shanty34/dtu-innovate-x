import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import Header from "../components/UI/Header";
import Cards from "../components/UI/Cards";
import WalleConnect from "../components/WalletConnect/WalletConnect";
import {HomeCard, ReferAndEarn} from "../components/UI/HomeCard";

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
      <ScrollView style={{maxWidth:400}}>
      {/* <WalleConnect/> */}
      <Text style={{fontSize:20, fontWeight:"bold", paddingTop:20, color:"#fff"}}>Offers you would love</Text>
      <ScrollView horizontal style={{ maxHeight: 320}}>
        <HomeCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXHTU5gNhKRkt9PmAzH_zDYkYmauPU9v1yQ&s"} title={"Open AI Credits worth $15"}  coins={15}/>
        <HomeCard imageUrl={"https://img.freepik.com/free-vector/computer-data-protection-laptop-with-shield-data-safety-isometric-icon_39422-667.jpg?ga=GA1.1.711873067.1721483773&semt=sph"} title={"86% off + 3 months free NORD VPN"} description={"Keep Privacy Safe & Sound"} coins={5}/>
  
      </ScrollView>
      {/* <Text style={{fontSize:20, fontWeight:"bold", color:"#fff"}}>Daily Rewards</Text> */}
      <HomeCard imageUrl={"https://uploads-ssl.webflow.com/5edd8e1d77a7c53d4e3a6a46/64223566e7834d20db3850b5_prizes.iosmol.png"} title={"Daily Tech Rewards"} description={"Try your luck win rewards from 0.1 to 1000 levelcoins"}/>
      <ReferAndEarn bg_color="#ffffff" title={"Invite a friend,\nGet 5 levelcoins"} />
      <HomeCard imageUrl={"https://img.freepik.com/free-vector/detailed-point-exchange-illustration_23-2148879609.jpg?ga=GA1.1.711873067.1721483773&semt=sph"} title={"Claim daily Level coins"} description={"Try your luck win rewards from 0.1 to 1000 levelcoins"}/>
      <View style={{marginBottom:50}}></View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
