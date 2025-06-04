export interface Command {
  execute(ctx: any): void | Promise<void>;
  canHandle(command: string): boolean;
}
