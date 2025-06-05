import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

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
        text: 'Work state started'
      }
    });
  }
  
  async update(time: number): Promise<void> {
    super.update(time);
    NotificationHandler.instance.notify({
      type: 'updateTimer',
      data: {
        chat: {
          id: this.appStateHandler.chatId!
        },
        text: `Working for ${WorkState.duration / 1000 - this.elapsed / 1000} seconds`
      }
    });
  }
  finish(): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: {
          id: this.appStateHandler.chatId!
        },
        text: 'Work state finished'
      }
    });
  }

  constructor(appStateHandler: AppStateHandler) {
    super(WorkState.duration, appStateHandler);
  }
}
