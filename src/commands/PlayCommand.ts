import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class PlayCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;

  constructor(activeStates: Map<number, AppStateHandler>) {
    this.activeStates = activeStates;
  }

  canHandle(command: string): boolean {
    return command === "/play";
  }

  async execute(chatId: number): Promise<void> {
    const appState = this.activeStates.get(chatId);
    if (appState) {
      appState.resume();
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '▶️ Session resumed!'
        }
      });
    } else {
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '❌ No active session to resume. Use /begin <type> to start a session.'
        }
      });
    }
  }
}
