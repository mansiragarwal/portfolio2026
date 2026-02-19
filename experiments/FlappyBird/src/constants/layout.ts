import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export { SCREEN_WIDTH, SCREEN_HEIGHT };
export const PIPE_WIDTH = 60;
export const BIRD_SIZE = 40;
/** Bird starting position as fraction of screen (0–1). */
export const BIRD_START_X_RATIO = 0.25;
export const BIRD_START_Y_RATIO = 0.4;
