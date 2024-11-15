import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DeleteSingleProduct,
  DeleteSingleProducts,
  SingleProducts,
} from "../../Operations/operationscalls";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const SingleProduct = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function fun() {
      try {
        const res = await SingleProducts(id);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, [id]);
  const handleDelete = async (id) => {
    try {
      const res = await DeleteSingleProduct(id);
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      {data.map((item, index) => {
        return (
          <View
            key={index}
            className="p-3 bg-white mx-3 rounded relative"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4.84,
              elevation: 10,
            }}
          >
            <View className="flex flex-row justify-end p-2 gap-x-2">
              <FontAwesome name="edit" size={24} color="black" onPress={()=>navigation.navigate("Create",{
                id:item.id
              })}/>
              <AntDesign
                name="delete"
                size={24}
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-[24px]">Receipe Name:</Text>
              <Text className="text-[20px]">{item.name}</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-[24px]">Receipe Description:</Text>
              <Text className="text-[20px]">{item.description}</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-[24px]">Price:</Text>
              <Text className="text-[20px]">{item.price}</Text>
            </View>
            <View className="flex flex-col items-start gap-x-2">
              <Text className="text-[24px]">Receipe Ingrients:</Text>
              <Text className="text-[20px]">{item.ingredients}</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-[24px]">Receipe Rating:</Text>
              <Text className="text-[20px]">{item.rating}</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Text className="text-[24px]">Receipe Submited By:</Text>
              <Text className="text-[20px]">{item.submitted_by}</Text>
            </View>
          </View>
        );
      })}
      {data.length > 0 && (
        <View className="flex items-center my-4">
          <Image source={{ uri: data[0].image }} className="w-60 h-44" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleProduct;
