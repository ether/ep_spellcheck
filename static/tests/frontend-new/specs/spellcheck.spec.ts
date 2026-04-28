import {expect, test} from '@playwright/test';
import {goToNewPad} from 'ep_etherpad-lite/tests/frontend-new/helper/padHelper';

test.beforeEach(async ({page}) => {
  await goToNewPad(page);
});

test.describe('ep_spellcheck', () => {
  test('Spellcheck is on by default when not disabled', async ({page}) => {
    // ep_spellcheck flips the spellcheck attribute on the inner editor
    // body. Wait up to 5s in case it's set asynchronously after pad init.
    const innerFrame = page.frame('ace_inner')!;
    await expect.poll(
        async () => innerFrame.locator('body').getAttribute('spellcheck'),
        {timeout: 5_000})
        .toBe('true');
  });
});
