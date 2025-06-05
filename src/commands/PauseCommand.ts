import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class PauseCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;

  constructor(activeStates: Map<number, AppStateHandler>) {
    this.activeStates = activeStates;
  }

  canHandle(command: string): boolean {
    return command === "/pause";
  }

  async execute(chatId: number): Promise<void> {
    const appState = this.activeStates.get(chatId);
    
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/pause",
      appState !== undefined,
      { 
        commandType: "pause",
        hasActiveSession: appState !== undefined
      }
    );

    if (appState) {
      appState.pause();
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '⏸️ Session paused. Use /play to resume.'
        }
      });
    } else {
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '❌ No active session to pause. Use /begin <type> to start a session.'
        }
      });
    }
  }
}
