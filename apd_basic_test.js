
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const app = require('./app');
describe('Test', function() {
  this.timeout(1800000);
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
    describe('Basic Test', function() { 
      beforeEach(async function() {
        let iframeId = 'ide-application-iframe';
        
        await app.sleep(3000);
        await app.switchIFrame(iframeId);
      });
        
      afterEach(async function() {
        await app.switchDefaultContent();
      });
      it('Test2: check projects directory', async function() {
        let menubarName = 'View';
        let subMenubarName = 'Explorer'
        let dirname1 = '.theia';
        let dirname2 = 'apd';
        let dirname3 = 'apd-sample';
        
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName); 

        assert.equal(await app.isExistDir(dirname1), true);
        assert.equal(await app.isExistDir(dirname2), true);
        assert.equal(await app.isExistDir(dirname3), true);

        await app.closeTabExplorer();
      })

      it('Test4: python3 path check' , async function() {
        let menubarName = 'View';
        let subMenubarName = 'Explorer';
        let dirname = '.theia';
        let filename = 'settings.json';
        let text = '//*[@id="code-editor-opener:file:///projects/.theia/settings.json"]/div/div[1]/div[2]/div[1]/div[4]/div[2]/span/span[4]';
        let pythonPath = '"/usr/bin/python3"';        

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.openProjectsDir(dirname);
        await app.openProjectsFile(dirname, filename);
        
        assert.equal(await app.containTextInFile(text), pythonPath);
        //await app.closeTabExplorer();
      })

      it('Test5: clangTidy check' , async function() {
        let menubarName = 'View';
        let subMenubarName = 'Explorer';
        let dirname = '.theia';
        let filename = 'settings.json';
        let text = '//*[@id="code-editor-opener:file:///projects/.theia/settings.json"]/div/div[1]/div[2]/div[1]/div[4]/div[8]/span/span[4]';
        let clangTidyCheck = '",-readability-"';        

        /* await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.openProjectsDir(dirname);
        await app.openProjectsFile(dirname, filename);  */

        assert.equal(await app.containTextInFile(text), clangTidyCheck);
        await app.closeTabExplorer();
        await app.closeAllTabsInMainArea();
      })

      /* it('Test case6 - launch.json debug setting check', async function() {
        let menubarName = 'View';
        let subMenubarName = 'Explorer';
        let dirname = '.theia';
        let filename = 'launch.json';
        let text = '//*[@id="code-editor-opener:file:///projects/.theia/settings.json"]/div/div[1]/div[2]/div[1]/div[4]/div[2]/span/span[4]';
        let pythonPath = '"/usr/bin/python3"';        

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.openProjectsDir(dirname);
        await app.openProjectsFile(dirname, filename);

        assert.equal(await app.containTextInFile(text), pythonPath);

        await app.closeTabExplorer();
        await app.closeAllTabsInMainArea();
      }) */

      it('Test6: problems check' , async function() {
        let fileName = 'package_management_application.cpp';
        let fileTree = 'apd-sample/ara-api/ucm/pkgmgr/src';
        let menubarName = 'View';
        let subMenubarName = 'Problems';
        
        await app.findFile(fileName, fileTree);
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        assert.equal(await app.checkProblems(), true);
        await app.sleep(5000);
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.closeAllTabsInMainArea();
      })
      
      it('Test7: SSH qemu', async function() {
        let menubarName = 'Terminal';
        let subMenubarName = 'New Terminal';
        let tabId = 'shell-tab-explorer-view-container';
        let command = 'ssh qemu-env@localhost';
        let compareContext = 'Welcome to Ubuntu 18.04.4 LTS';
        let expectedResult = 'No Results';        
        
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
 
        await app.execCommand(command);
        await app.sleep(3000);
        await app.copyTerminalTextToClipboard();
        
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
        await app.saveFile();
        await app.closeAllTabsInMainArea();
        //await app.exitTerminal();
      })

  
      it('Test8: check CPATH', async function() {
        let menubarName = 'Terminal';
        let subMenubarName = 'New Terminal';
        let command = 'echo $CPATH';
        let compareContext = '/opt/apd_sdk/sysroots/core2-64-poky-linux/usr/include/c++/8.2.0:/opt/apd_sdk/sysroots/core2-64-poky-linux/usr/include/c++/8.2.0/x86_64-poky-linux:/opt/apd_sdk/sysroots/core2-64-poky-linux/usr/include:';
        let expectedResult = 'No Results';
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.sleep(3000);
        await app.execCommand(command);
        await app.sleep(3000);
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
        await app.saveFile();
        await app.closeAllTabsInMainArea();
        //await app.exitTerminal();
      })

    it('Test9: python debugging check', async function() {
        let fileName = 'view.py';
        let fileTree = 'apd-sample/ara-api/apd/ara-gen/generator/views';
        let tabId = 'shell-tab-debug';
        let debugOptionVal = 'Python3 debug__CONF__file:///projects';
        let lineNumber = '47';
        let expectedResult = 'PAUSED ON STEP';
        let menubarName = 'Debug';
        let subMenubarName = 'Remove All Breakpoints';

        await app.findFile(fileName, fileTree);
        await app.openTab(tabId);
        await app.pageDown();
        await app.pageDown();
        await app.addBreakPoint(lineNumber);
        await app.startDebugging(debugOptionVal);
        await app.sleep(5000);
        assert.equal(await app.checkPauseBreakPoint(), expectedResult);

        await app.stopDebugging();
        await app.sleep(3000);
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName); 
        await app.sleep(3000);
        await app.closeAllTabsInMainArea();

    })

    it('Test10: cpp debugging', async function() {
      let newFileName = 'hello.cpp';
      let input = '#include <iostream> \n using std::cout; \n using std::endl; \n int main() \n { \n cout << "Hello, World!" << endl; \n return 0; \n ';
      let menubarName = 'Terminal';
      let subMenubarName = 'New Terminal';
      let menubarName2 = 'Debug';
      let subMenubarName2 = 'Remove All Breakpoints';
      let command1 = 'unset CPATH';
      let command2 = 'g++ -g hello.cpp -o hello.out';
      let tabId = 'shell-tab-debug';
      let debugOptionVal = 'C++14 debug__CONF__file:///projects';
      let lineNumber = '5';
      let expectedResult = 'PAUSED ON BREAKPOINT';
      let menubarName3 = 'View';
      let subMenubarName3 = 'Explorer';
      
      await app.createNewFile(newFileName);
      await app.inputText(input);

      await app.openMenuBar(menubarName);
      await app.openSubMenu(subMenubarName); 

      await app.execCommand(command1);
      await app.execCommand(command2);
      
      //await app.openTab(tabId);
      await app.addBreakPoint(lineNumber);
      await app.startDebugging(debugOptionVal);
      await app.sleep(10000);
      assert.equal(await app.checkPauseBreakPoint(), expectedResult);

      await app.stopDebugging();
      await app.sleep(2000);
      await app.openMenuBar(menubarName2);
      await app.openSubMenu(subMenubarName2); 
      await app.sleep(1000);
      await app.openTab(tabId);
      await app.sleep(1000);
    })

    it('Test11: ara-api auto complete check', async function() {
      let fileName = 'application.cpp';
      let fileTree = 'apd-sample/sample-applications/phm_examples/phm_demo/src';
      let lineNumber = '68'
      let expectedResult =  ' ucm'
      /* let menubarName = 'Terminal';
      let subMenubarName = 'New Terminal';

      await app.openMenuBar(menubarName);
      await app.openSubMenu(subMenubarName);  */
      await app.sleep(3000);
      await app.findFile(fileName, fileTree);
      
      await app.pageDown();
      await app.pageDown();
      await app.pageDown();
      await app.sleep(3000);
      assert.equal(await app.checkAraAutoComplete(lineNumber), expectedResult);
    })

  })
  

})