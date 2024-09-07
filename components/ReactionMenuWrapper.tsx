import React, { useState, forwardRef } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useDerivedValue,
  measure,
  runOnJS,
  useAnimatedStyle,
  withSpring,
  LinearTransition,
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedReaction,
} from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";

interface ModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const EXTRA_SPACE = 20;

const ModalWrapper = forwardRef<Animated.View, ModalWrapperProps>(
  (
    {
      isVisible,
      onClose,
      children,
      emojiBarHeight,
      chatMenuHeight,
      reactionMenuHeight,
    },
    ref
  ) => {
    const headerHeight = useHeaderHeight();
    const sharedModalPosition = useSharedValue({
      translateY: 0,
      translateX: 0,
      width: 0,
      height: 0,
    });
    const topPosition = useSharedValue(0);
    const { width: WIDTH, height: HEIGHT } = useWindowDimensions();

    const [modalPosition, setModalPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });

    const [newPostion, setNewPosition] = useState({
      top: 0,
      left: 0,
    });

    const settingNewPosition = (pageX, top) => {
      setTimeout(() => {
        setNewPosition({
          top,
        });
      }, 100);
    };

    useAnimatedReaction(
      () => {
        const measured = measure(ref);
        return measured;
      },
      (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
          console.log("currentValue", currentValue);

          const { width, height, pageX, pageY } = currentValue;
          sharedModalPosition.value = {
            translateY: pageY,
            translateX: pageX,
            width,
            height,
          };
          // topPosition.value = pageY;

          const top = HEIGHT - reactionMenuHeight;

          console.log("pageY", pageY, headerHeight);

          if (pageY - emojiBarHeight - 10 < headerHeight) {
            // sharedModalPosition.value.translateY = withTiming(
            //   sharedModalPosition.value.translateY - 100
            //   // headerHeight + emojiBarHeight + 10
            // );
            // topPosition.value = headerHeight + emojiBarHeight + 10;
            topPosition.value = pageY - headerHeight + emojiBarHeight + 10;
            // runOnJS(settingNewPosition)(
            //   pageX,
            //   headerHeight + emojiBarHeight + 10
            // );
          }
          if (pageY > top) {
            console.log("top", top, pageY, -(pageY - top));
            // topPosition.value = top - EXTRA_SPACE;
            topPosition.value = -(pageY - top) - EXTRA_SPACE;
            // sharedModalPosition.value.translateY = withTiming(
            //   top - EXTRA_SPACE
            // );
            // runOnJS(settingNewPosition)(pageX, top - EXTRA_SPACE);
          }
        }
      }
    );

    // useDerivedValue(() => {
    //   const measured = measure(ref);
    //   if (measured !== null) {
    //     const { width, height, pageX, pageY } = measured;
    //     sharedModalPosition.value = { top: pageY, left: pageX, width, height };
    //     topPosition.value = pageY;

    //     const top = HEIGHT - reactionMenuHeight;

    //     if (pageY - emojiBarHeight - 10 < headerHeight) {
    //       sharedModalPosition.value.top = withTiming(
    //         headerHeight + emojiBarHeight + 10
    //       );
    //       // topPosition.value = headerHeight + emojiBarHeight + 10;
    //       runOnJS(settingNewPosition)(
    //         pageX,
    //         headerHeight + emojiBarHeight + 10
    //       );
    //     }
    //     if (pageY > top) {
    //       // topPosition.value = top - EXTRA_SPACE;
    //       sharedModalPosition.value.top = withTiming(top - EXTRA_SPACE);
    //       runOnJS(settingNewPosition)(pageX, top - EXTRA_SPACE);
    //     }
    //   } else {
    //     // console.log("measure: could not measure view");
    //   }
    // });

    const animatedPositionStyle = useAnimatedStyle(() => {
      // console.log("sharedModalPosition", sharedModalPosition.value);
      // return sharedModalPosition.value;
      return {
        width: sharedModalPosition.value.width,
        height: sharedModalPosition.value.height,
        // left: sharedModalPosition.value.translateX,
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

    const newAnimatedPostition = useAnimatedStyle(() => {
      return { top: withTiming(topPosition.value) };
    });

    const theme = useTheme();

    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={onClose}
        statusBarTranslucent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPressOut={onClose}>
          <View
            style={[styles.overlay, { backgroundColor: "rgba(20,20,20,0.9)" }]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          // style={[styles.modalContent, modalPosition, animatedPositionStyle]}
          style={[
            styles.modalContent,
            animatedPositionStyle,
            // newAnimatedPostition,
          ]}
        >
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
});

export default ModalWrapper;
