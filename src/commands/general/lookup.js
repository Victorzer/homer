const Command = require('../../structures/Command');
const { RichEmbed } = require('discord.js');
const { deconstruct } = require('../../../node_modules/discord.js/src/util/Snowflake');
const snekfetch = require('snekfetch');

class LookupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lookup',
      category: 'general',
      usage: '<ID/invite>',
      dm: true,
    });
  }

  async execute(context) {
    const search = context.args.join(' ');
    if (!search) return context.replyError(context.__('lookup.noSearch'));
    const embed = new RichEmbed();
    let done = false;

    // User
    await this.client.fetchUser(search)
      .then(async (user) => {
        done = true;

        const badges = [];
        if (this.client.config.owners.includes(user.id)) badges.push(this.client.constants.badges.botDev);
        if (user.avatar && user.avatar.startsWith('a_')) badges.push(this.client.constants.badges.nitro);
        await this.client.database.getDocument('donators', user.id).then(a => a ? badges.push(this.client.constants.badges.donator) : undefined);

        const lastactive = await this.client.database.getDocument('lastactive', user.id)
          .then((lastactiveObject) => {
            if (!lastactiveObject) return context.__('global.noInformation');
            return this.client.time.timeSince(lastactiveObject.time, context.settings.misc.locale, false, true);
          });

        const userInformation = [
          `${this.dot} ${context.__('user.embed.id')}: **${user.id}**${badges.length > 0 ? ` ${badges.join(' ')}` : ''}`,
          `${this.dot} ${context.__('user.embed.lastactive')}: ${lastactive}`,
          `${this.dot} ${context.__('user.embed.creation')}: **${context.formatDate(user.createdTimestamp)}**`,
        ].join('\n');

        embed
          .setDescription(userInformation)
          .setThumbnail(user.avatar ?
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}` :
            this.getDefaultAvatar(user.discriminator));

        context.reply(
          context.__('user.title', {
            emote: (user.bot ? this.client.constants.emotes.botUser : this.client.constants.emotes.humanUser),
            name: `**${user.username}**#${user.discriminator}`,
          }),
          { embed },
        );
      })
      .catch(() => {
        done = false;
      });

    if (done) return;
    
    // Guild
    await snekfetch
      .get(`https://discordapp.com/api/guilds/${search}/widget.json`)
      .set({ 'User-Agent': this.client.constants.userAgent() })
      .then(async (res) => {
        done = true;

        const guildObject = res.body;
        const { timestamp } = deconstruct(guildObject.id);

        const inviteCode = this.client.resolver.resolveInviteCode(guildObject.instant_invite) || null;
        const metadata = await this.client.fetchInvite(guildObject.instant_invite)
          .then(i => ({ icon: `https://cdn.discordapp.com/icons/${guildObject.id}/${i.guild.icon}` }))
          .catch(() => ({}));

        const members = [
          `${this.client.constants.status.online} **${guildObject.members.filter(m => m.status === 'online').length}**`,
          `${this.client.constants.status.idle} **${guildObject.members.filter(m => m.status === 'idle').length}**`,
          `${this.client.constants.status.dnd} **${guildObject.members.filter(m => m.status === 'dnd').length}**`,
        ].join('  - ');

        const guildInformation = [
          `${this.dot} ${context.__('server.embed.id')}: **${guildObject.id}**`,
          `${this.dot} ${context.__('server.embed.members')}: ${members}`,
          `${this.dot} ${context.__('server.embed.channels')}: **${guildObject.channels.length}** ${context.__('channel.type.voice')}`,
          `${this.dot} ${context.__('server.embed.invite')}: ${inviteCode ? `**[${inviteCode}](https://discord.gg/${inviteCode})**` : context.__('global.none')}`,
          `${this.dot} ${context.__('server.embed.creation')}: **${context.formatDate(timestamp)}**`
        ].join('\n');

        embed
          .setDescription(guildInformation)
          .setThumbnail(metadata.icon);

        context.reply(
          context.__('server.title', { name: guildObject.name }),
          { embed },
        );
      })
      .catch((res) => {
        if (res.body && res.body.code === 50004) {
          done = true;
          context.replyWarning(context.__('lookup.disabledWidget', { search }));
        } else {
          done = false;
        }
      });

    if (done) return;

    // Invite
    await this.client.fetchInvite(search)
      .then((invite) => {
        done = true;

        const inviter = invite.inviter ?
          `**${invite.inviter.username}**#${invite.inviter.discriminator} (ID:${invite.inviter.id})` :
          context.__('global.none');

        const inviteInformation = [
          `${this.dot} ${context.__('lookup.invite.embed.server')}: ${invite.guild ? `**${invite.guild.name}** (ID:${invite.guild.id})` : context.__('global.none')}`,
          `${this.dot} ${context.__('lookup.invite.embed.inviter')}: ${inviter}`,
          `${this.dot} ${context.__('lookup.invite.embed.channel')}: **${invite.channel.name ? `#${invite.channel.name}` : context.__('global.groupDm')}** (ID:${invite.channel.id})`,
          `${this.dot} ${context.__('lookup.invite.embed.members')}: **${invite.memberCount}**${invite.presenceCount ? ` (${this.client.constants.status.online} **${invite.presenceCount}**)` : ''}`,
          `${this.dot} ${context.__('lookup.invite.embed.channels')}: **${invite.textChannelCount || 0}** ${context.__('channel.type.text')} - **${invite.voiceChannelCount || 0}** ${context.__('channel.type.voice')}`,
          `${this.dot} ${context.__('lookup.invite.embed.quickAccess')}: **[${invite.code}](https://discord.gg/${invite.code})**`,
        ].join('\n');

        embed.setDescription(inviteInformation)
        if (invite.guild && invite.guild.icon) {
          embed.setThumbnail(`https://cdn.discordapp.com/icons/${invite.guild.id}/${invite.guild.icon}.png`);
        }

        context.reply(
          context.__('lookup.invite.title', { invite: invite.code }),
          { embed },
        );
      })
      .catch((e) => {
        done = false;
      });

    if (!done) {
      context.replyError(context.__('lookup.nothingFound', { search }));
    }
  }

  getDefaultAvatar(discriminator) {
    const defaultAvatarID = discriminator % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarID}.png`;
  }
}

module.exports = LookupCommand;