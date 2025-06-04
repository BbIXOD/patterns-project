import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class BigRestState extends BaseState {
  static readonly duration = 15 * 60 * 1000;

  start(_: BigRestState): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: 'Big rest state started'
      }
    });
  }

  async update(time: number): Promise<void> {
    super.update(time);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: `Big resting for ${BigRestState.duration / 1000 - this.elapsed / 1000} seconds`
      }
    });
  }

  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: 'Big rest state finished'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(BigRestState.duration, appStateHandler);
  }
}