class AppStateHandler {
  public state: PomodoroState = new WorkState();

  public transitionTo(state: PomodoroState) {
    const oldState = this.state;
    this.state.finish();
    this.state = state;
    this.state.start(oldState);
  }
}
