exports.defaultGuildSettings = id => ({
  id,
  welcome: {
    channel: '0',
    message: false,
  },
  leave: {
    channel: '0',
    message: false,
  },
  ignored: [],
  prefixes: [],
  rolemeRoles: [],
  importedTags: [],
  radio: {
    channel: '0',
    volume: 0.5,
  },
  misc: {
    timezone: 'UTC',
    locale: 'en-gb',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
  },
});

exports.defaultUserSettings = id => ({
  id,
  prefixes: [],
  misc: {
    timezone: 'UTC',
    locale: 'en-gb',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm:ss',
  },
});

exports.userAgent = () => `DiscordBot (https://github.com/iDroid27210/homer) Node.js/${process.version}`;

exports.emotes = {
  success: '<:success:453889194016899074>',
  warning: '<:warn:453591316027408395>',
  error: '<:error:453889225356738560>',
  successID: 'success:453889194016899074',
  warningID: 'warn:453591316027408395',
  errorID: 'error:453889225356738560',
  dot: '◽',
  humanUser: '👤',
  botUser: '🤖',
  botIcon: '<:bot:420699407344730122>',
  bot: '<:ibot:420656561493377024>',
  loading: '<a:loading:455113752984027163>',
  dbans: '<:discordbans:420715963718041641>',
  verifiedServer: '<:verified:452764762699464724>',
};

exports.badges = {
  donator: '<:donator:458192052866383873>',
  nitro: '<:nitro:452417495341727763>',
  botDev: '<:botDev:458194202908426262>',
  owner: '<:ownerCrown:460019597027049472>',
};

exports.status = {
  online: '<:online:470860030116233217>',
  idle: '<:idle:470860043940790272>',
  dnd: '<:dnd:470860101545230337>',
  offline: '<:offline:470860118821699584>',
  streaming: '<:streaming:470860133656690701>',
};

exports.services = {
  translate: '<:translate:420659720727298054>',
};

exports.regionFlags = {
  amsterdam: ':flag_nl:',
  brazil: ':flag_br:',
  'eu-central': ':flag_eu:',
  'eu-west': ':flag_eu:',
  frankfurt: ':flag_de:',
  hongkong: ':flag_hk:',
  japan: ':flag_jp:',
  london: ':flag_gb:',
  russia: ':flag_ru:',
  'us-central': ':flag_us:',
  'us-east': ':flag_us:',
  'us-south': ':flag_us:',
  'us-west': ':flag_us:',
  singapore: ':flag_sg:',
  southafrica: ':flag_za:',
  sydney: ':flag_au:',
};

exports.categoryEmotes = {
  bot: '<:ibot:420656561493377024>',
  general: '🖥',
  misc: '🎮',
  settings: '🔧',
  telephone: '📞',
};

exports.profileFields = [
  {
    id: 'about',
    name: 'About me',
  },
  {
    id: 'email',
    name: 'E-mail',
  },
  {
    id: 'instagram',
    name: 'Instagram',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
  },
  {
    id: 'nnid',
    name: 'Nintendo Network ID',
  },
  {
    id: 'skype',
    name: 'Skype',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
  },
  {
    id: 'steam',
    name: 'Steam',
  },
  {
    id: 'twitch',
    name: 'Twitch',
  },
  {
    id: 'twitter',
    name: 'Twitter',
  },
  {
    id: 'youtube',
    name: 'YouTube',
  },
];

exports.deprecatedPermissions = [
  'READ_MESSAGES',
  'EXTERNAL_EMOJIS',
  'MANAGE_ROLES_OR_PERMISSIONS',
];

exports.donationLink = 'https://paypal.me/ibotandidroid';
exports.githubLink = 'https://github.com/iDroid27210/homer';
exports.logChannel = '458334746338918403';
