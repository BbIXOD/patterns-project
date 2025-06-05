import { PomodoroState } from "../interfaces/PomodoroState.js";
import { TimerStrategy } from "../strategies/TimerStrategy.js";

export class AppStateHandler {
  public state: PomodoroState | null = null;
  private _timerStrategy: TimerStrategy;
  public chatId: number | null = null;
  public timerMessageId: number | null = null;

  constructor(timerStrategy: TimerStrategy) {
    this._timerStrategy = timerStrategy;
  }

  public start() {
    if (!this.state) {
        return;
    }
    this.state.start(null);
    this._timerStrategy.startTicking((elapsed: number) => {
      this.state?.update(elapsed);
    });
  }

  public transitionTo(state: PomodoroState) {
    const oldState = this.state;
    this._timerStrategy.stopTicking();
    this.state = state;
    this.state.start(oldState);
    this._timerStrategy.startTicking((elapsed: number) => {
      this.state?.update(elapsed);
    });
  }

  public cleanup() {
    this._timerStrategy.stopTicking();
    this.state = null;
  }
}
