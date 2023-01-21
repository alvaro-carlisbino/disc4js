import Client from '../Client/Client';

export default class Role {
  id: string;
  name: string;
  position: number;
  permissions: number;
  color: number;
  mentionable: boolean;
  icon: string;
  constructor(d, client: Client) {
    this.id = d.id;
    this.name = d.name;
    this.position = d.position;
    this.permissions = d.permissions;
    this.color = d.color;
    this.mentionable = d.mentionable;
    this.icon = d.icon;
  }
}
