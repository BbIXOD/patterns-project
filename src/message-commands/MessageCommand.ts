export interface MessageCommand {
  execute(): Promise<void>;
}
