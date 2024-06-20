import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Fallback() {
  return (
    <View style={{alignItems: "center"}}>
      <Image
        source={require("../../assets/favicon.png")}
        style={{ width: 300, height: 300, }}
      />
      <Text>bisa keneh kah ?</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
