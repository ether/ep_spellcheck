'use strict';

// Sub-path import keeps the client bundle clean — the top-level
// `ep_plugin_helpers` index pulls in server-only modules (eejs, Settings).
const {padToggle} = require('ep_plugin_helpers/pad-toggle');

// Same config as the server-side instance — must agree on pluginName,
// settingId, l10nId, and defaultLabel so checkbox ids and clientVars line up.
const spellcheckToggle = padToggle({
  pluginName: 'ep_spellcheck',
  settingId: 'spellcheck',
  l10nId: 'ep_spellcheck.spellcheck',
  defaultLabel: 'Spell Check',
  defaultEnabled: true,
});

// Re-export so the helper sees pad-wide broadcasts and refreshes our state
// when another user toggles the pad-wide checkbox.
exports.handleClientMessage_CLIENT_MESSAGE = spellcheckToggle.handleClientMessage_CLIENT_MESSAGE;

exports.postAceInit = () => {
  // The `spellcheck` attribute is inherited from the nearest ancestor that
  // sets it, so we only need to toggle it on #innerdocbody. Walking every
  // <div>/<span> descendant (the previous behavior) is O(n) in line count
  // and multiplied the browser's already-slow per-keystroke spellchecking
  // work — observable as typing lag on pads with > a few hundred lines (#26).
  const $inner = $('iframe[name="ace_outer"]').contents().find('iframe')
      .contents().find('#innerdocbody');

  spellcheckToggle.init({
    onChange: (enabled) => {
      $inner.attr('spellcheck', enabled ? 'true' : 'false');
    },
  });
};
