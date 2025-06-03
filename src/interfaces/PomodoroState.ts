interface PomodoroState {
  start(state: PomodoroState): void,
  update(time: number): void,
  finish(): void,

}
