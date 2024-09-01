import React, { forwardRef, useState } from "react";
import { View } from "react-native";
import ModalWrapper from "./ReactionMenuWrapper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  LinearTransition,
  ZoomInEasyDown,
  ZoomInEasyUp,
} from "react-native-reanimated";
import Bubble from "./Bubble";
import EmojiBar from "./EmojiBar";
import ChatMenu from "./ChatMenu";

interface ReactionMenuType {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const ReactionMenu = forwardRef<Animated.View, ReactionMenuType>(
  ({ isMenuOpen, setIsMenuOpen, bubbleData }, ref) => {
    const [state, setState] = useState({
      emojiBarHeight: 0,
      reactionMenuHeight: 0,
    });

    if (!isMenuOpen) {
      return;
    }

    return (
      <ModalWrapper
        ref={ref}
        isVisible={isMenuOpen}
        emojiBarHeight={state.emojiBarHeight}
        reactionMenuHeight={state.reactionMenuHeight}
        onClose={() => setIsMenuOpen(false)}
      >
        <Animated.View
          onLayout={(e) => {
            e.persist();
            setState((prev) => ({
              ...prev,
              reactionMenuHeight: e?.nativeEvent?.layout?.height,
            }));
          }}
          style={{
            padding: 1,
            alignItems: bubbleData.isEven ? "flex-start" : "flex-end",
            gap: 15,
            top: -state.emojiBarHeight - 15,
          }}
        >
          {isMenuOpen && (
            <Animated.View entering={FadeInDown}>
              <EmojiBar
                setEmojiBarHeight={(e) =>
                  setState((prev) => ({ ...prev, emojiBarHeight: e }))
                }
              />
            </Animated.View>
          )}
          <Bubble {...bubbleData} />
          {isMenuOpen && (
            <Animated.View>
              <ChatMenu />
            </Animated.View>
          )}
        </Animated.View>
      </ModalWrapper>
    );
  }
);

export default ReactionMenu;
