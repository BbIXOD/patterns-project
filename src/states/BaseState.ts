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

  abstract start(state: PomodoroState): void;
  finish() {
    if (!this._nextState) {
      throw new Error('Next state is not set');
    }
    this.appStateHandler.transitionTo(this._nextState);
  }

  protected onFinish() { }

  update(time: number): void {
    this.elapsed += time;
    if (this.elapsed >= this._duration) {
      this.onFinish();
    }
  }
}
