import { View, Text, Pressable, Image, } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import Home_btn from "./Home_btn";

const HomeCard = ({ onPress, imageUrl, title,bg_color,coins, description, isSelected }) => {
  
  return (
    <View
      style={{
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 30,
        borderColor: isSelected ? "#1a85ffff" : "black",
        borderWidth: 0,
        marginHorizontal: 10,
        minWidth: 300,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: bg_color? bg_color:"#ffffff97",
          }}
        >
          <Image
            style={{
              width: 410,
              height: 150,
            }}
            source={{
              uri: imageUrl,
            }}
          />
          <View
            style={{
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {title}
            </Text>
            {coins&&<Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {coins} LevelCoins
            </Text>}
            <Text
              style={{
                color: "black",
                fontSize: 12,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const ReferAndEarn = ({ onPress, imageUrl, title,bg_color,coins, description, isSelected }) => {
  
  return (
    <View
      style={{
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 30,
        borderColor: isSelected ? "#1a85ffff" : "black",
        borderWidth: 0,
        marginHorizontal: 10,
        minWidth: 300,
        maxHeight:100
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: bg_color? bg_color:"#ffffff97",
          }}
        >
          <View
            style={{
              display:"flex",
              flexDirection: "row",
              justifyContent:"center",
              alignItems:"center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "left",
                marginTop: 5,
                flex:1
              }}
            >
              {title}
            </Text>
            <Home_btn>Get 5L now</Home_btn>
            {coins&&<Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {coins} LevelCoins
            </Text>}
            <Text
              style={{
                color: "black",
                fontSize: 12,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {description}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export {
  HomeCard,
  ReferAndEarn
}