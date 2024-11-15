import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import img from "./../../Images/Signup1.jpg";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseAsync("example.db");
import { SQLiteProvider } from "expo-sqlite";
import {
  ALLLoginUsers,
  Allusers,
  InsertLoginUsers,
  insertValues,
} from "../../Operations/operationscalls";
import { useNavigation } from "@react-navigation/native";
export default function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
  });
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      console.log(userData);
      if (
        userData.username &&
        userData.name &&
        userData.email &&
        userData.phone
      ) {
        const res = await InsertLoginUsers(
          userData.username,
          userData.name,
          userData.email,
          userData.phone
        );
        navigation.navigate("login");
      }
      else{
        Alert.alert("all feilds are reuired")
      }
      if (res) {
        navigation.navigate("login");
      } else {
        if (
          !userData.username ||
          !userData.name ||
          !userData.email ||
          !userData.phone
        ) {
          Alert.alert("all are reuqired");
        } else {
          Alert.alert("Some issue ");
        }
      }
    } catch (error) {}
  };

  const handleALlusers = async () => {
    try {
      const allRows = await insertValues();
      console.log(">>>GetAllUser", allRows);
      return allRows;
    } catch (error) {
      console.log("Error while loading students: ", error);
      return [];
    }
  };
  const handleALL = async () => {
    try {
      const res = await ALLLoginUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={img}
          resizeMode="cover"
          className="flex-1 justify-center"
        >
          <View className="bg-white mx-10 p-2 rounded-lg py-6 shadow-2xl px-5">
            <Text className="text-center text-[23px] mb-1 text-amber-800">
              Signup
            </Text>
            <View className="border-[0.7px] p-1 border-gray-400 mb-4 rounded-md">
              <TextInput
                placeholder="Enter username"
                value={userData.username}
                onChangeText={(text) =>
                  setUserData((prev) => ({
                    ...prev,
                    username: text,
                  }))
                }
              />
            </View>
            <View className="border-[0.7px] p-1 border-gray-400 mb-4 rounded-md">
              <TextInput
                placeholder="Enter fullname"
                value={userData.name}
                onChangeText={(text) =>
                  setUserData((prev) => ({
                    ...prev,
                    name: text,
                  }))
                }
              />
            </View>
            <View className="border-[0.7px] p-1 border-gray-400 mb-4 rounded-md">
              <TextInput
                placeholder="Enter email"
                value={userData.email}
                onChangeText={(text) =>
                  setUserData((prev) => ({
                    ...prev,
                    email: text,
                  }))
                }
              />
            </View>
            <View className="border-[0.7px] p-1 border-gray-400 mb-4 rounded-md">
              <TextInput
                placeholder="Enter phonenumber"
                keyboardType="numeric"
                maxLength={10}
                value={userData.phone}
                onChangeText={(text) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: text,
                  }))
                }
              />
            </View>
            <View className="mx-7 ">
              <Button title="Sumbit" color={"orange"} onPress={handleSubmit} />
            </View>
            <View className="text-center flex justify-center items-center gap-x-1 flex-row mt-3">
              <Text>Already have account ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text className="text-orange-500 font-bold text-[17px]">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
