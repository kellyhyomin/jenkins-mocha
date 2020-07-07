const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const app = require('./app');
describe('Test', function() {
  this.timeout(600000);
  before(async function() {
    let url = process.env.POPCORNSAR_STUDIO_URL;
    await app.init(url);
    await app.maximizeBrowser();
  });
  after(async function() {
    await app.quit();
  });

    describe('CHE TEST', function() { 
        it('Test: LOGIN', async function() {
          let username = process.env.POPCORNSAR_STUDIO_USERNAME;
          let password = process.env.POPCORNSAR_STUDIO_PASSWORD;
          await app.login(username, password);
        })

        it('Test: SELECT WORKSPACE', async function() {
          let stack = process.env.POPCORNSAR_STUDIO_STACK;
          await app.selectWorkspace(stack);
        })
        // workspace 없을 시 생성 
    })
    describe('PARA BASIC TEST', function() { 
      beforeEach(async function() {
        let iframeId = 'ide-application-iframe';
        await app.sleep(3000);
        await app.switchIFrame(iframeId);
      });
        
      afterEach(async function() {
        await app.switchDefaultContent();
      });
      it('Task: Open qemu-env terminal 1', async function() {
          let taskLabel = 'Open qemu-env terminal 1';
          let compareContext = 'Welcome to Ubuntu 18.04.4 LTS';
          let expectedResult = 'No Results';
          let menubarName = 'Terminal';
          let subMenubarName = 'Run Task...';
          await app.sleep(10000);
          await app.openMenuBar(menubarName);
          await app.openSubMenu(subMenubarName);
  
          await app.runTask(taskLabel);
          await app.sleep(5000);
      
          await app.copyTerminalTextToClipboard();
          await app.createNewFile();
          await app.performPasteAction();
          assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
  
          await app.saveFile();
          await app.closeAllTabsInMainArea();
  
      })
  
      it('Task: R19-03 ara::com Generator', async function() {
          let taskLabel = 'R19-03 ara::com Generator';
          let compareContext = 'EXIT PROGRAM';
          let expectedResult = 'No Results';
          let menubarName = 'Terminal';
          let subMenubarName = 'Run Task...';
          await app.sleep(2000);
          await app.openMenuBar(menubarName);
          await app.openSubMenu(subMenubarName);
          
          await app.runTask(taskLabel);
          await app.sleep(20000);
      
          await app.copyTerminalTextToClipboard();
          await app.createNewFile();
          await app.performPasteAction();
          assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
  
          await app.saveFile();
          await app.closeAllTabsInMainArea();
  
      })
  
      it('Task: R19-03 ara::exec Generator', async function() {
          let taskLabel = 'R19-03 ara::exec Generator';
          let compareContext = 'EXIT PROGRAM';
          let expectedResult = 'No Results';
          let menubarName = 'Terminal';
          let subMenubarName = 'Run Task...';
          await app.sleep(2000);
          await app.openMenuBar(menubarName);
          await app.openSubMenu(subMenubarName);
  
          await app.runTask(taskLabel);
          await app.sleep(20000);
      
          await app.copyTerminalTextToClipboard();
          await app.createNewFile();
          await app.performPasteAction();
          assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
  
          await app.saveFile();
          await app.closeAllTabsInMainArea();
  
      })  
    })

  

})