import { Pressable, Text, View } from "react-native";
import React from "react";

const Button = ({ children, onPress }) => {
  return (
    <View
      style={{
        borderRadius: 6,
        marginTop: 70,
        width: 200,
        backgroundColor: "#4A55A2",
        marginHorizontal: "auto",
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          padding: 15,
        }}
        android_ripple={{ color: "#292e57" }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
