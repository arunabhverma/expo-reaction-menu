import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageProps,
  StyleProp,
  ImageStyle,
} from "react-native";

interface RenderImageProps extends Omit<ImageProps, "source"> {
  image: string;
  style?: StyleProp<ImageStyle>;
}

const RenderImage: React.FC<RenderImageProps> = ({ image, style, ...rest }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setAspectRatio(width / height);
    });
  }, [image]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { aspectRatio }, style]}
        resizeMode="contain"
        {...rest}
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
  },
});

export default RenderImage;
