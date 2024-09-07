import React, { forwardRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, {
  measure,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalWrapperProps } from "@/types";

const GAP = 20;

const ModalWrapper = forwardRef<Animated.View, ModalWrapperProps>(
  (
    { isVisible, onClose, children, emojiBarHeight, reactionMenuHeight },
    ref
  ) => {
    const { bottom } = useSafeAreaInsets();
    const EXTRA_SPACE = Platform.select({
      ios: bottom,
      default: 20,
    });
    const headerHeight = useHeaderHeight();
    const sharedModalPosition = useSharedValue({
      translateY: 0,
      translateX: 0,
      width: 0,
      height: 0,
    });
    const topPosition = useSharedValue(0);
    const { height: HEIGHT } = useWindowDimensions();

    useAnimatedReaction(
      () => {
        const measured = measure(ref);
        return measured;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          if (currentValue !== null) {
            const { width, height, pageX, pageY } = currentValue;
            sharedModalPosition.value = {
              translateY: pageY,
              translateX: pageX,
              width,
              height,
            };
            const top = HEIGHT - reactionMenuHeight;

            if (pageY - emojiBarHeight - GAP < headerHeight) {
              topPosition.value = Math.abs(
                pageY - (headerHeight + emojiBarHeight + GAP)
              );
            }
            if (pageY + emojiBarHeight + GAP + EXTRA_SPACE > top) {
              topPosition.value = -(
                pageY -
                top +
                emojiBarHeight +
                GAP +
                EXTRA_SPACE
              );
            }
          }
        }
      }
    );

    const animatedPositionStyle = useAnimatedStyle(() => {
      return {
        width: sharedModalPosition.value.width,
        height: sharedModalPosition.value.height,
        transform: [
          {
            translateX: sharedModalPosition.value.translateX,
          },
          {
            translateY: sharedModalPosition.value.translateY,
          },
          {
            translateY: withTiming(topPosition.value),
          },
        ],
      };
    });

    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={onClose}
        statusBarTranslucent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPressOut={onClose}>
          {Platform.OS === "android" ? (
            <View style={[styles.overlay, styles.bg]} />
          ) : (
            <BlurView style={[StyleSheet.absoluteFillObject, styles.bg]} />
          )}
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.modalContent, animatedPositionStyle]}>
          {children}
        </Animated.View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  modalContent: {
    position: "absolute",
    zIndex: 10,
    gap: 10,
    cursor: "auto",
  },
  bg: {
    backgroundColor: "rgba(20,20,20,0.8)",
  },
});

export default ModalWrapper;
