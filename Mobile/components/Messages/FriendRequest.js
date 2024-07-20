import { Pressable, Image, View, Text } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../store/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const FriendRequest = ({ item, friendRequests, sentFriendRequests }) => {
  const { userID, setUserId } = useContext(UserContext);
  const navigation = useNavigation();
  async function acceptRequest(id) {
    try {
      const response = await axios.post(
        "http://192.168.1.7:8000/friend-request/accept",
        {
          currentUserID: userID,
          selectedUserID: id,
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        sentFriendRequests(friendRequests.filter((item) => item._id !== id));
        navigation.navigate("ChatScreen");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
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
      <Text
        style={{ fontSize: 13, fontWeight: "bold", flex: 1, marginLeft: 10 }}
      >
        {item?.name} sent you a friend request
      </Text>

      <Pressable
        style={{
          backgroundColor: "#0066b2",
          padding: 10,
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => acceptRequest(item._id)}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "semibold" }}>
          Accept
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;
