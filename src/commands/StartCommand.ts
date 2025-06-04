import { Command } from "./Command.js";
import { AppStateHandler } from "../core/AppStateHandler.js";
import { PomodoroWorkflowBuilder } from "../core/PomodoroWorkflowBuilder.js";

export class StartCommand implements Command {
  private states: AppStateHandler[];

  constructor(states: AppStateHandler[]) {
    this.states = states;
  }

  canHandle(command: string): boolean {
    return command === "/start";
  }

  async execute(ctx: any): Promise<void> {
    ctx.sendMessage("Hello! I am your pomodoro timer.");
    const appState = new PomodoroWorkflowBuilder()
      .setChatId(ctx.message!.chat.id)
      .build();
    this.states.push(appState);
    appState.state?.start(null);
  }
}
