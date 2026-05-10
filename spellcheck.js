'use strict';

const {padToggle} = require('ep_plugin_helpers/pad-toggle-server');

// Parallel User Settings + Pad Wide Settings checkboxes for "Spell Check".
// Helper owns markup, storage, broadcast, enforce, and i18n wiring.
const spellcheckToggle = padToggle({
  pluginName: 'ep_spellcheck',
  settingId: 'spellcheck',
  l10nId: 'ep_spellcheck.spellcheck',
  defaultLabel: 'Spell Check',
  defaultEnabled: true,
});

// Older settings.json used `ep_spellcheck.disabledByDefault: true` to flip
// the checkbox off. Translate to the helper's `defaultEnabled` so existing
// installs keep their current behavior after the conversion.
exports.loadSettings = async (hookName, args) => {
  const ps = args && args.settings && args.settings.ep_spellcheck;
  if (ps && typeof ps.defaultEnabled !== 'boolean' &&
      typeof ps.disabledByDefault === 'boolean') {
    ps.defaultEnabled = !ps.disabledByDefault;
  }
  return spellcheckToggle.loadSettings(hookName, args);
};

exports.clientVars = spellcheckToggle.clientVars;
exports.eejsBlock_mySettings = spellcheckToggle.eejsBlock_mySettings;
exports.eejsBlock_padSettings = spellcheckToggle.eejsBlock_padSettings;
