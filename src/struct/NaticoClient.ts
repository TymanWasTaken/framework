import { BotConfig, botId, EventEmitter, startBot } from "../../deps.ts";
import { Events } from "../util/Interfaces.ts";
import { NaticoClientUtil } from "../util/ClientUtil.ts";
export class NaticoClient extends EventEmitter {
  events: Events = {};
  util!: NaticoClientUtil;
  id = botId;
  constructor(public config?: NaticoClientOptions) {
    super();
    this.events = {};
    if (this.config?.util) this.util = new NaticoClientUtil(this);
  }
  /**
   * Adds an event to be emitted
   * @param event The event to emit
   */
  addEvent(event: string) {
    this.events[event] = (...args: any[]) => this.emit(event, ...args);
  }
  /**
   * Log into discord
   * @param token The token used for logging in
   */
  async login(token = this.config?.token) {
    if (!token) throw new Error("TOKEN_NOT_PROVIDED");
    await startBot({
      token,
      intents: this.config?.intents ?? [],
      eventHandlers: this.events,
    });
  }
}

export interface NaticoClientOptions extends BotConfig {
  util?: boolean;
}
