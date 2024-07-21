import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import axios from "axios"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../context/UserContext";

const ProfileScreen = () => {
  const [profileData,setprofileData]=useState()
  const [rewardHistory,setrewardHistory]=useState()
  const [TransactionHistory,setTransactionHistory]=useState()
  const {token}=useAppContext()
  useEffect(()=>{
    async function fetchProfileData(){
      const atoken=await AsyncStorage.getItem("accessToken")

      await axios.get(`http://192.168.106.82:8000/api/v1/users/current-user`,{
        headers:{
          Authorization: `Bearer ${atoken}`
        }
      })
      .then((res)=>{
        setprofileData(res.data.data)
      })
      .catch((err)=>{
        console.log("Profile_Error:",err)
      })
    }
    fetchProfileData();
  },[])

  async function getRewardHistory(){
    const token=await AsyncStorage.getItem('accessToken')
    axios.get(`http://192.168.106.82:8000/api/v1/reward/reward-history`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      setrewardHistory(res.data.data)
    })
    .catch((err)=>{
      console.log("Reward_Error:",err)
    })
  }
  async function getTransactionHistory(){
    const token=await AsyncStorage.getItem('accessToken')
    axios.get(`http://192.168.106.82:8000/api/v1/reward/all-transactions`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      setTransactionHistory(res.data.data)
    })
    .catch((err)=>{
      console.log("Reward_Error:",err)
    })
  }
  
  return (
    <View>
      {profileData &&(
        <View>
        <Text>@{profileData.username}</Text>
        <Text>{profileData.fullname}</Text>
        <Image style={{width:50,height:50,borderRadius:50}} source={{uri:profileData.avatar}}/>
        <Text>LevelCoins: ${profileData.coins}</Text>
        <Button onPress={getRewardHistory}>Reward History</Button>
        <Button onPress={getTransactionHistory}>Transaction History</Button>
        </View>
      )}
      {rewardHistory&&rewardHistory.map(data=>{
        return(
          <View key={data._id}>
            {/* <Text>{data.completed==true?"Completed":"Ongoing"}</Text> */}
            <Text>{data.title}</Text>
          <Image style={{width:50,height:50,borderRadius:50}} source={{uri:data.image}}/>
            <Text>{data.coins}</Text>
          </View>
        )
      })}
      {TransactionHistory&&TransactionHistory.map(data=>{
        return(
          <View key={data._id}>
            <Text>{data.transaction_title}</Text>
            <Text>{data.trans_coin}</Text>
          </View>
        )
      })}
    </View>
  );
};

export default ProfileScreen;
