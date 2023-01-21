export default class Presence {
  status: string;
  game: {
    name: string;
    type: number;
    url: string;
  };
  activities: {
    name: string;
    type: number;
    url: string;
  }[];
  clientStatus: {
    desktop: string;
    mobile: string;
    web: string;
  };
  constructor(d) {
    this.status = d.status;
    this.game = d.game;
    this.activities = d.activities;
    this.clientStatus = d.client_status;
  }
}
