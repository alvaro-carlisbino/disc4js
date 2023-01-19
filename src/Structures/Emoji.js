module.exports = class Emoji {
  constructor(d) {
    this.name = d.name;
    this.id = d.id;
    this.animated = d.animated;
    this.available = d.available;
  }
};
