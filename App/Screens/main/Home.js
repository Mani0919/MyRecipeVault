import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { AllProducts } from "../../Operations/operationscalls";

export default function Home() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    async function fun() {
      try {
        const res = await AllProducts();
        console.log("res", res);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, [refreshData]);
  const refresh = () => {
    setRefreshData(prev => !prev); // Toggling refreshData triggers useEffect
  };
  return (
    <ScrollView className="relative mt-16" contentContainerStyle={{ flexGrow: 1 }}>
    <View className="flex flex-row justify-between w-full px-3">
      <TouchableOpacity className="bg-blue-600 p-2 px-10 rounded-md" onPress={refresh}>
        <Text className="text-white text-[20px]">Refresh Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-600 p-2 w-44 px-5 rounded-md  flex flex-row items-center gap-x-1"
        onPress={() => {
          navigation.navigate("Create");
          console.log("touch");
        }}
      >
        <AntDesign name="plus" size={20} color="white" />
        <Text className="text-white text-[20px]">Create Recipe</Text>
      </TouchableOpacity>
    </View>
  
    <View>
      <View className="mt-5 p-2 flex-wrap items-center flex-row justify-between">
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="bg-blue-400 w-44 rounded-md mb-3"
              onPress={()=>navigation.navigate("single",{
                id:item.id
              })}
            >
              <Image source={{ uri: item.image }} className="w-full h-44" />
              <Text className="pl-2 text-[23px] font-bold pt-2">{item.name}</Text>
              <Text className="pl-2 text-[18px] ">{item.description}</Text>
              <View className="flex flex-row px-2 gap-x-[0.6px]">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <AntDesign key={index} name="star" size={24} color="gold" />
                ))}
              </View>
              <View className="flex flex-row items-center gap-x-1 p-1">
                <Text className="text-[20px] font-bold">Submitted By:</Text>
                <Text className="text-[16px]">{item.submitted_by}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  </ScrollView>
  
  );
}
