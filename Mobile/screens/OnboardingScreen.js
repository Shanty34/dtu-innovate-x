import {
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import Cards from "../components/UI/Cards";

const OnboardingScreen = ({ navigation }) => {
  const [active, setActive] = useState(null);
  const [showNext, setShowNext] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          showNext && (
            <View
              style={{
                marginRight: 10,
              }}
            >
              <Button
                title="Next"
                onPress={() => navigation.navigate("Tabs")}
              />
            </View>
          )
        );
      },
    });
  }, [confirmHandler]);

  function confirmHandler(txt) {
    active === txt ? setActive(null) : setActive(txt);
    setShowNext(!active);
  }
  return (
    <ImageBackground
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      source={require("../assets/backgroundGradient.png")}
    >
      <View>
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
        >
          {/* <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: "#1a85ffff",
              paddingVertical: 10,
            }}
          >
            Select your interest
          </Text> */}
        </View>
        <ScrollView>
          <Cards
            title="Technology"
            imageUrl="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309649.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721260800&semt=ais_user"
            description="Discover rewards that celebrate the forefront of innovation in the ever-evolving world of technology."
            onPress={() => confirmHandler("Tech")}
            isSelected={active === "Tech"}
          />
          <Cards
            title="Fashion"
            imageUrl="https://img.freepik.com/free-photo/fast-fashion-concept-with-full-clothing-store_23-2150871345.jpg?ga=GA1.1.711873067.1721483773&semt=sph"
            description="Explore the latest trends and styles with rewards that elevate your fashion game."
            onPress={() => confirmHandler("Fashion")}
            isSelected={active === "Fashion"}
          />
          <Cards
            title="Education"
            imageUrl="https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150063081.jpg?ga=GA1.1.711873067.1721483773&semt=sph"
            description="Unlock educational rewards that enhance learning experiences, bridging the gap between knowledge and achievement."
            onPress={() => confirmHandler("Education")}
            isSelected={active === "Education"}
          />
          <Cards
            title="Fitness"
            imageUrl="https://restoreintegrativemedical.com/wp-content/uploads/2024/06/post-workout-snack.jpg"
            description="Stay fit and healthy with rewards designed to support your fitness journey, from workouts to recovery."
            onPress={() => confirmHandler("Healthcare")}
            isSelected={active === "Healthcare"}
          />
          <Cards
            title="Food"
            imageUrl="https://img.freepik.com/free-photo/delicious-vietnamese-food-including-pho-ga-noodles-spring-rolls-white-table_181624-34062.jpg?ga=GA1.1.711873067.1721483773&semt=sph"
            description="Indulge in culinary delights with rewards that bring you closer to the flavors and experiences of diverse cuisines."
            onPress={() => confirmHandler("Food")}
            isSelected={active === "Food"}
          />
          <View
            style={{
              paddingBottom: 50,
            }}
          ></View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
