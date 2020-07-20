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
        
    
          it('Test4: problems check' , async function() {
            let fileName = 'global_supervision.cpp';
            let fileTree = 'PARA1903_sample/para_PAA/phm';
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
          
    
          
          
          it('Test5: SSH qemu', async function() {
            let menubarName = 'Terminal';
            let subMenubarName = 'New Terminal';
            let tabId = 'shell-tab-explorer-view-container';
            let command = 'ssh qemu-env@localhost';
            let compareContext = 'Welcome to Ubuntu 18.04.4 LTS';
            let expectedResult = 'No Results';        
            
            await app.openMenuBar(menubarName);
            await app.openSubMenu(subMenubarName);
     
            await app.execCommand(command);
            await app.copyTerminalTextToClipboard();
            
            await app.createNewFile();
            await app.performPasteAction();
            assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
            await app.saveFile();
            await app.closeAllTabsInMainArea();
            //await app.exitTerminal();
          })

          /* it('Test6: check CPATH', async function() {
            let menubarName = 'Terminal';
            let subMenubarName = 'New Terminal';
            let command = 'echo $CPATH';
            let compareContext = '/opt/para-sdk/sysroots/core2-64-poky-linux/usr/include/c++/8.2.0/x86_64-poky-linux:/opt/para-sdk/sysroots/core2-64-poky-linux/usr/include/c++/8.2.0:/opt/para-sdk/sysroots/core2-64-poky-linux/usr/include:';
            let expectedResult = 'No Results';
            await app.openMenuBar(menubarName);
            await app.openSubMenu(subMenubarName);
            await app.sleep(3000);
            await app.execCommand(command);
            await app.copyTerminalTextToClipboard();
            await app.createNewFile();
            await app.performPasteAction();
            assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
            await app.saveFile();
            await app.closeAllTabsInMainArea();
            //await app.exitTerminal();
          }) */
    
        /* it('Test7: cpp debugging', async function() {
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
          await app.sleep(1000);
          await app.openTab(tabId);
          await app.addBreakPoint(lineNumber);
          await app.startDebugging(debugOptionVal);
          await app.sleep(8000);
          assert.equal(await app.checkPauseBreakPoint(), expectedResult);
    
          await app.stopDebugging();
          await app.sleep(2000);
          await app.openMenuBar(menubarName2);
          await app.openSubMenu(subMenubarName2); 
          await app.openTab(tabId);
        })
    
        it('Test8: ara-api auto complete check', async function() {
          let fileName = 'main.cpp';
          let fileTree = 'PARA1903_sample/para_PAA/em';
          let lineNumber = '22'
          let expectedResult =  ' phm'
            
          await app.findFile(fileName, fileTree);
          await app.sleep(3000);
          //await app.pageDown();
          assert.equal(await app.checkAraAutoComplete(lineNumber), expectedResult);
        })
 */
    
      
          



  })
  

})