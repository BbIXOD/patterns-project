export interface PomodoroState {
  start(state: PomodoroState | null): void,
  update(time: number): void,
  finish(): void,

}
