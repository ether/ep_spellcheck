'use strict';

describe('Spellcheck', function () {
  // create a new pad before each test run
  beforeEach(function (cb) {
    helper.newPad(cb);
    this.timeout(60000);
  });

  it("Checks Spellcheck is on by default if it isn't disabled", function (done) {
    this.timeout(60000);
    const $inner = helper.padInner$;

    let shouldBeOn = true;
    if (settings.spellcheck === true) {
      // Spellcheck should be on.
    } else if (settings.spellcheck.disabledByDefault) {
      shouldBeOn = false;
    }

    helper.waitFor(() => ($inner.attr('spellcheck') === shouldBeOn)).done(() => {
      expect($inner.attr('spellcheck') === shouldBeOn);
      done();
    });
  });
});
