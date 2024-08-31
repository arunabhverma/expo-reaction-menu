import React, { forwardRef } from "react";
import { View } from "react-native";
import ModalWrapper from "./ReactionMenuWrapper";
import Animated, { LinearTransition } from "react-native-reanimated";
import Bubble from "./Bubble";
import EmojiBar from "./EmojiBar";
import ChatMenu from "./ChatMenu";

interface ReactionMenuType {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const ReactionMenu = forwardRef<Animated.View, ReactionMenuType>(
  ({ isMenuOpen, setIsMenuOpen, bubbleData }, ref) => {
    if (!isMenuOpen) {
      return null;
    }
    return (
      <ModalWrapper
        ref={ref}
        isVisible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Animated.View
          onLayout={(e) => console.log("e", e.nativeEvent.layout.height)}
          layout={LinearTransition.springify()}
          style={{
            padding: 1,
            alignItems: bubbleData.isEven ? "flex-start" : "flex-end",
            gap: 10,
            top: -(28 + 12 + 8 * 2 + 10),
          }}
        >
          <EmojiBar />
          <Bubble {...bubbleData} />
          <ChatMenu />
        </Animated.View>
      </ModalWrapper>
    );
  }
);

export default ReactionMenu;
