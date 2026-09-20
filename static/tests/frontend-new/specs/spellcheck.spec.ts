import {expect, test} from '@playwright/test';
import {goToNewPad} from 'ep_etherpad-lite/tests/frontend-new/helper/padHelper';
import {showSettings} from 'ep_etherpad-lite/tests/frontend-new/helper/settingsHelper';

// Reads the `spellcheck` attribute off the inner editor body. Under
// Firefox the nested ace_inner iframe can be late to attach; wait for it
// before dereferencing, and read the attribute through the iframe element
// directly so a delayed body element doesn't keep us in a 90s test timeout.
const spellcheckAttr = async (page: import('@playwright/test').Page) => {
  await expect.poll(
      async () => page.frame('ace_inner') != null,
      {timeout: 10_000})
      .toBe(true);
  const innerFrame = page.frame('ace_inner')!;
  const body = innerFrame.locator('body');
  if (await body.count() === 0) return null;
  return body.getAttribute('spellcheck');
};

test.beforeEach(async ({page}) => {
  await goToNewPad(page);
});

test.describe('ep_spellcheck', () => {
  test('Spellcheck is on by default when not disabled', async ({page}) => {
    // ep_spellcheck flips the spellcheck attribute on the inner editor body.
    await expect.poll(async () => await spellcheckAttr(page), {timeout: 10_000})
        .toBe('true');
  });

  test('Unchecking Spell Check turns it off, re-checking turns it back on',
      async ({page}) => {
        // Core sets spellcheck="false" on #innerdocbody while building the
        // editor, so a toggle that silently no-ops looks exactly like
        // "spell check is off". Assert both edges of the round trip.
        await expect.poll(async () => await spellcheckAttr(page), {timeout: 10_000})
            .toBe('true');

        await showSettings(page);
        // The <label> sits on top of the checkbox, so click the label —
        // clicking the input directly is intercepted.
        await page.locator('label[for="options-spellcheck"]').click();
        await expect.poll(async () => await spellcheckAttr(page), {timeout: 10_000})
            .toBe('false');

        await page.locator('label[for="options-spellcheck"]').click();
        await expect.poll(async () => await spellcheckAttr(page), {timeout: 10_000})
            .toBe('true');
      });
});
