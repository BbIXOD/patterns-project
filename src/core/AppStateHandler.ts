import { Timer } from "./Timer.js";
import { PomodoroState } from "../interfaces/PomodoroState.js";

export class AppStateHandler {
  public state: PomodoroState | null = null;
  private _timer: Timer | null = null;
  public chatId: number | null = null;
  public timerMessageId: number | null = null;

  public transitionTo(state: PomodoroState) {
    const oldState = this.state;
    oldState?.finish();
    this._timer?.stop();
    this.state = state;
    this.state.start(oldState);
    this._timer = new Timer(1000, (elapsed: number) => {
      this.state?.update(elapsed);
    });
    this._timer.start();
  }
}
