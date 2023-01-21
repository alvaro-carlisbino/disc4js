export default class Emoji {
  name: string;
  id: string;
  animated: boolean;
  available: boolean;
  constructor(d) {
    this.name = d.name;
    this.id = d.id;
    this.animated = d.animated;
    this.available = d.available;
  }
}
