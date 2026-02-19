import { useCallback, useEffect, useSyncExternalStore } from "react";
import { createActor } from "xstate";
import { gameMachine, type GameEvent } from "../state/gameMachine";

const actor = createActor(gameMachine);
actor.start();

function getSnapshot() {
  return actor.getSnapshot();
}

function subscribe(callback: () => void) {
  const sub = actor.subscribe(callback);
  return () => sub.unsubscribe();
}

export function useGameMachine() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const state = snapshot.value as string;
  const context = snapshot.context;

  const send = useCallback((event: GameEvent) => {
    actor.send(event);
  }, []);

  return { state, context, send };
}
