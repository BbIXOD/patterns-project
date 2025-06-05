import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { TimeFormatterFactory } from "../formatters/TimeFormatterFactory.js";

export class BigRestState extends BaseState {
  static readonly duration = 15 * 60 * 1000;

  start(_: BigRestState): void {
    super.start(_);
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: '🎉 Long break started! You deserve this rest!'
      }
    });
  }

  protected onUpdate(): void {
    const timeText = TimeFormatterFactory.formatTime('human-readable', BigRestState.duration, this.elapsed);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: `🎉 Long break ${timeText}`
      }
    });
  }

  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: '🚀 Long break finished! Ready to get back to work!'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(BigRestState.duration, appStateHandler);
  }
}