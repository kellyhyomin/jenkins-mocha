const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  const width = 640;
  const height = 480;
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(
    new chrome.Options().headless().windowSize({width, height})).build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();