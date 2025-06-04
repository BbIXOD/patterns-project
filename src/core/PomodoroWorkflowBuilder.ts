import { AppStateHandler } from "./AppStateHandler.js";
import { WorkState } from "../states/WorkState.js";
import { RestState } from "../states/RestState.js";
import { BigRestState } from "../states/BigRestState.js";
import { FinishedState } from "../states/FinishedState.js";
import { BaseState } from "../states/BaseState.js";

export type PomodoroWorkflowType = "infinite" | "classic";

export class PomodoroWorkflowBuilder {
  private chatId?: number;
  private type: PomodoroWorkflowType = "classic";
  private cycles: number = 2;

  setChatId(chatId: number): this {
    this.chatId = chatId;
    return this;
  }

  setType(type: PomodoroWorkflowType): this {
    this.type = type;
    return this;
  }

  setCycles(cycles: number): this {
    this.cycles = cycles;
    return this;
  }

  build(): AppStateHandler {
    if (this.chatId === undefined) {
      throw new Error("chatId must be set");
    }

    const handler = new AppStateHandler();
    handler.chatId = this.chatId;

    if (this.type === "infinite") {
      const work = new WorkState(handler);
      const rest = new RestState(handler);

      work.nextState = rest;
      rest.nextState = work;

      handler.state = work;
      return handler;
    }

    let prevState: BaseState | null = null;
    let firstState: BaseState | null = null;

    for (let i = 0; i < this.cycles - 1; i++) {
      const work = new WorkState(handler);
      const rest = new RestState(handler);

      if (!firstState) firstState = work;
      if (prevState) prevState.nextState = work;
      work.nextState = rest;
      prevState = rest;
    }

    const lastWork = new WorkState(handler);
    if (!firstState) firstState = lastWork;
    if (prevState) prevState.nextState = lastWork;

    const bigRest = new BigRestState(handler);
    lastWork.nextState = bigRest;
    const finished = new FinishedState(handler);
    bigRest.nextState = finished;
    finished.nextState = finished;

    handler.state = firstState!;
    return handler;
  }
}