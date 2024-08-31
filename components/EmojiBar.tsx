import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const EMOJI_DATA = [
  { id: "0", emoji: "❤️" },
  { id: "1", emoji: "👍" },
  { id: "2", emoji: "👎" },
  { id: "3", emoji: "😂" },
  { id: "4", emoji: "😮" },
  { id: "5", emoji: "😢" },
];

const EMOJI_HEIGHT = 28;

const EmojiBar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "white",
        gap: 10,
        borderRadius: 200,
        alignItems: "center",
      }}
    >
      {EMOJI_DATA.map((emoji) => (
        <View key={emoji.id} style={{}}>
          <Text
            style={{
              fontSize: EMOJI_HEIGHT,
              textAlignVertical: "center",
            }}
          >
            {emoji.emoji}
          </Text>
        </View>
      ))}
      <Ionicons
        name="ellipsis-horizontal-circle-sharp"
        size={EMOJI_HEIGHT + 12}
        color="darkgray"
      />
    </View>
  );
};

export default EmojiBar;

const styles = StyleSheet.create({});
