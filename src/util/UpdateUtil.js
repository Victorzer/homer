const snekfetch = require('snekfetch');

class UpdateUtil {
  constructor(client) {
    this.client = client;
  }

  async updateGame() {
    const game = await this.client.database.getDocument('bot', 'settings')
      .then(settings => settings.customGame) || 'Type {prefix}help! On {servers} servers on shard {shard}.';

    return this.client.user.setActivity(game
        .replace(/{prefix}/g, this.client.prefix)
        .replace(/{servers}/g, this.client.guilds.size)
        .replace(/{users}/g, this.client.users.size)
        .replace(/{shard}/g, this.client.shard.id)
        .replace(/{shards}/g, this.client.config.sharder.totalShards)
    );
  }

  updateBotList() {
    snekfetch
      .post(`https://bots.discord.pw/api/bots/${this.client.user.id}/stats`)
      .set('Authorization', this.client.config.api.discordBotsPw)
      .set('Content-Type', 'application/json')
      .send({
        shard_id: this.client.shard.id,
        shard_count: this.client.shard.count,
        server_count: this.client.guilds.size,
      })
      .catch(() => null);

    snekfetch
      .post(`https://discordbots.org/api/bots/${this.client.user.id}/stats`)
      .set('Authorization', this.client.config.api.discordBotsOrg)
      .set('Content-Type', 'application/json')
      .send({
        shard_id: this.client.shard.id,
        shard_count: this.client.shard.count,
        server_count: this.client.guilds.size,
      })
      .catch(() => null);

    snekfetch
      .post(`https://listcord.com/api/bot/${this.client.user.id}/guilds`)
      .set('Authorization', this.client.config.api.listcord)
      .set('Content-Type', 'application/json')
      .send({
        shard: this.client.shard.id,
        guilds: this.client.guilds.size,
      })
      .catch(() => null);
  }
}

module.exports = UpdateUtil;
