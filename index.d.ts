// @ts-ignore
import EventEmitter from "events";

declare function Disc4js(token: string, options: Disc4js.Options): Disc4js.Client;

declare namespace Disc4js{
    interface Options{
        intents: number
    }

    interface ClientUser{
        verified: boolean;
        username: string;
        id: string;
        flags: number;
        email: string | null;
        discriminator: string;
        tag: string;
        bot: boolean;
        avatar: string;
    }

    interface Emoji {
        name: string;
        id: string;
        animated: boolean;
        available: boolean | undefined;
    }

    interface Message {
        type: number;
        tts: boolean;
        pinned: boolean;
        nonce: string;
        mentions: any[]
        guildID: string;
        content: string;
        channel: Channel;
        id: string;
    }

    interface Channel{
        version: string;
        type: number;
        position: number;
        permissions: number | undefined;
        parentID : string;
        nsfw: boolean;
        name: string;
        id: string;
        lastMessage: string;
        messages: Message[]
    }

    interface EventListeners {
        message: [Message];
        ready: []
    }

    export class Client extends EventEmitter {
        user: ClientUser;
        emojis: Emoji[];
        channels: Channel[];
        on<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
    }
}
