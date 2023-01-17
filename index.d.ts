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

    interface Reaction{
        emoji: Emoji | {name: string, id: null}
        channel: Channel;
        message: Message | MessageDM;
        guild?: Guild;
        member?: Member;
        user: User
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
        reactions: Reaction[];

        pin(): Promise<boolean>;
        unPin(): Promise<boolean>;

        edit(content: ContentMessage): Promise<Message>;
    }

    interface MessageReference{
        message_id: string;
        channel_id: string;
    }

    interface ContentMessage{
        content?: string;
        message_reference?: MessageReference;
    }

    interface Permission{
        type: string;
        id: string;
        deny: number;
        deny_numer: string;
        allow: number;
        allow_new: string;
    }

    interface VoiceChannel{
        version: number;
        type: 2;
        rtc_region_null: string | null;
        rate_limit_per_user: number;
        position: number;
        permissions: Permission[];
        parent: Channel;
        nsfw: boolean;
        name: string;
        id: string;
        flags: number;
        bitrate: number;

        join(mute: boolean, deaf: boolean): Promise<void>;
    }

    interface Channel{
        version: string;
        type: number;
        position: number;
        permissions: Permission[];
        referenced_message: MessageReference | null;
        parent: Channel | string;
        nsfw: boolean;
        name: string;
        id: string;
        lastMessage: string;
        messages: Message[]

        sendMessage(content: ContentMessage): Promise<Message>;
    }

    interface LogEntry{
        user: User;
        target: string;
        changes: any[];
        guild: Guild;
    }

    interface VoiceState{
        member: Member;
        session: string;
        supress: boolean;
        self_video: boolean;
        self_mute: boolean;
        self_deaf: boolean;
        mute: boolean;
        guild: Guild;
        deaf: boolean;
        channel: Channel;
    }

    interface EventListeners {
        message: [message: Message];
        ready: []

        messageUpdate: [oldMessage: Message, newMessage: Message]
        channelUpdate: [oldChannel: Channel, newChannel: Channel]
        guildAuditLogEntryCreate: [log: LogEntry]

        messageDeleted: [message: Message]
        guildMemberAdd: [member: Member]
        guildMemberRemove: [member: Member]
        guildMemberUpdate: [oldMember: Member, newMember: Member]
        guildDelete: [guild: Guild]
        presenceUpdate: [user: User]

        typingStart: [channel: Channel | ChannelDM, user: User]
        channelCreate: [channel: Channel | ChannelDM | VoiceChannel]

        voiceStateUpdate: [voiceState: VoiceState]
    }

    interface PresenceGame{
        type: number;
        session_id?: string;
        name: string;
        id: string;
        created_at: number;
    }

    interface PresenceClientStatus{
        web: string;
    }

    interface PresenceActivities{
        type: number;
        name: string;
        id: string;
        created_ate: number;
    }

    interface Presence{
        status: string;
        game?: PresenceGame[]
        clientStatus: PresenceClientStatus
        activities: PresenceActivities[]
    }

    interface User {
        username: string;
        tag: string;
        bot: boolean;
        discriminator: string;
        publicFlags: number;
        id: string;
        presence?: Presence;

        createDM(): Promise<ChannelDM>;
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

    interface MessageDM{
        type: number;
        tts: boolean;
        pinned: boolean;
        nonce: string;
        mentions: any[];
        referenced_message: MessageReference | null;
        content: string;
        user: User;
        reactions: Reaction[];
        channel: ChannelDM;
        id: string;

        pin(): Promise<boolean>;
        unPin(): Promise<boolean>;
        edit(content: ContentMessage): Promise<Message>;
    }

    interface ChannelDM{
        version: string;
        type: number;
        name: string;
        id: string;
        messages: MessageDM[]

        sendMessage(content: ContentMessage): Promise<MessageDM>;
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
        dmchannels: ChannelDM[];

        fetchUser(id: string): Promise<User>;
        on<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
        on(event: string, listener: (...args: any[]) => void): this;

        once<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
        once(event: string, listener: (...args: any[]) => void): this;
    }
}
