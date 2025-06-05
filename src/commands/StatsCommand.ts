import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class StatsCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;

  constructor(activeStates: Map<number, AppStateHandler>) {
    this.activeStates = activeStates;
  }

  canHandle(command: string): boolean {
    return command === "/stats";
  }

  async execute(chatId: number): Promise<void> {
    const appState = this.activeStates.get(chatId);
    
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/stats",
      appState !== undefined,
      { 
        commandType: "stats",
        hasActiveSession: appState !== undefined
      }
    );

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: '📊 Stats functionality is coming soon!\n\nThis will show your session statistics including:\n• Total sessions completed\n• Time spent working\n• Break times taken\n• Productivity insights'
      }
    });
  }
}