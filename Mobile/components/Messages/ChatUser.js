import { View, Text, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../store/UserContext";
import axios from "axios";

const ChatUser = ({ item }) => {
  const navigation = useNavigation();
  const { userID, setUserId } = useContext(UserContext);
  const [conversation, setConversation] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  useLayoutEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(
          `http://192.168.1.7:8000/messages/${userID}/${item._id}`
        );

        if (response.data.success) {
          setConversation(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  }, [lastMessage, item]);

  useEffect(() => {
    function getLastMessage() {
      const userMessages = conversation.filter(
        (msg) => msg.messageType === "text"
      );
      return userMessages[userMessages.length - 1];
    }
    const last = getLastMessage();
    setLastMessage(last);
  }, [conversation, item, lastMessage]);

  function formatTime(time) {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  }
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        gap: 10,
        borderBottomWidth: 0.7,
        padding: 10,

        borderColor: "#D0D0D0",
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate("DMScreen", { target: item._id })}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          resizeMode: "cover",
        }}
        source={{ uri: item?.image }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        <Text style={{ color: "gray", marginTop: 3, fontWeight: "500" }}>
          {lastMessage?.message}
        </Text>
      </View>
      <View>
        <Text style={{ fontWeight: "400", fontSize: 12, color: "#585858" }}>
          {lastMessage && formatTime(lastMessage.timeStamp)}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatUser;
