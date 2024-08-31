import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";

const MENU_DATA = [
  {
    id: "0",
    title: "Reply",
    icon: <Entypo name="reply" size={24} color="black" />,
  },
  {
    id: "1",
    title: "Forward",
    icon: <Entypo name="forward" size={24} color="black" />,
  },
  {
    id: "2",
    title: "Save",
    icon: <Feather name="download" size={24} color="black" />,
  },
  {
    id: "3",
    title: "Select",
    icon: <AntDesign name="checkcircleo" size={24} color="black" />,
  },
  {
    id: "4",
    title: "Info",
    icon: <AntDesign name="infocirlceo" size={24} color="black" />,
  },
  {
    id: "5",
    title: "Delete",
    icon: <Ionicons name="trash-outline" size={24} color="black" />,
  },
];

const ChatMenu = () => {
  return (
    <View
      onLayout={(e) => console.log("EmojiBar", e.nativeEvent.layout.height)}
      style={{
        minWidth: 200,
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: "white",
        gap: 20,
        borderRadius: 20,
        justifyContent: "center",
      }}
    >
      {MENU_DATA.map((menu) => (
        <View
          key={menu.id}
          style={{
            flexDirection: "row",
            gap: 18,
            alignContent: "center",
          }}
        >
          {menu.icon}
          <Text
            style={{
              fontSize: 15,
              lineHeight: 20,
            }}
          >
            {menu.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ChatMenu;

const styles = StyleSheet.create({});
