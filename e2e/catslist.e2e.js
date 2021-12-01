


describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have List view screen', async () => {
    await expect(element(by.id('catsListView'))).toBeVisible();
  });
});
