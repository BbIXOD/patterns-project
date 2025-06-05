import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { TimeFormatterFactory } from "../formatters/TimeFormatterFactory.js";

export class WorkState extends BaseState {
  static readonly duration = 25 * 60 * 1000;

  start(_: WorkState): void {
    super.start(_);
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: {
          id: this.appStateHandler.chatId!
        },
        text: '🍅 Work session started! Focus time!'
      }
    });
  }
  
  async update(time: number): Promise<void> {
    const timeText = TimeFormatterFactory.formatTime('minutes-seconds', WorkState.duration, this.elapsed);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: {
          id: this.appStateHandler.chatId!
        },
        text: `🍅 Working ${timeText}`
      }
    });
    super.update(time);
  }
  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: {
          id: this.appStateHandler.chatId!
        },
        text: '✅ Work session completed! Great job!'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(WorkState.duration, appStateHandler);
  }
}
