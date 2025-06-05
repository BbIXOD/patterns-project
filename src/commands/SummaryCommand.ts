import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";
import { UserDataCollector } from "../data/UserDataCollector.js";

export class SummaryCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;

  constructor(activeStates: Map<number, AppStateHandler>) {
    this.activeStates = activeStates;
  }

  canHandle(command: string): boolean {
    return command === "/summary";
  }

  async execute(chatId: number): Promise<void> {
    const appState = this.activeStates.get(chatId);
    
    await UserDataCollector.getInstance().collectUserData(
      chatId,
      "/summary",
      appState !== undefined,
      { 
        commandType: "summary",
        hasActiveSession: appState !== undefined
      }
    );

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: '📋 Summary functionality is coming soon!\n\nThis will provide:\n• Daily session summary\n• Weekly productivity overview\n• Goal progress tracking\n• Achievement highlights'
      }
    });
  }
}