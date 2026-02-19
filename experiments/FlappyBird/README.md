# Flappy Bird

A mobile-first Flappy Bird clone built with React Native (Expo SDK 51).

## Run

```bash
npx expo start
```

Open in Expo Go on your device or use an iOS/Android simulator. Portrait orientation is locked; the screen stays awake during play.

## Tech stack

- **Framework:** React Native (Expo SDK 51)
- **Game loop:** react-native-game-engine
- **Physics:** Custom (no third-party physics engine)
- **Rendering:** @shopify/react-native-skia
- **Audio:** expo-av
- **Storage:** @react-native-async-storage/async-storage
- **State:** XState v5
- **Orientation:** expo-screen-orientation (portrait lock)
- **Keep-awake:** expo-keep-awake

## Project structure

- `src/constants/` — physics, layout, difficulty tuning
- `src/state/` — XState game machine (LOADING, IDLE, PLAYING, PAUSED, GAME_OVER)
- `src/hooks/` — useGameMachine, useHighScore, useAppLifecycle
- `src/screens/` — GameScreen, StartScreen, PauseScreen, GameOverScreen
- `src/entities/` — Bird, Pipe, Ground, Background
- `src/physics/` — BirdPhysics, PipePhysics, CollisionDetection, DifficultyManager
- `src/systems/` — GameLoopSystem, PipeSpawnSystem, ScoreSystem, InputSystem
- `src/renderers/` — Skia-based renderers
- `src/audio/` — AudioManager
- `src/storage/` — HighScoreStorage

## Phases

1. **Phase 1** — Project scaffold, state machine, start screen ✅
2. Phase 2 — Asset loading, AudioManager, ErrorScreen
3. Phase 3 — Bird entity, physics, rendering (Skia)
4. Phase 4 — Pipes, collision, score, game over, high score
5. Phase 5 — Pause, app lifecycle
6. Phase 6 — Difficulty progression
7. Phase 7 — Polish (animations, HighScoreBadge, input edge cases)
