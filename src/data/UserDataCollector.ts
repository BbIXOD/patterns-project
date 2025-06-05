export interface UserData {
  chatId: number;
  command: string;
  timestamp: Date;
  sessionActive: boolean;
  additionalInfo?: Record<string, any>;
}

export interface UserDataStrategy {
  collect(userData: UserData): Promise<void>;
}

export class ConsoleDataStrategy implements UserDataStrategy {
  async collect(userData: UserData): Promise<void> {
    const sessionStatus = userData.sessionActive ? 'Active' : 'Inactive';
    const additionalInfo = userData.additionalInfo 
      ? ` | Info: ${JSON.stringify(userData.additionalInfo)}` 
      : '';
    
    console.log(
      `[UserData] Chat: ${userData.chatId} | Command: ${userData.command} | ` +
      `Time: ${userData.timestamp.toISOString()} | Session: ${sessionStatus}${additionalInfo}`
    );
  }
}

export class DatabaseDataStrategy implements UserDataStrategy {
  async collect(userData: UserData): Promise<void> {
    console.log('[UserData] Database storage not implemented yet - data:', userData);
  }
}

export class FileDataStrategy implements UserDataStrategy {
  async collect(userData: UserData): Promise<void> {
    console.log('[UserData] File storage not implemented yet - data:', userData);
  }
}

export class UserDataCollector {
  private static instance: UserDataCollector;
  private strategy: UserDataStrategy;

  private constructor() {
    this.strategy = new ConsoleDataStrategy();
  }

  public static getInstance(): UserDataCollector {
    if (!UserDataCollector.instance) {
      UserDataCollector.instance = new UserDataCollector();
    }
    return UserDataCollector.instance;
  }

  public setStrategy(strategy: UserDataStrategy): void {
    this.strategy = strategy;
  }

  public async collectUserData(
    chatId: number,
    command: string,
    sessionActive: boolean,
    additionalInfo?: Record<string, any>
  ): Promise<void> {
    const userData: UserData = {
      chatId,
      command,
      timestamp: new Date(),
      sessionActive,
      additionalInfo,
    };

    try {
      await this.strategy.collect(userData);
    } catch (error) {
      console.error('[UserDataCollector] Failed to collect user data:', error);
    }
  }
}
