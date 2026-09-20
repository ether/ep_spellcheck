![Publish Status](https://github.com/ether/ep_spellcheck/workflows/Node.js%20Package/badge.svg) [![Backend Tests Status](https://github.com/ether/ep_spellcheck/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_spellcheck/actions/workflows/test-and-release.yml)

# Spell checker for Etherpad

Toggle on/off 'SpellCheck' option in Settings.  Uses your native browser spellchecker

## Browser support

This plugin does not spell check anything itself. All it does is flip the
standard HTML `spellcheck` attribute on the editor body (Etherpad's
`#innerdocbody`) between `true` and `false`. Finding misspellings, choosing a
dictionary and drawing the red underlines is entirely the browser's job.

That means the plugin can only work where the browser ships a spell checker:

| Browser | Misspellings underlined? |
| --- | --- |
| Firefox, Chrome, Edge, Safari on desktop | Yes |
| Chrome on Android, Safari on iOS | Yes |
| **Firefox on Android** | **No** — Gecko's spell checker is compiled out of the Android build, so no web page can get underlines there. See [Mozilla bug 1541697](https://bugzilla.mozilla.org/show_bug.cgi?id=1541697). |

If words are not underlined on Firefox for Android, the toggle is still doing
its job — there is simply no spell checker behind it. Autocorrect suggestions
from the on-screen keyboard are unaffected either way.

## Which dictionary / language is used?

The browser's, not Etherpad's. Etherpad sets `lang` on the outer page from the
UI language, but the editor lives in nested iframes that carry no `lang`
attribute, so the browser falls back to its own default dictionary (whatever
the user configured in the browser or the OS). Changing the Etherpad interface
language does not change the spell checking language.

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
