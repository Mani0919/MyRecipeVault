import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ALLLoginUsers,
  checkUserExists,
  InsertLoginUsers,
} from "../../Operations/operationscalls";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      //   const all = await ALLLoginUsers();
      const res = await checkUserExists(userData.username, userData.email);
      if (res) {
        console.log("res",res)
        console.log("Success");
        navigation.navigate("home");
      } else {
        console.log("fail");
        if (!userData.username && !userData.email) {
          Alert.alert("username,email required");
        } else if (!userData.username) {
          Alert.alert("username required");
        } else if (!userData.email) {
          Alert.alert("email required");
        } else {
          Alert.alert("No User Found");
        }
      }
      //   console.log("all", all);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <View className="bg-white mx-10 p-2  rounded-lg py-10 shadow-2xl px-5 ">
        <Text className="text-center text-[23px] mb-1 text-amber-800">
          Login
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
        <View className="mx-7 ">
          <Button title="Sumbit" color={"orange"} onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}
