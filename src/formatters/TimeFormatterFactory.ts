import { TimeFormatter } from "./TimeFormatter.js";
import { MinuteSecondFormatter } from "./MinuteSecondFormatter.js";
import { SimpleSecondsFormatter } from "./SimpleSecondsFormatter.js";
import { HumanReadableFormatter } from "./HumanReadableFormatter.js";

export type FormatterType = 'minutes-seconds' | 'simple-seconds' | 'human-readable';

export class TimeFormatterFactory {
  private static formatters: Map<FormatterType, TimeFormatter> = new Map();

  static getFormatter(type: FormatterType): TimeFormatter {
    if (!this.formatters.has(type)) {
      switch (type) {
        case 'minutes-seconds':
          this.formatters.set(type, new MinuteSecondFormatter());
          break;
        case 'simple-seconds':
          this.formatters.set(type, new SimpleSecondsFormatter());
          break;
        case 'human-readable':
          this.formatters.set(type, new HumanReadableFormatter());
          break;
        default:
          throw new Error(`Unknown formatter type: ${type}`);
      }
    }
    return this.formatters.get(type)!;
  }

  static formatTime(type: FormatterType, durationMs: number, elapsedMs: number): string {
    const formatter = this.getFormatter(type);
    return formatter.formatTime(durationMs, elapsedMs);
  }
}
