import { View, Text, ImageBackground, ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import Header from "../components/UI/Header";
import Cards from "../components/UI/Cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const RewardsScreen = () => {
  const [rewards,setRewards]=useState()
  useEffect(()=>{
    async function fetchRewardsByInterest(){
      const token=await AsyncStorage.getItem('accessToken')
      await axios.get(`http://192.168.13.82:8000/api/v1/reward/fetch-reward-interest`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        setRewards(res.data.data)
      })
      .catch((err)=>{
        console.log("Reward By Interest Error :",err)
      })
    }
    fetchRewardsByInterest();
  },[])

  async function postCompleteReward(data){
    const token=await AsyncStorage.getItem('accessToken')
    await axios.post(`http://192.168.13.82:8000/api/v1/reward/reward-completed`,
      {reward_id:data._id},
      {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res.data.data)
    })
    .catch((err)=>{
      console.log("Complete_Reward_Error :",err)
    })
  }
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
      <ScrollView>
       {rewards && rewards.map(data=>(
        <Cards onPress={(e)=>postCompleteReward(data)} key={data.id} title={data.title} bg_color={data.bg_color} description={data.description} imageUrl={data.image} />
       ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default RewardsScreen;
