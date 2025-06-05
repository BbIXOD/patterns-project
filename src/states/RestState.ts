import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { TimeFormatterFactory } from "../formatters/TimeFormatterFactory.js";

export class RestState extends BaseState {
  static readonly duration = 5 * 60 * 1000;

  start(_: RestState): void {
    super.start(_);
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: '😌 Short break started! Time to relax!'
      }
    });
  }

  async update(time: number): Promise<void> {
    const timeText = TimeFormatterFactory.formatTime('minutes-seconds', RestState.duration, this.elapsed);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: `😌 Resting ${timeText}`
      }
    });
    super.update(time);
  }

  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: '⏰ Break time is over! Ready for the next session?'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(RestState.duration, appStateHandler);
  }
}
