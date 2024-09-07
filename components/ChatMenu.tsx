import React from "react";
import { StyleSheet, Text } from "react-native";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { ExtendedTheme, useTheme } from "@react-navigation/native";

const generateMenuData = (theme: ExtendedTheme) => {
  let color = theme.colors.text;
  return [
    {
      id: "0",
      title: "Reply",
      icon: <Entypo name="reply" size={18} color={color} />,
    },
    {
      id: "1",
      title: "Forward",
      icon: <Entypo name="forward" size={18} color={color} />,
    },
    {
      id: "2",
      title: "Save",
      icon: <Feather name="download" size={18} color={color} />,
    },
    {
      id: "3",
      title: "Select",
      icon: <AntDesign name="checkcircleo" size={18} color={color} />,
    },
    {
      id: "4",
      title: "Info",
      icon: <AntDesign name="infocirlceo" size={18} color={color} />,
    },
    {
      id: "5",
      title: "Delete",
      icon: <Ionicons name="trash-outline" size={18} color={color} />,
    },
  ];
};

const ChatMenu = () => {
  const theme = useTheme();
  const MENU_DATA = generateMenuData(theme);
  return (
    <Animated.View
      entering={FadeInUp.delay(200)}
      exiting={FadeOutUp}
      layout={LinearTransition.springify().damping(50).mass(4).stiffness(300)}
      style={[styles.container, { backgroundColor: theme.colors.menu }]}
    >
      {MENU_DATA.map((menu, i) => (
        <Animated.View
          layout={LinearTransition.springify()
            .damping(50)
            .mass(4)
            .stiffness(300)}
          entering={FadeInUp.delay(i * 50)}
          key={menu.id}
          style={styles.menuItem}
        >
          {menu.icon}
          <Text style={[styles.textStyle, { color: theme.colors.text }]}>
            {menu.title}
          </Text>
        </Animated.View>
      ))}
    </Animated.View>
  );
};

export default ChatMenu;

const styles = StyleSheet.create({
  container: {
    minWidth: 180,
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 20,
    borderRadius: 12,
    justifyContent: "center",
    overflow: "hidden",
  },
  menuItem: {
    gap: 20,
    flexDirection: "row",
    alignContent: "center",
  },
  textStyle: {
    fontSize: 15,
    lineHeight: 20,
  },
});
