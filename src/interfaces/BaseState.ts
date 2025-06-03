abstract class BaseState implements PomodoroState {
  private _elapsed = 0;
  private readonly _duration: number;
  private readonly _appStateHandler: AppStateHandler;
  private _nextState: PomodoroState;

  constructor(duration: number, appStateHandler: AppStateHandler) {
    this._duration = duration;
    this._appStateHandler = appStateHandler;
  }

  public set nextState(nextState: PomodoroState) {
    this._nextState = nextState;
  }

  abstract start(state: PomodoroState): void;
  finish() {
    this._appStateHandler.transitionTo(this._nextState);
  }

  protected onFinish() { }

  update(time: number): void {
    this._elapsed += time;
    if (this._elapsed >= this._duration) {
      this.onFinish();
    }
  }
}
