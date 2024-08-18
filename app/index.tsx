import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHAT_DATA } from "@/mock/chatData";
import { CHAT_ITEM } from "@/types";
import RenderImage from "@/components/RenderImage";

const USER_ID = `a1b2c3`;

const RenderItem = ({ item, index }: { item: CHAT_ITEM; index: number }) => {
  const theme = useTheme();
  const isEven = item.userId == USER_ID;

  return (
    <View
      style={{
        padding: 1,
        alignItems: isEven ? "flex-start" : "flex-end",
      }}
    >
      <View
        style={[
          styles.chatBubble,
          {
            backgroundColor: isEven ? "rgb(230,230,230)" : theme.colors.primary,
          },
        ]}
      >
        {item.image && (
          <RenderImage image={item.image} style={{ borderRadius: 18 }} />
        )}
        <Text
          style={[
            styles.chatText,
            {
              padding: 7,
              paddingLeft: isEven ? 17 : 12,
              paddingRight: isEven ? 12 : 17,
              //   paddingLeft: 10,
              //   paddingRight: 10,
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
      </View>
    </View>
  );
};

const Chat = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <FlatList
      data={CHAT_DATA.chat}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: bottom },
      ]}
      renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
      keyExtractor={(_, i) => i.toString()}
    />
  );
};

export default Chat;

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
