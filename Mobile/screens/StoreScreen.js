import { View, Text, ImageBackground, ScrollView } from "react-native";
import React,{useState,useEffect} from "react";
import Header from "../components/UI/Header";
import Cards from "../components/UI/Cards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAppContext } from "../context/UserContext";
const RewardsScreen = () => {
  const {coin,setCoin}=useAppContext()
  const shop_card=[
    {
      _id:"12",
      title:"zomato",
      coins:5
    },
    {
      _id:"123",
      title:"zomato",
      coins:5
    },
    {
      title:"zomato",
      _id:"124",
      coins:5
    },
    {
      _id:"124",
      title:"zomato",
      coins:5
    },
    {
      title:"zomato",
      _id:"124",
      coins:5
    },
  ]
  const [postTrans,setpostTransaction]=useState()
    async function postTransaction(data){
      const token=await AsyncStorage.getItem('accessToken')
      await axios.post(`http://192.168.13.82:8000/api/v1/reward/post-transaction`,
        {
          trans_coin:data.coins,
          transaction_title:data.title
        },
        {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        setCoin(res.data.data.coin)

      })
      .catch((err)=>{
        console.log("Transaction_Error :",err)
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
       {shop_card && shop_card.map(data=>(
        <Cards onPress={(e)=>postTransaction(data)} key={data.id} coins={data.coins} title={data.title} />
       ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default RewardsScreen;
