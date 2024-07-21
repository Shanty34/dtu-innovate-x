import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAppContext } from "../../context/UserContext";
const Header = () => {
  const navigation = useNavigation();
  const {coin, setCoin}=useAppContext()
  useEffect(()=>{
    async function getCurrentCoin(){
      const token=await AsyncStorage.getItem('accessToken')
      await axios.get(`http://192.168.106.82:8000/api/v1/users/current-user`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data.data.coins)
        setCoin(res.data.data.coins)
      })
      .catch((err)=>{
        console.log("Profile_Error:",err)
      })
    }
    getCurrentCoin();
  },[coin])
  return (
    <View
      style={{
        height: 60,
        // backgroundColor: "#ffffff38",
        width: "100%",
        height: 110,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginLeft: 20,
            marginTop: 50,
          }}
          source={{
            uri: "https://img.freepik.com/premium-psd/designer-meta-people-3d-avatar_698091-340.jpg",
          }}
        />
      </Pressable>
      {/* <Text
        style={{
          marginTop: 50,
          marginLeft: 25,
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Level Coin
      </Text> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <AntDesign
          name="pay-circle1"
          size={20}
          color="gold"
          style={{ marginTop: 50, marginRight: 10 }}
        />

        <Text
          style={{
            marginRight: 20,
            marginTop: 50,
            fontSize: 18,
            backgroundColor: "#38383885",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 20,
            overflow: "hidden",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {coin}
        </Text>
      </View>
    </View>
  );
};

export default Header;
