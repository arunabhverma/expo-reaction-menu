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

    useDerivedValue(() => {
      const measured = measure(ref);
      if (measured !== null) {
        const { width, height, pageX, pageY } = measured;
        runOnJS(setModalPosition)({ top: pageY, left: pageX, width, height });
        const top = HEIGHT - reactionMenuHeight;

        if (pageY - emojiBarHeight - 10 < headerHeight) {
          runOnJS(settingNewPosition)(
            pageX,
            headerHeight + emojiBarHeight + 10
          );
        }
        if (pageY > top) {
          runOnJS(settingNewPosition)(pageX, top - EXTRA_SPACE);
        }
      } else {
        // console.log("measure: could not measure view");
      }
    });

    const animatedPositionStyle = useAnimatedStyle(() => {
      return {
        top:
          newPostion.top !== 0
            ? withSpring(newPostion.top, {
                mass: 1,
                stiffness: 150,
                damping: 15,
              })
            : modalPosition.top,
      };
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
          style={[styles.modalContent, modalPosition, animatedPositionStyle]}
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
