require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = require('selenium-webdriver');
let driver = new Builder().forBrowser('chrome').setChromeOptions(
  new chrome.Options().addArguments(['--headless','--no-sandbox', '--window-size=1980,1080'])).build();
let activeElement = driver.switchTo().activeElement();

module.exports = {
  init: async function (url) {
    await driver.get(url);
  },

  quit: async function() {
    await driver.quit();
  },

  switchIFrame: async function(iframeId) {
    await driver.switchTo().frame(driver.findElement(By.id(iframeId)));
  },

  switchDefaultContent: async function() {
    await driver.switchTo().defaultContent();
  }, 
  deleteCache: async function() {
    await driver.manage().deleteAllCookies();
  },
  maximizeBrowser: async function() {
    await driver.manage().window().maximize();
  },
  login: async function(username, password) {
    await driver.findElement(By.id('username')).sendKeys(username);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('password')).sendKeys(Key.ENTER);
  },

  selectWorkspace: async function(stack) {
    // await driver.manage().setTimeouts({ implicit: 50000 });
    await this.sleep(3000);
    await driver.wait(until.elementLocated(By.xpath("//*[text() = '" + stack + "']"))).click();
    await driver.wait(until.elementLocated(By.id('open-in-ide-button'))).click();
  },

  sleep: async function(ms) {
    await driver.sleep(ms);
  },
  
  // Menu Bar
  openMenuBar: async function(menubarName) {
    let MENUBAR_XPATH = "//div[@class='p-MenuBar-itemLabel' and contains(text(),'"+ menubarName + "')]";
    await driver.wait(until.elementLocated(By.xpath(MENUBAR_XPATH))).click();
  },
  openSubMenu: async function(subMenubarName) {
    let SUB_MENUBAR_XPATH = "//div[@class='p-Menu-itemLabel' and contains(text(),'"+ subMenubarName + "')]";
    await driver.wait(until.elementLocated(By.xpath(SUB_MENUBAR_XPATH))).click();
  },
  closeTabExplorer: async function() {
    let TAB_EXPLORER_ID = 'shell-tab-explorer-view-container'
    await (await driver.wait(until.elementLocated(By.id(TAB_EXPLORER_ID)))).click();
  },
  // End Menu Bar 

  openProjectsDir: async function(dirname) {
    await driver.wait(until.elementLocated(By.id("/projects:/projects/" + dirname))).click();
  },

  openProjectsFile: async function(dirname, filename) {
    await driver.wait(until.elementLocated(By.id("/projects:/projects/" + dirname + "/" + filename))).click();
  },

  closeTerminal: async function() {

  },
  closeAllTabsInMainArea: async function() {
    await driver.findElement(By.id('theia-main-content-panel')).click();
    await driver.switchTo().activeElement().sendKeys(Key.ALT,Key.SHIFT,'w' + Key.ENTER);
    //await driver.switchTo().activeElement().sendKeys(Key.ENTER);
  },
  saveFile: async function() {
    await driver.findElement(By.id('theia-main-content-panel')).click();
    await driver.switchTo().activeElement().sendKeys(Key.CONTROL,'s');
  },
  
  isExistDir: async function(dirname) {
    return await driver.wait(until.elementLocated(By.id("/projects:/projects/" + dirname))).isDisplayed();
  },
  containTextInFile: async function(text) {
    return await driver.wait(until.elementLocated(By.xpath(text))).getText();    
  },


  execCommand: async function(command) {
    await driver.switchTo().activeElement().sendKeys(command + Key.ENTER);
  },

  copyTerminalTextToClipboard: async function() {
    await driver.actions({bridge: true}).move({x: 52, y: 623}).pause(driver.actions().mouse()).press().move({x: 413, y: 623})
        .release().keyDown(Key.CONTROL).keyDown('c').keyUp(Key.CONTROL).keyUp('c').perform();
    await driver.sleep(3000);
  },

  createNewFile: async function(newFileName) {
    let THIEA_DIALOG_SHELL_XPATH = '//*[@id="theia-dialog-shell"]/div/div[2]/input';
    await driver.findElement(By.id('theia-main-content-panel')).click();
    await driver.switchTo().activeElement().sendKeys(Key.ALT + 'n');
    if (newFileName === undefined) {
      await this.sleep(2000);
      await driver.switchTo().activeElement().findElement(By.xpath('//*[@id="theia-dialog-shell"]/div/div[3]/button')).click();
    } else {
      await driver.switchTo().activeElement().findElement(By.xpath(THIEA_DIALOG_SHELL_XPATH)).sendKeys(Key.BACK_SPACE + newFileName + Key.ENTER);
    }
    await driver.sleep(3000);
    
  },

  performPasteAction: async function() {
    await driver.switchTo().activeElement().sendKeys(Key.chord(Key.CONTROL, "v"));
    await driver.sleep(3000);
  },

  isTextPresentInTerminalOutput: async function(compareContext) {
      let result = '';
      await driver.switchTo().activeElement().sendKeys(Key.chord(Key.CONTROL, "f") + compareContext).then(async function() {
      let element = await driver.findElements(By.className('matchesCount'));
      let currentElement = element.pop();
      result = currentElement.getText();      
    })
    return result;
  },
   
  inputText: async function(input) {
    await driver.findElement(By.id('theia-main-content-panel')).click();
    await driver.switchTo().activeElement().sendKeys(input + Key.chord(Key.CONTROL, 's'));
    await driver.sleep(6000);
  },  
  
  exitTerminal: async function() {
    await driver.switchTo().activeElement().sendKeys('exit' + Key.ENTER);
  },

  findFile: async function(fileName, fileTree) {
    await driver.wait(until.elementLocated(By.id("theia-main-content-panel"))).click();
    await driver.switchTo().activeElement().sendKeys(Key.CONTROL + 'p');
    await driver.switchTo().activeElement().sendKeys(fileName);
    await this.sleep(1000);
    await driver.wait(until.elementLocated(By.xpath("//span[contains(@title, '" + fileTree + "')]"))).click();
  },

  pageDown: async function() {
    await driver.wait(until.elementLocated(By.id("theia-main-content-panel"))).click();
    await driver.switchTo().activeElement().sendKeys(Key.PAGE_DOWN);
  },

   checkAraAutoComplete: async function(lineNumber) {
    let result = '';
    await driver.wait(until.elementLocated(By.xpath("//div[@class='line-numbers' and text()='"+ lineNumber +"']"))).click().then(async function() {
      await driver.switchTo().activeElement().sendKeys(Key.ARROW_RIGHT + 'ara::' + Key.CONTROL, Key.SPACE).then(async function() {
        let element = await driver.findElements(By.className('monaco-highlighted-label'));
        let currentElement = await element.pop();
        result = await currentElement.getText();      
      })
    })
    await this.sleep(2000);
    await this.undo();
    await this.sleep(2000);
    return result;
  },


  checkProblems: async function() {
    return await driver.wait(until.elementLocated(By.className('fa fa-times-circle error'))).isDisplayed();
  },

  undo: async function() {
    await driver.switchTo().activeElement().sendKeys(Key.chord(Key.CONTROL, 'z'));
  },

  openTab: async function(tabId) {
    await driver.findElement(By.id(tabId)).click();
    await this.sleep(3000);
  },
           
  addBreakPoint: async function(lineNumber) {
    await driver.wait(until.elementLocated(By.id("theia-main-content-panel"))).click();
    await driver.switchTo().activeElement().sendKeys(Key.PAGE_DOWN);
    await driver.switchTo().activeElement().sendKeys(Key.PAGE_DOWN);
    await driver.switchTo().activeElement().sendKeys(Key.PAGE_DOWN);
    await driver.wait(until.elementLocated(By.xpath("//div[@class='line-numbers' and text()='"+ lineNumber +"']"))).click().then(el=>{
      driver.switchTo().activeElement().sendKeys(Key.SHIFT,Key.F9);
    })

    await this.sleep(1000);
  },

  startDebugging: async function(debugOptionVal) {
    // await driver.findElement(By.className('p-Widget p-TabBar theia-app-left theia-app-sides p-BoxPanel-child ps')).click();
    // await driver.findElement(By.id('shell-tab-debug')).click();
    await driver.wait(until.elementLocated(By.className('theia-select debug-configuration'))).sendKeys(debugOptionVal);
    await driver.wait(until.elementLocated(By.className('debug-action theia-debug-start'))).click();
    //await this.sleep(50000);
  },

  checkPauseBreakPoint: async function () {  
    let DEBUG_THREAD_SPAN_STATUS_XPATH = '//*[@id="debug:threads:-1"]/div[1]/div[1]/div/div/div/div/span[2]';
    return await driver.wait(until.elementLocated(By.xpath(DEBUG_THREAD_SPAN_STATUS_XPATH))).getText();
  },

  stopDebugging: async function() {
    await driver.wait(until.elementLocated(By.className('debug-action theia-debug-stop'))).click();
  },

  runTask: async function(taskLabel) {
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), '"+ taskLabel + "')]"))).click();
    await driver.switchTo().activeElement().sendKeys(Key.ENTER);
  }
  

  


  
};