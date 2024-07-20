import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";

const Cards = ({ onPress, imageUrl, title, description, isSelected }) => {
  return (
    <View
      style={{
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 30,
        borderColor: isSelected ? "#1a85ffff" : "black",
        borderWidth: 3,
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
            backgroundColor: "#ffffff97",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 200,
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

export default Cards;
