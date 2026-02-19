import { createMachine, assign } from "xstate";
import { PIPE_SPEED_INITIAL } from "../constants/physics";
import { MIN_GAP_SIZE } from "../constants/difficulty";

export type GameState =
  | "LOADING"
  | "IDLE"
  | "PLAYING"
  | "PAUSED"
  | "GAME_OVER";

export interface GameContext {
  score: number;
  highScore: number;
  pipeSpeed: number;
  gapSize: number;
  isNewHighScore: boolean;
}

export type GameEvent =
  | { type: "TAP" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "COLLISION" }
  | { type: "RESTART" }
  | { type: "GO_TO_MENU" }
  | { type: "ASSETS_LOADED" }
  | { type: "ASSETS_FAILED" };

const initialContext: GameContext = {
  score: 0,
  highScore: 0,
  pipeSpeed: PIPE_SPEED_INITIAL,
  gapSize: MIN_GAP_SIZE,
  isNewHighScore: false,
};

export const gameMachine = createMachine({
  id: "game",
  types: {} as {
    context: GameContext;
    events: GameEvent;
  },
  context: initialContext,
  initial: "LOADING",
  states: {
    LOADING: {
      on: {
        ASSETS_LOADED: "IDLE",
        ASSETS_FAILED: "LOADING",
      },
    },
    IDLE: {
      on: {
        TAP: "PLAYING",
      },
    },
    PLAYING: {
      on: {
        PAUSE: "PAUSED",
        COLLISION: {
          target: "GAME_OVER",
          actions: assign(({ context, event }) => {
            if (event.type !== "COLLISION") return context;
            const isNewHighScore = context.score > context.highScore;
            return {
              ...context,
              isNewHighScore,
              highScore: isNewHighScore ? context.score : context.highScore,
            };
          }),
        },
      },
    },
    PAUSED: {
      on: {
        RESUME: "PLAYING",
      },
    },
    GAME_OVER: {
      on: {
        RESTART: {
          target: "PLAYING",
          actions: assign({
            score: 0,
            isNewHighScore: false,
            pipeSpeed: PIPE_SPEED_INITIAL,
            gapSize: MIN_GAP_SIZE,
          }),
        },
        GO_TO_MENU: {
          target: "IDLE",
          actions: assign({
            score: 0,
            isNewHighScore: false,
            pipeSpeed: PIPE_SPEED_INITIAL,
            gapSize: MIN_GAP_SIZE,
          }),
        },
      },
    },
  },
});
