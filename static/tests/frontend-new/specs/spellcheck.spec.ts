import {expect, test} from '@playwright/test';
import {goToNewPad} from 'ep_etherpad-lite/tests/frontend-new/helper/padHelper';

test.beforeEach(async ({page}) => {
  await goToNewPad(page);
});

test.describe('ep_spellcheck', () => {
  test('Spellcheck is on by default when not disabled', async ({page}) => {
    // ep_spellcheck flips the spellcheck attribute on the inner editor
    // body. Under Firefox the nested ace_inner iframe can be late to
    // attach; wait for it before dereferencing, and read the attribute
    // through the iframe element directly so a delayed body element
    // doesn't keep us in a 90s test timeout.
    await expect.poll(
        async () => page.frame('ace_inner') != null,
        {timeout: 10_000})
        .toBe(true);
    const innerFrame = page.frame('ace_inner')!;
    await expect.poll(
        async () => {
          const body = innerFrame.locator('body');
          if (await body.count() === 0) return null;
          return body.getAttribute('spellcheck');
        },
        {timeout: 10_000})
        .toBe('true');
  });
});
