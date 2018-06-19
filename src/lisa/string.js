const Method = require('../structures/Method');

module.exports = [
  // lower
  new Method(
    'lower',
    null,
    (env, params) => params[0].toLowerCase(),
  ),

  // upper
  new Method(
    'upper',
    null,
    (env, params) => params[0].toUpperCase(),
  ),

  // length
  new Method(
    'length',
    null,
    (env, params) => params[0].length.toString(),
  ),

  // url
  new Method(
    'url',
    null,
    (env, params) => encodeURIComponent(params[0]),
  ),

  // replace
  new Method(
    'replace',
    null,
    (env, params) => {
      if (params[2].startsWith('in:')) params[2] = params[2].substring(3);
      if (params[1].startsWith('with:')) params[1] = params[1].substring(5);
      return params[2].replace(new RegExp(params[0], 'ig'), params[1]);
    },
  ),

  // replaceregex
  new Method(
    'replaceregex',
    null,
    (env, params) => {
      if (params[2].startsWith('in:')) params[2] = params[2].substring(3);
      if (params[1].startsWith('with:')) params[1] = params[1].substring(5);
      return params[2].replace(new RegExp(params[0], 'ig'), params[1]);
    },
  ),

  // substring
  new Method(
    'substring',
    null,
    (env, params) => {
      const string = params[2];
      let start;
      let end;

      try {
        start = parseInt(params[0]);
      } catch (e) {
        start = 0;
      }

      try {
        end = parseInt(params[1]);
      } catch (e) {
        end = string.length;
      }

      if (start < 0) start += string.length;
      if (end < 0) end += string.length;
      if (end <= start || end <= 0 || start >= string.length) return null;
      if (end > string.length) end = string.length;
      if (start < 0) start = 0;

      return params[2].substring(start, end);
    },
  ),

  // oneline
  new Method(
    'oneline',
    null,
    (env, params) => params[0].replace(/\\s+/g, ' ').trim(),
  ),

  // hash
  new Method(
    'hash',
    null,
    (env, params) => params[0].hashCode().toString(),
  ),
];