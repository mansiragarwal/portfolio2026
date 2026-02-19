import React, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { activateKeepAwake } from "expo-keep-awake";
import { GameScreen } from "./src/screens/GameScreen";

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  useEffect(() => {
    activateKeepAwake();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <GameScreen />
    </>
  );
}
