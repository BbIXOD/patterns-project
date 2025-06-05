export interface Command {
  canHandle(command: string): boolean;
  execute(chatId: number, command?: string): Promise<void>;
}
