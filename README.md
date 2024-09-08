# Reaction Menu Demo

This project demonstrates reaction menu for Android and iOS, inspired by the reaction feature in the [Signal app](https://signal.org/). Built using [Expo](https://expo.dev/) and [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/), this example project showcases how to implement smooth, interactive animations for a reaction menu that can be used in messaging apps.

## Demo

Check out the reaction menu in action 👇:

| Android                                                                                                                        | iOS                                                                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
|<video src="https://github.com/user-attachments/assets/3c6dd0fa-c833-4404-a9a7-2755e453869c" /> | <video src="https://github.com/user-attachments/assets/ca14d96e-ebe5-451d-8626-91cad4e1294b" /> |

## Features

- **Cross-Platform Support**: The reaction menu works on both Android and iOS, with platform-specific adjustments to maintain a native feel.
- **Interactive Bounce Effect**: Clicking on a message triggers a subtle bounce effect to enhance user interaction.
- **Modal for Reaction Menu**: Modal is used to display the reaction menu on top of everything, ensuring a seamless experience across both platforms. For iOS, the fade effect in the modal smooths out the transition of the blur background, complementing the message bounce effect nicely.
- **Custom Positioning with Reanimated**: In the modal, I capture the message's position on the screen (using Reanimated’s `measure` function) and display the reaction menu at the exact location, creating the illusion that the message was always there.
- **Animated Emoji Bar**: The emoji bar appears with a spring-based animation, and each emoji has a slight delay based on its index, providing a fluid and responsive feel.
- **iOS Blur Effect**: A blur overlay is added as a background for iOS, providing a polished, native appearance.

## How It Works

- **Bounce Effect**: Upon clicking a message, a bounce effect is triggered using Reanimated. This adds a playful interaction to the messaging experience.
  
- **Modal Implementation**: Instead of rendering the reaction menu directly on the screen, I used a modal. In modal I capture the position of the message (using `measure` from Reanimated to get the `pageX`, `pageY`, `width`, and `height` of the message). This allows the message to be rendered in the same position inside the modal, so it looks like it never left its original location.

- **Entering Animations**: The emoji bar and reaction options appear with simple spring-based entering animations. Each emoji is animated with a slight delay to create a staggered appearance, adding a nice flow to the interaction.

- **Lightweight Animations**: The spring animation is kept light and subtle to avoid excessive visual flair while maintaining an interactive feel. The goal was to strike a balance between responsiveness and simplicity, ensuring the animations are smooth without being distracting.

- **iOS-Specific Enhancements**: For iOS, a blur effect is added as the modal’s background, which enhances the look and feel of the reaction menu, making it feel more native to the platform.

### Note:
This project is not a standalone library; it's simply a demo or example implementation. However, if you're interested in building a library on top of this code, that would be greatly appreciated! Contributions are welcome—whether it's a bug fix, a new feature, or general improvements. Feel free to submit a pull request (PR) if you would like to contribute.

## Acknowledgments

- **[Expo](https://expo.dev/)**: For simplifying cross-platform mobile development.
- **[Reanimated](https://docs.swmansion.com/react-native-reanimated/)**: For powering the animations that make this reaction menu interactive and fluid.
- **[Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)**: For adding the iOS-native blur effect.

Feel free to contribute!
