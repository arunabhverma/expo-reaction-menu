import React, { forwardRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import ModalWrapper from "./ReactionMenuWrapper";
import EmojiBar from "./EmojiBar";
import ChatMenu from "./ChatMenu";
import { ReactionMenuType } from "@/types";

const GAP = 20;

const ReactionMenu = forwardRef<Animated.View, ReactionMenuType>(
  ({ isMenuOpen, setIsMenuOpen, isEven, children }, ref) => {
    const [state, setState] = useState({
      emojiBarHeight: 0,
      reactionMenuHeight: 0,
    });

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
              if (isMenuOpen) {
                setState((prev) => ({
                  ...prev,
                  reactionMenuHeight: e?.nativeEvent?.layout?.height,
                }));
              }
            }}
            style={[
              styles.container,
              {
                alignItems: isEven ? "flex-start" : "flex-end",
                top: -state.emojiBarHeight - GAP,
              },
            ]}
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

const styles = StyleSheet.create({
  container: {
    padding: 1,
    gap: GAP,
  },
});

export default ReactionMenu;
