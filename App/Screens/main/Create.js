import { View, Text, ScrollView, TextInput, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AllProducts,
  CreateTable,
  InsertProducts,
  SingleProducts,
  Update,
} from "../../Operations/operationscalls";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
export default function Create({ route }) {
  const { id } = route?.params || "";
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    ingrients: "",
    rating: "",
    username: "",
  });
  useEffect(() => {
    // Request permission to access the camera when the component mounts
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);
  const openCamera = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      console.log(uri);
      setImageUri(uri);
    }
  };

  useEffect(() => {
    async function fun() {
      try {
        const res = await CreateTable();
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(data);
      if (!id) {
        const res = await InsertProducts(
          data.name,
          data.price,
          data.desc,
          imageUri,
          data.username,
          data.rating,
          data.ingrients
        );
      } else {
        const res = await Update(
          id,
          data.name,
          data.desc,
          data.price,
          imageUri,
          data.ingrients,
          data.rating,
          data.username
        );
      }

      navigation.navigate("home", {
        message: "back",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await SingleProducts(id);
        if (res.length > 0) {
          const product = res[0];
          console.log("pppp", product);
          setData({
            name: product.name,
            desc: product.description,
            price: String(product.price),
            ingrients: product.ingredients,
            rating: String(product.rating),
            username: product.submitted_by,
          });
          setImageUri(product.image);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter Name"
            value={data.name}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                name: text,
              }))
            }
          />
        </View>
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter Description"
            value={data.desc}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                desc: text,
              }))
            }
          />
        </View>
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter Price"
            keyboardType="numeric"
            value={data.price}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                price: text,
              }))
            }
          />
        </View>

        <View className="mx-6 rounded-md mb-3">
          <Button title="Upload Image" onPress={openCamera} />
        </View>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              marginBottom: 3,
              marginHorizontal: "auto",
            }}
          />
        )}
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter ingrients"
            value={data.ingrients}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                ingrients: text,
              }))
            }
          />
        </View>
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter rating"
            keyboardType="numeric"
            value={data.rating}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                rating: text,
              }))
            }
          />
        </View>
        <View className="border-[0.9px] border-gray-400 mx-6 p-2 rounded-lg mb-3">
          <TextInput
            placeholder="Enter your name"
            value={data.username}
            onChangeText={(text) =>
              setData((prev) => ({
                ...prev,
                username: text,
              }))
            }
          />
        </View>
        <View className="mx-6">
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
