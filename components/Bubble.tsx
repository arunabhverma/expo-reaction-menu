import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import RenderImage from "./RenderImage";
import Button from "./Button";
import { BubbleType } from "@/types";

const Bubble = ({ setIsMenuOpen, isEven, item }: BubbleType) => {
  const theme = useTheme();
  return (
    <Button
      onPress={() => setIsMenuOpen(true)}
      style={[
        styles.chatBubble,
        {
          backgroundColor: isEven
            ? theme.colors.secondary
            : theme.colors.primary,
        },
      ]}
    >
      <>
        {item.image && (
          <RenderImage image={item.image} style={styles.imageStyle} />
        )}
        <Text
          style={[
            styles.chatText,
            { color: isEven ? theme.colors.text : "white" },
          ]}
        >
          {item.message}
        </Text>
        <View
          style={[
            styles.chatTail,
            {
              borderBottomColor: isEven
                ? theme.colors.secondary
                : theme.colors.primary,
              left: isEven ? -6 : "auto",
              right: isEven ? "auto" : -6,
            },
          ]}
        />
        {item.reaction?.length > 0 && (
          <View
            style={[
              styles.rections,
              {
                left: isEven ? 10 : "auto",
                right: isEven ? "auto" : 10,
                backgroundColor: isEven
                  ? theme.colors.primary
                  : theme.colors.secondary,
              },
            ]}
          >
            {item.reaction &&
              item.reaction.map((emoji, i) => (
                <View key={i.toString()}>
                  <Text style={styles.emojiStyle}>{emoji}</Text>
                </View>
              ))}
          </View>
        )}
      </>
    </Button>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  chatBubble: {
    backgroundColor: "transparent",
    minHeight: 40,
    maxWidth: "70%",
    borderRadius: 12,
    justifyContent: "flex-start",
    padding: 2,
  },
  chatText: {
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "500",
  },
  imageStyle: {
    borderRadius: 10,
  },
  chatTail: {
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotateX: "110deg" }],
    marginTop: -13,
    zIndex: -1,
  },
  rections: {
    position: "absolute",
    bottom: 3,
    minWidth: 35,
    width: 35,
    height: 25,
    borderRadius: 35,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    transform: [{ translateY: 20 }],
  },
  emojiStyle: {
    fontSize: 12,
  },
});
