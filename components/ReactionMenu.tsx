import React, { forwardRef, useEffect, useState } from "react";
import Animated, {
  FadeInDown,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ModalWrapper from "./ReactionMenuWrapper";
import EmojiBar from "./EmojiBar";
import ChatMenu from "./ChatMenu";

interface ReactionMenuType {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

const ReactionMenu = forwardRef<Animated.View, ReactionMenuType>(
  ({ isMenuOpen, setIsMenuOpen, bubbleData, children }, ref) => {
    const scaleVal = useSharedValue(0);
    const [state, setState] = useState({
      emojiBarHeight: 0,
      reactionMenuHeight: 0,
    });

    useEffect(() => {
      scaleVal.value = withTiming(1.1);
    }, []);

    if (!isMenuOpen) {
      return children;
    }

    return (
      <>
        {children}
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
              <EmojiBar
                setEmojiBarHeight={(e) =>
                  setState((prev) => ({ ...prev, emojiBarHeight: e }))
                }
              />
            )}
            <Animated.View>{children}</Animated.View>
            {isMenuOpen && (
              <Animated.View>
                <ChatMenu />
              </Animated.View>
            )}
          </Animated.View>
        </ModalWrapper>
      </>
    );
  }
);

export default ReactionMenu;
