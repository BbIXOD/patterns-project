export interface Command {
  canHandle(command: string): boolean;
  execute(chatId: number): Promise<void>;
}
