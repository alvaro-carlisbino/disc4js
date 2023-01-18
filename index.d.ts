import {EventEmitter} from "events";

declare function Discjs(token: string, options: Discjs.Options): Discjs.Client;

declare namespace Discjs{
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
        bio?: string;
    }

    export class Role{
        id: string;
        name: string;
        position: number;
        permissions: number;
        color: number;
        mentionable: boolean;
        icon: string | null;
    }

    export class Emoji {
        name: string;
        id: string;
        animated: boolean;
        available: boolean | undefined;
    }

    export class Reaction{
        emoji: Emoji | {name: string, id: null}
        channel: Channel;
        message: Message | MessageDM;
        guild?: Guild;
        member?: Member;
        user: User
    }

    export class Message {
        attachments: [];
        component: Component[];
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

        delete(): Promise<boolean>;

        pin(): Promise<boolean>;
        unPin(): Promise<boolean>;

        edit(content: ContentMessage): Promise<Message>;
    }

    interface MessageReference{
        message_id: string;
        channel_id: string;
    }

    interface EmbedFooter{
        name: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    }

    interface EmbedImage{
        url: string;
        height?: number;
        width?: number;
        proxy_url?: string;
    }

    interface EmbedThumbnail{
        url: string;
        height?: number;
        width?: number;
        proxy_url?: string;
    }

    interface EmbedVideo{
        url: string;
        height?: number;
        width?: number;
        proxy_url?: string;
    }

    interface EmbedProvider{
        name?: string;
        url?: string;
    }

    interface EmbedAuthor{
        name: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    }

    interface EmbedField{
        name: string;
        value: string;
        inline?: boolean;
    }

    interface Embed {
        title?: string;
        description?: string;
        url?: string;
        timestamp?: number;
        color?: number;
        footer?: EmbedFooter;
        image?: EmbedImage;
        thumbnail?: EmbedThumbnail;
        video?: EmbedVideo;
        provider?: EmbedProvider;
        author?: EmbedAuthor;
        fields: EmbedField[];
    }

    interface Component{
        type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        style?: 1 | 2 | 3 | 4 | 5;
        label?: string;
        emoji?: Emoji;
        custom_id?: string;
        url?: string;
        disabled?: boolean
        components?: Component[];
    }

    interface ContentMessage{
        content?: string;
        message_reference?: MessageReference;
        embeds?: Embed[];
        components: Component[];
    }

    interface Permission{
        type: string;
        id: string;
        deny: number;
        deny_numer: string;
        allow: number;
        allow_new: string;
    }

    export class VoiceChannel{
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
        delete(): Promise<boolean>;
    }

    export class Channel{
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
        delete(): Promise<boolean>;
    }

    export class LogEntry{
        user: User;
        target: string;
        changes: any[];
        guild: Guild;
    }

    export class VoiceState{
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

    export class Interaction{
        version: number;
        type: number;
        token: string;
        member?: Member;
        user: User;
        guild?: Guild;
        channel: Channel | ChannelDM;
        id: string;
        data: object;
        application_id: string;

        reply(content: ContentMessage): Promise<Message>;
    }

    interface EventListeners {
        message: [message: Message];
        ready: [];

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
        channelDelete: [channel: Channel | ChannelDM | VoiceChannel]

        voiceStateUpdate: [voiceState: VoiceState]

        clientUserUpdate: [user: ClientUser]
        interactionCreate: [interaction: Interaction]
        inviteCreate: [invite: Invite]
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

    export class Presence{
        status: string;
        game?: PresenceGame[]
        clientStatus: PresenceClientStatus
        activities: PresenceActivities[]
    }

    export class User {
        username: string;
        tag: string;
        bot: boolean;
        discriminator: string;
        publicFlags: number;
        id: string;
        presence?: Presence;
        createDM(): Promise<ChannelDM>;
    }

    export class Member{
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

    export class MessageDM{
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

        attachments: [];
        component: Component[];
        id: string;

        delete(): Promise<boolean>;

        pin(): Promise<boolean>;
        unPin(): Promise<boolean>;
        edit(content: ContentMessage): Promise<Message>;
    }

    export class ChannelDM{
        version: string;
        type: number;
        name: string;
        id: string;
        messages: MessageDM[]

        delete(): Promise<boolean>;

        sendMessage(content: ContentMessage): Promise<MessageDM>;
    }

    export class Invite{
        uses: number;
        type: number;
        max_uses: number;
        max_age: number;
        inviter: User;
        guild: Guild;
        code: string;
        channel: Channel;
        expires_at: string;
        created_at: string;
    }

    export class Guild{
        id: string;
        name: string;
        icon: string;
        description: string;
        splash: string;
        owner_id: string;
        region: 'deprecated';
        invites: Invite[];
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

    interface ClientUserOptions{
        username: string;
    }

    export class Client extends EventEmitter {
        user: ClientUser;
        emojis: Emoji[];
        channels: Channel[];
        guilds: Guild[];
        users: User[];
        dmchannels: ChannelDM[];
        modifyUser(options: ClientUserOptions): Promise<boolean>;

        fetchUser(id: string): Promise<User>;
        fetchChannel(id: string): Promise<Channel>;
        fetchGuild(id: string): Promise<Guild>;
        emit<K extends keyof EventListeners>(event: K, ...args: EventListeners[K]): boolean;
        on<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
        on(event: string, listener: (...args: any[]) => void): this;

        once<K extends keyof EventListeners>(event: K, listener: (...args: EventListeners[K]) => void): this;
    }
}

export = Discjs;
