/* eslint-disable no-async-promise-executor */
import { ContentMessage } from '../..';
import Client from '../Client/Client';
import Message from './MessageDM';

export default class ChannelDM {
  version: number;
  type: number;
  name: string;
  id: string;
  private _client: Client;
  messages: Message[];
  constructor(d, client) {
    this.version = d.version;
    this.type = d.type;
    this.name = d.name;
    this.id = d.id;
    this._client = client;
    this.messages = [];
  }

  async sendMessage(content: ContentMessage): Promise<Message> {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content. Content must be a valid object.');
    }
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'POST',
        `channels/${this.id}/messages`,
        content
      );
      resolve(new Message(response, this._client, this));
    });
  }

  async delete() {
    return new Promise(async (resolve, reject) => {
      const response = await this._client.fetch.makeRequest(
        'DELETE',
        `channels/${this.id}`
      );
      if (response.status == 204) {
        return resolve(true);
      }
      return resolve(response);
    });
  }
}
