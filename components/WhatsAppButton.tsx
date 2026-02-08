import React from "react";
import { StyleSheet, Pressable, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withRepeat, withSequence, withDelay } from "react-native-reanimated";
import { useEffect } from "react";
import Colors from "@/constants/colors";
import { companyInfo } from "@/constants/data";

export default function WhatsAppButton() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withDelay(3000, withSpring(1.12, { damping: 4, stiffness: 200 })),
        withSpring(1, { damping: 6, stiffness: 200 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    const text = encodeURIComponent('Hola Carolina, me gustaria recibir informacion sobre sus productos.');
    Linking.openURL(`https://wa.me/${companyInfo.whatsapp.replace('+', '')}?text=${text}`);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.92 : 1 }] }]}
        onPress={handlePress}
      >
        <Ionicons name="logo-whatsapp" size={28} color={Colors.white} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "web" ? 100 : 90,
    right: 16,
    zIndex: 1000,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.whatsapp,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
