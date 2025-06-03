class AppStateHandler {
  public state: PomodoroState;

  public setState(state: PomodoroState) {
    this.state = state;
  }

  public transitionTo(state: PomodoroState) {
    const oldState = this.state;
    this.state.finish();
    this.state = state;
    this.state.start(oldState);
  }
}
