module.exports = class Role{
    constructor(d) {
        this.id = d.id;
        this.name = d.name;
        this.position = d.position;
        this.permissions = d.permissions;
        this.color = d.color;
        this.mentionable = d.mentionable;
        this.icon = d.icon;
    }
}