import { AppStateHandler } from "../core/AppStateHandler.js";
import { PomodoroState } from "../interfaces/PomodoroState.js";

export abstract class BaseState implements PomodoroState {
  protected elapsed = 0;
  private readonly _duration: number;
  protected readonly appStateHandler: AppStateHandler;
  private _nextState: PomodoroState | null = null;

  constructor(duration: number, appStateHandler: AppStateHandler) {
    this._duration = duration;
    this.appStateHandler = appStateHandler;
  }

  public set nextState(nextState: PomodoroState) {
    this._nextState = nextState;
  }

  start(state: PomodoroState) {
    this.elapsed = 0;
  }
  abstract finish(): void;
  
  protected onFinish() { }

  update(time: number): void {
    this.elapsed += time;
    if (this.elapsed >= this._duration) {
      this.onFinish();
      if (this._nextState) {
        this.appStateHandler.transitionTo(this._nextState);
      }
    }
  }
}
