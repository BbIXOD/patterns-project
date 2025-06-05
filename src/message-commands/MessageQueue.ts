import { MessageCommand } from "./MessageCommand.js";

export class MessageQueue {
  private queue: MessageCommand[] = [];
  private processing = false;

  async enqueue(command: MessageCommand): Promise<void> {
    this.queue.push(command);
    if (!this.processing) {
      await this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const command = this.queue.shift()!;
      try {
        await command.execute();
      } catch (error) {
        console.error('Error executing message command:', error);
      }
    }
    
    this.processing = false;
  }
}
