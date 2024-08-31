import React from "react";
import {
  View,
  StyleSheet,
  ImageProps,
  StyleProp,
  ImageStyle,
} from "react-native";
import { Image } from "expo-image";

interface RenderImageProps extends Omit<ImageProps, "source"> {
  image: string;
  style?: StyleProp<ImageStyle>;
}

const RenderImage: React.FC<RenderImageProps> = ({ image, style }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[styles.image, style]}
        contentFit="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.77,
  },
});

export default RenderImage;
