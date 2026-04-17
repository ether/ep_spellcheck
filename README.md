![Publish Status](https://github.com/ether/ep_spellcheck/workflows/Node.js%20Package/badge.svg) [![Backend Tests Status](https://github.com/ether/ep_spellcheck/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_spellcheck/actions/workflows/test-and-release.yml)

# Spell checker for Etherpad

Toggle on/off 'SpellCheck' option in Settings.  Uses your native browser spellchecker

## Set spellcheck off as default

1. Open `settings.json`
2. Append:
``ep_spellcheck: { disabledByDefault : true }``

## TODO

* Remember user settings as cookies

## Installation

Install from the Etherpad admin UI (**Admin → Manage Plugins**,
search for `ep_spellcheck` and click *Install*), or from the Etherpad
root directory:

```sh
pnpm run plugins install ep_spellcheck
```

> ⚠️ Don't run `npm i` / `npm install` yourself from the Etherpad
> source tree — Etherpad tracks installed plugins through its own
> plugin-manager, and hand-editing `package.json` can leave the
> server unable to start.

After installing, restart Etherpad.
