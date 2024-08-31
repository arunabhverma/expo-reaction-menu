import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import RenderImage from "./RenderImage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Bubble = ({ setIsMenuOpen, isEven, item }) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback
      onPress={() => setIsMenuOpen(true)}
      style={[
        styles.chatBubble,
        {
          backgroundColor: isEven ? "rgb(230,230,230)" : theme.colors.primary,
        },
      ]}
    >
      <>
        {item.image && (
          <RenderImage image={item.image} style={{ borderRadius: 18 }} />
        )}
        <Text
          style={[
            styles.chatText,
            {
              paddingVertical: 7,
              paddingLeft: isEven ? 17 : 12,
              paddingRight: isEven ? 12 : 17,
            },
            { color: isEven ? "black" : "white" },
          ]}
        >
          {item.message}
        </Text>
        <View
          style={[
            styles.bubbleStyle,
            {
              backgroundColor: isEven
                ? "rgb(230,230,230)"
                : theme.colors.primary,
              right: isEven ? "auto" : 2,
              left: isEven ? 2 : "auto",

              transform: [
                { skewX: isEven ? "-30deg" : "30deg" },
                { skewY: isEven ? "-30deg" : "30deg" },
                { rotate: isEven ? "-15deg" : "15deg" },
                { scaleX: -1 },
              ],
            },
          ]}
        />
      </>
    </TouchableWithoutFeedback>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatBubble: {
    backgroundColor: "transparent",
    minHeight: 40,
    maxWidth: "60%",
    borderRadius: 20,
    justifyContent: "center",
    padding: 3,
  },
  gradientStyle: {
    flex: 1,
    zIndex: -1,
  },
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
  bubbleStyle: {
    width: 20,
    aspectRatio: 1,
    bottom: 10,
    position: "absolute",
    zIndex: -1,
  },
  chatText: {
    fontSize: 15,
    fontWeight: "500",
  },
  bottomGradientStyle: {
    position: "absolute",
    bottom: 0,
    height: "20%",
    width: "100%",
  },
});
