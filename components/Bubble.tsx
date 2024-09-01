import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import RenderImage from "./RenderImage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "./Button";

const Bubble = ({ setIsMenuOpen, isEven, item }) => {
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
          <RenderImage image={item.image} style={{ borderRadius: 10 }} />
        )}
        <Text
          style={[
            styles.chatText,
            {
              paddingVertical: 5,
              paddingHorizontal: 10,
            },
            { color: isEven ? theme.colors.text : "white" },
          ]}
        >
          {item.message}
        </Text>
        <View
          style={{
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
            borderBottomColor: isEven
              ? theme.colors.secondary
              : theme.colors.primary,
            transform: [{ rotateX: "110deg" }],
            marginTop: -13,
            left: isEven ? -6 : "auto",
            right: isEven ? "auto" : -6,
            zIndex: -1,
          }}
        />
      </>
    </Button>
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
    borderRadius: 12,
    justifyContent: "flex-start",
    padding: 2,
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
    // fontWeight: "500",
  },
  bottomGradientStyle: {
    position: "absolute",
    bottom: 0,
    height: "20%",
    width: "100%",
  },
});
