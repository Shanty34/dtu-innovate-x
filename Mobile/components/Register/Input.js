import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({ title, placeholder, value, stateManager, isSecure }) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "white",
        }}
      >
        {title}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#bebebe"}
        style={{
          fontSize: value ? 18 : 18,
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 5,
          width: 300,
          height: 40,
          color: "#bebebe",
        }}
        value={value}
        onChangeText={(text) => stateManager(text)}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export default Input;
