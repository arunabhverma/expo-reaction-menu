import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
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

const EmojiBar = ({
  setEmojiBarHeight,
}: {
  setEmojiBarHeight: (val: number) => void;
}) => {
  const theme = useTheme();
  return (
    <Animated.View
      onLayout={(e) => setEmojiBarHeight(e.nativeEvent.layout.height)}
      style={[styles.container, { backgroundColor: theme.colors.menu }]}
    >
      {EMOJI_DATA.map((emoji, i) => (
        <Animated.View
          layout={LinearTransition}
          entering={FadeInDown.delay(i * 50)}
          key={emoji.id}
        >
          <Text style={styles.emojiText}>{emoji.emoji}</Text>
        </Animated.View>
      ))}
      <Animated.View
        layout={LinearTransition}
        entering={FadeInDown.delay(EMOJI_DATA.length * 50)}
      >
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 8,
    borderRadius: 200,
    alignItems: "center",
  },
  emojiText: {
    fontSize: EMOJI_HEIGHT,
    textAlignVertical: "center",
  },
});
