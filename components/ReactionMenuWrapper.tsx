import React, { useState, forwardRef, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useDerivedValue,
  measure,
  runOnJS,
  LinearTransition,
} from "react-native-reanimated";
import EmojiBar from "./EmojiBar";

interface ModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const EMOJI_BAR_HEIGHT = 56.76;
const CHAT_MENU_HEIGHT = 270.85;

const ModalWrapper = forwardRef<Animated.View, ModalWrapperProps>(
  ({ isVisible, onClose, children }, ref) => {
    const { width: WIDTH, height: HEIGHT } = useWindowDimensions();
    const [isBottom, setIsBottom] = useState(false);
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

    const settingNewPosition = (pageX, height) => {
      setTimeout(() => {
        setNewPosition({
          top: HEIGHT - CHAT_MENU_HEIGHT + 20 - height - EMOJI_BAR_HEIGHT,
          left: pageX,
        });
      }, 100);
    };

    useDerivedValue(() => {
      const measured = measure(ref);
      if (measured !== null) {
        const { width, height, pageX, pageY } = measured;
        runOnJS(setModalPosition)({ top: pageY, left: pageX, width, height });
        // if (pageY < EMOJI_BAR_HEIGHT + 10) {
        //   console.log("top");
        //   runOnJS(setNewPosition)({
        //     top: EMOJI_BAR_HEIGHT + 10,
        //     left: pageX,
        //   });
        // }
        if (pageY > HEIGHT - CHAT_MENU_HEIGHT + 20) {
          runOnJS(settingNewPosition)(pageX, height);
        }
      } else {
        console.log("measure: could not measure view");
      }
    });

    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={onClose}
        statusBarTranslucent
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          layout={newPostion.top !== 0 ? LinearTransition : undefined}
          style={[
            styles.modalContent,
            modalPosition,
            newPostion.top !== 0 ? newPostion : {},
          ]}
          // onPress={onClose}
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    position: "absolute",
    zIndex: 10,
    gap: 10,
    cursor: "auto",
  },
});

export default ModalWrapper;
