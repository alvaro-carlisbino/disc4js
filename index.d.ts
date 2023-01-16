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

    interface Role{
        id: string;
        name: string;
        position: number;
        permissions: number;
        color: number;
        mentionable: boolean;
        icon: string | null;
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

    interface MessageReference{
        message_id: string;
        channel_id: string;
    }

    interface ContentMessage{
        content?: string;
        message_reference?: MessageReference;
    }

    interface PartialMessage{
        id: string;
        type: number;
        content: string;
        channel: Channel;
        user: User;
        embeds: any[];
        pinned: boolean;
        tts: boolean;
        timestamp: string;
        flags: number;
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

        sendMessage(content: ContentMessage): Promise<PartialMessage>;
    }

    interface EventListeners {
        message: [Message];
        ready: []
    }

    interface User {
        username: string;
        tag: string;
        bot: boolean;
        discriminator: string;
        publicFlags: number;
        id: string;
    }

    interface Member{
        nick: string;
        avatar: string | undefined;
        roles: Role[];
        user: User;
        joined_at: string;
        deaf: boolean;
        mute: boolean;
        permissions: number | undefined;
    }

    interface BanOptions{
        delete_message_days: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
        delete_message_seconds: number;
    }

    interface Guild{
        id: string;
        name: string;
        icon: string;
        description: string;
        splash: string;
        owner_id: string;
        region: 'deprecated';
        systemChannelId: string | undefined;
        owner: Member;
        max_members: number;
        explicitContentFilter: number;
        premium_tier: number;
        roles: Role[];
        preferredLocal: string;
        rulesChannelId: string;
        nsfw: boolean;
        embed_enabled: boolean | undefined;
        emojis: Emoji[];
        members: Member[];
        channels: Channel[];

        banMember(id: string, options: BanOptions): Promise<boolean>;
    }

    export class Client extends EventEmitter {
        user: ClientUser;
        emojis: Emoji[];
        channels: Channel[];
        guilds: Guild[];
        users: User[];
        on<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
        on(event: string, listener: (...args: any[]) => void): this;
    }
}
