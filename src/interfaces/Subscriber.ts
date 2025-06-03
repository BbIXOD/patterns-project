import { BaseEvent } from "../notifier/BaseEvent.js";

export interface Subscriber {
  notify(event: BaseEvent): void
}
