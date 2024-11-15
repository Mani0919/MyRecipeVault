import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./App/Screens/auth/SignUp";
import img from "../CRUDoperations/App/Images/Signup1.jpg";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  ALLLoginUsers,
  Allusers,
  createEntries,
} from "./App/Operations/operationscalls";
import Login from "./App/Screens/auth/Login";
import Home from "./App/Screens/main/Home";
import Create from "./App/Screens/main/Create";
import SingleProduct from "./App/Screens/main/SingleProduct";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();
export default function App1() {
  useEffect(() => {
    async function fun() {
      try {
        await createEntries();
      } catch (error) {
        console.log("Getting error");
      }
    }
    fun();
  }, []);
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("./App/assests/fonts/Poppins-Bold.ttf"),
    "SourGummy-Bold": require("./App/assests/fonts/SourGummy-Bold.ttf"),
    "EduAUVICWANTPre-Medium": require("./App/assests/fonts/EduAUVICWANTPre-Medium.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="single" component={SingleProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
