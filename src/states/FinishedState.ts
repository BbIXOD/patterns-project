import { AppStateHandler } from "../core/AppStateHandler.js";
import { BaseState } from "./BaseState.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class FinishedState extends BaseState {
  static readonly duration = 0;

  start(_: FinishedState): void {
    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: this.appStateHandler.chatId! },
        text: '🏁 Pomodoro session complete! Well done! 🎉'
      }
    });
    super.start(_);
  }

  async update(_: number): Promise<void> {
  }

  finish(): void {
  }

  constructor(appStateHandler: AppStateHandler) {
    super(FinishedState.duration, appStateHandler);
  }
}