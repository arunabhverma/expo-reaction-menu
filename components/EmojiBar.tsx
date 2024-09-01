import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

const EMOJI_DATA = [
  { id: "0", emoji: "❤️" },
  { id: "1", emoji: "👍" },
  { id: "2", emoji: "👎" },
  { id: "3", emoji: "😂" },
  { id: "4", emoji: "😮" },
  { id: "5", emoji: "😢" },
];

const EMOJI_HEIGHT = 22;

const EmojiBar = ({ setEmojiBarHeight }) => {
  const theme = useTheme();
  return (
    <Animated.View
      onLayout={(e) => setEmojiBarHeight(e.nativeEvent.layout.height)}
      style={{
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.menu,
        gap: 8,
        borderRadius: 200,
        alignItems: "center",
      }}
    >
      {EMOJI_DATA.map((emoji) => (
        <Animated.View
          entering={FadeInDown.delay(50)}
          key={emoji.id}
          style={{}}
        >
          <Text
            style={{
              fontSize: EMOJI_HEIGHT,
              textAlignVertical: "center",
            }}
          >
            {emoji.emoji}
          </Text>
        </Animated.View>
      ))}
      <Animated.View entering={FadeInDown.delay(100)}>
        <Ionicons
          name="ellipsis-horizontal-circle-sharp"
          size={EMOJI_HEIGHT + 12}
          color={"rgb(100,100,100)"}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default EmojiBar;

const styles = StyleSheet.create({});
