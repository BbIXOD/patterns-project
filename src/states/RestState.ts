import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class RestState extends BaseState {
  static readonly duration = 5 * 60 * 1000;

  start(_: RestState): void {
    super.start(_);
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: 'Rest state started'
      }
    });
  }

  async update(time: number): Promise<void> {
    super.update(time);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: `Resting for ${RestState.duration / 1000 - this.elapsed / 1000} seconds`
      }
    });
  }

  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: 'Rest state finished'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(RestState.duration, appStateHandler);
  }
}
