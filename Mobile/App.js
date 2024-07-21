import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import RewardsScreen from "./screens/RewardsScreen";
import StoreScreen from "./screens/StoreScreen";
import CommunityScreen from "./screens/CommunityScreen";
import { AppProvider } from './context/UserContext.js';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarLabel: "Home",
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="home"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerShown: false,

          tabBarLabel: "Store",
          tabBarIcon: (props) => (
            <Ionicons name="bag-handle" color={props.color} size={props.size} />
          ),
        }}
      />
      <Tab.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{
          headerShown: false,

          tabBarLabel: "Rewards",
          tabBarIcon: (props) => (
            <Ionicons name="gift" color={props.color} size={props.size} />
          ),
        }}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          headerShown: false,

          tabBarLabel: "Community",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="groups"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{
              title: "Select Your Interest",
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: "My Profile",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </AppProvider>
    </>
  );
}
