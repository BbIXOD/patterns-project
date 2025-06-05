import { PomodoroState } from "../interfaces/PomodoroState.js";
import { TimerStrategy } from "../strategies/TimerStrategy.js";

export class AppStateHandler {
  public state: PomodoroState | null = null;
  private _timerStrategy: TimerStrategy;
  public chatId: number | null = null;
  public timerMessageId: number | null = null;
  private _isPaused: boolean = false;

  constructor(timerStrategy: TimerStrategy) {
    this._timerStrategy = timerStrategy;
  }

  public start() {
    if (!this.state) {
        return;
    }
    this.state.start(null);
    this._timerStrategy.startTicking((elapsed: number) => {
      if (!this._isPaused) {
        this.state?.update(elapsed);
      }
    });
  }

  public pause() {
    this._isPaused = true;
  }

  public resume() {
    this._isPaused = false;
  }

  public transitionTo(state: PomodoroState) {
    const oldState = this.state;
    this._timerStrategy.stopTicking();
    this.state = state;
    this._isPaused = false;
    this.state.start(oldState);
    this._timerStrategy.startTicking((elapsed: number) => {
      if (!this._isPaused) {
        this.state?.update(elapsed);
      }
    });
  }

  public cleanup() {
    this._timerStrategy.stopTicking();
    this.state = null;
    this._isPaused = false;
  }
}
