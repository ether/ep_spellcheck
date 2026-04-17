'use strict';

const padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;

const postAceInit = (hook, context) => {
  const $outer = $('iframe[name="ace_outer"]').contents().find('iframe');
  const $inner = $outer.contents().find('#innerdocbody');
  // The `spellcheck` attribute is inherited from the nearest ancestor that
  // sets it, so we only need to toggle it on #innerdocbody. The previous
  // implementation walked every <div>/<span> descendant on every toggle,
  // which is O(n) in line count and multiplied the browser's already-slow
  // per-keystroke spellchecking work — observable as typing lag on pads
  // with more than a few hundred lines (#26). Setting the attribute once
  // on the contenteditable root is equivalent for the browser's checker.
  const spellcheck = {
    enable: () => { $inner.attr('spellcheck', 'true'); },
    disable: () => { $inner.attr('spellcheck', 'false'); },
  };
  /* init */
  if (padcookie.getPref('spellcheck') === false) {
    $('#options-spellcheck').val();
    $('#options-spellcheck').attr('checked', 'unchecked');
    $('#options-spellcheck').attr('checked', false);
  } else {
    $('#options-spellcheck').attr('checked', 'checked');
  }

  if ($('#options-spellcheck').is(':checked')) {
    spellcheck.enable();
  } else {
    spellcheck.disable();
  }

  /* on click */
  $('#options-spellcheck').on('click', () => {
    if ($('#options-spellcheck').is(':checked')) {
      padcookie.setPref('spellcheck', true);
      spellcheck.enable();
    } else {
      padcookie.setPref('spellcheck', false);
      spellcheck.disable();
    }
    // The previous code force-reloaded the page on Chrome via
    // `window.browser.chrome`. That check was always a no-op on Chrome
    // (Chrome has no `window.browser` object — it's the Firefox
    // WebExtension API) and would have thrown a TypeError on Firefox.
    // Toggling the spellcheck attribute takes effect in every current
    // browser without a reload, so just drop the reload.
  });
};
exports.postAceInit = postAceInit;
