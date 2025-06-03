import { Subscriber } from "../interfaces/Subscriber.js";
import { BaseEvent } from "./BaseEvent.js";

export class NotificationHandler {
  public static instance: NotificationHandler = new NotificationHandler();

  private readonly _subscribers: Subscriber[] = [];

  public subscribe(subscriber: Subscriber) {
    this._subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: Subscriber) {
    this._subscribers.filter((s) => s !== subscriber);
  }

  public notify(event: BaseEvent) {
    this._subscribers.forEach((subscriber) => subscriber.notify(event));
  }
}
