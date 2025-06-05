import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { PomodoroWorkflowBuilder, PomodoroWorkflowType } from "../core/PomodoroWorkflowBuilder.js";
import { TimerStrategy } from "../strategies/TimerStrategy.js";
import { NotificationHandler } from "../notifier/NotificationHandler.js";

export class BeginCommand implements Command {
  private activeStates: Map<number, AppStateHandler>;
  private timerStrategy: TimerStrategy;

  constructor(activeStates: Map<number, AppStateHandler>, timerStrategy: TimerStrategy) {
    this.activeStates = activeStates;
    this.timerStrategy = timerStrategy;
  }

  canHandle(command: string): boolean {
    return command.startsWith("/begin");
  }

  async execute(chatId: number, command?: string): Promise<void> {
    if (this.activeStates.has(chatId)) {
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '❌ A session is already active. Use /stop to finish it first.'
        }
      });
      return;
    }

    const parts = command?.split(" ");
    let workflowType: PomodoroWorkflowType = "classic";
    
    if (parts && parts.length > 1) {
      const type = parts[1].toLowerCase();
      if (type === "infinite" || type === "classic") {
        workflowType = type;
      } else {
        NotificationHandler.instance.notify({
          type: 'sendMessage',
          data: {
            chat: { id: chatId },
            text: '❌ Invalid workflow type. Use "classic" or "infinite".\nExample: /begin classic'
          }
        });
        return;
      }
    } else {
      NotificationHandler.instance.notify({
        type: 'sendMessage',
        data: {
          chat: { id: chatId },
          text: '❌ Please specify workflow type.\nExample: /begin classic'
        }
      });
      return;
    }

    const builder = new PomodoroWorkflowBuilder(this.timerStrategy);
    const appState = builder
      .setChatId(chatId)
      .setType(workflowType)
      .build();
    
    appState.start();
    this.activeStates.set(chatId, appState);

    NotificationHandler.instance.notify({
      type: 'sendMessage',
      data: {
        chat: { id: chatId },
        text: `🚀 ${workflowType === 'classic' ? 'Classic' : 'Infinite'} Pomodoro workflow started!`
      }
    });
  }
}
