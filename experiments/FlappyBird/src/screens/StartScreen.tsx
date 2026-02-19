import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

interface StartScreenProps {
  highScore: number;
  onTap: () => void;
}

export function StartScreen({ highScore, onTap }: StartScreenProps) {
  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Tap to Play</Text>
        <Text style={styles.bestScore}>Best: {highScore}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  bestScore: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
  },
});
