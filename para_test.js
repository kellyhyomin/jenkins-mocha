const assert = require('assert')
const app = require('./app');
const url = process.env.POPCORNSAR_STUDIO_URL;
const username = process.env.POPCORNSAR_STUDIO_USERNAME;
const password = process.env.POPCORNSAR_STUDIO_PASSWORD;
const stack = process.env.POPCORNSAR_STUDIO_STACK;
let workspaceName = '';
describe('Test', function() {
  this.timeout(600000);
  before(async function() {
    await app.init(url);
  });
  after(async function() {
    await app.quit();
  });

    describe('Login and wait dashboard', function() {
        it('Login', async function() {
          await app.sleep(3000);
          await app.login(username, password);
        })
        // create workspace
        it('Open New Workspace page', async function() {
          await app.openPageByUI();
        })
        it('Create and open workspace', async function() {
          workspaceName = await app.getRandomWorkspaceName();
          await app.createAndOpenWorkspace(stack);
        })
        it('Wait IDE availability', async function() {
          await app.waitWorkspaceAndIde();
        })
    })
    describe('PARA TEST', function() { 
      it('Task: Open qemu-env terminal 1', async function() {
        let taskLabel = 'Open qemu-env terminal 1';
        let compareContext = 'Welcome to Ubuntu 18.04.4 LTS';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';
        await app.sleep(6000);
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
        await app.maximizeBrowser();
        await app.sleep(5000);
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        
        await app.runTask(taskLabel);
        await app.sleep(40000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.sleep(5000);
        await app.performPasteAction();
        await app.sleep(5000);
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

  describe('Stop and remove workspace', function() {
      it('Delete workspace', async function() {
          await app.deleteWorkspace(workspaceName);
      })
  })

    

})