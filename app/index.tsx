import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CHAT_DATA } from "@/mock/chatData";
import { CHAT_ITEM } from "@/types";
import ReactionMenu from "@/components/ReactionMenu";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import Bubble from "@/components/Bubble";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const USER_ID = `a1b2c3`;

interface RenderItemType {
  item: CHAT_ITEM;
  onReaction: () => void;
  index?: number;
}

const RenderItem = ({ item }) => {
  const isEven = item.userId == USER_ID;

  const ChatItemRef = useAnimatedRef<Animated.View>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Animated.View
      sharedTransitionTag="sharedTag"
      ref={ChatItemRef}
      style={{
        alignItems: isEven ? "flex-start" : "flex-end",
      }}
    >
      <ReactionMenu
        ref={ChatItemRef}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        bubbleData={{
          item,
          isEven,
          setIsMenuOpen,
        }}
      >
        <Bubble item={item} isEven={isEven} setIsMenuOpen={setIsMenuOpen} />
      </ReactionMenu>
    </Animated.View>
  );
};

const Chat = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <GestureHandlerRootView>
      <FlatList
        data={CHAT_DATA.chat}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom },
        ]}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </GestureHandlerRootView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
});
