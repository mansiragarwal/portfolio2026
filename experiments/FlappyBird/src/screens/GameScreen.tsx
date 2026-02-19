import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useGameMachine } from "../hooks/useGameMachine";
import { StartScreen } from "./StartScreen";

export function GameScreen() {
  const { state, context, send } = useGameMachine();

  useEffect(() => {
    send({ type: "ASSETS_LOADED" });
  }, [send]);

  return (
    <View style={styles.container}>
      {/* Game canvas will go here - Phase 3 */}
      {state === "IDLE" && (
        <StartScreen
          highScore={context.highScore}
          onTap={() => send({ type: "TAP" })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },
});
