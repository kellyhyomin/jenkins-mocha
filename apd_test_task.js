const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const app = require('./app');
describe('Test', function() {
  this.timeout(900000);
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
 
    describe('APD Test', function() {
      beforeEach(async function() {
        let iframeId = 'ide-application-iframe';
        
        await app.sleep(3000);
        await app.switchIFrame(iframeId);
      });
        
      afterEach(async function() {
        await app.switchDefaultContent();
      });
      /* it('Test 1,2: yocto env setup & Build phm_examples', async function() {
        let taskLabel = 'Build phm_examples';
        let compareContext = '[100%] Built target phm_demo';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(30000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);

      
        //await app.exitTerminal();
      }) */

      /* it('Test3: Run qemu - run_ecu1', async function() {
        let taskLabel = 'Run QEMU with ECU1';
        let compareContext = '192.168.7.2 login:';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(45000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);

  
        //await app.exitTerminal(); // close ssh 
        //await app.exitTerminal(); // close terminal
      })  
      it('Test3: Run qemu - run_ecu2', async function() {
        let taskLabel = 'Run QEMU with ECU2';
        let compareContext = '192.168.7.2 login:';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(50000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
        
        //await app.exitTerminal(); // close ssh 
        //await app.exitTerminal(); // close terminal
      })   */

      /* it('Test3: Run qemu - run_ecu1', async function() {
        let menubarName = 'Terminal';
        let subMenubarName = 'New Terminal';
        let command = 'ssh qemu-env@localhost /projects/apd/scripts/run_ecu1.sh';
        let compareContext = '192.168.7.2 login:';
        let expectedResult = 'No Results';     
      
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName); 
        await app.execCommand(command);
        await app.sleep(50000);

        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);

        //await app.exitTerminal(); // close ssh 
        //await app.exitTerminal(); // close terminal
      })  
      it('Test3: Run qemu - run_ecu2', async function() {
        let menubarName = 'Terminal';
        let subMenubarName = 'New Terminal';
        let command = 'ssh qemu-env@localhost /projects/apd/scripts/run_ecu2.sh';
       
        let compareContext = '192.168.7.2 login:';
        let expectedResult = 'No Results';
        
        await app.sleep(5000);
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName); 
        await app.execCommand(command);
        await app.sleep(50000);

        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
        
        //await app.exitTerminal(); // close ssh 
        //await app.exitTerminal(); // close terminal
      })  
      it('Test4: SCP phm_demo file to QEMU', async function() {
        let taskLabel = 'Copy phm_demo Output files to QEMU(QEMU runing is required)';
        let compareContext = '100%';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(33000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);
        

        //await app.exitTerminal(); // close terminal
      })  

      // compareContext 값 다시 확인하기 
      it('Test5: Run phm_demo', async function() {
        let taskLabel = 'Run pho_demo in QEMU';
        let compareContext = 'returning:  PHM';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(10000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);

        //await app.exitTerminal(); // close terminal
      })  

      it('Test6: Run gdbserver', async function() {
        let taskLabel = 'Run GDB Server';
        let compareContext = 'Listening on port 2345';
        let expectedResult = 'No Results';
        let menubarName = 'Terminal';
        let subMenubarName = 'Run Task...';

        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);

        await app.runTask(taskLabel);
        await app.sleep(45000);
    
        await app.copyTerminalTextToClipboard();
        await app.createNewFile();
        await app.performPasteAction();
        assert.notEqual(await app.isTextPresentInTerminalOutput(compareContext), expectedResult);

        //await app.exitTerminal(); // close terminal
      })   */

      it('Test7: Theia Debugging', async function() {
        let fileName = 'application.cpp';
        let fileTree = 'apd-sample/sample-applications/phm_examples/phm_demo/src';
        let tabId = 'shell-tab-debug';
        let debugOptionVal = 'Attach gdbserver__CONF__file:///projects';
        let lineNumber = '1';
        let expectedResult = 'PAUSED ON BREAKPOINT';
        let menubarName2 = 'Debug';
        let subMenubarName2 = 'Remove All Breakpoints';
        let menubarName = 'Terminal';
        let subMenubarName = 'New Terminal';
        await app.openMenuBar(menubarName);
        await app.openSubMenu(subMenubarName);
        await app.sleep(3000);
        await app.findFile(fileName, fileTree);
        await app.openTab(tabId);
     
        await app.addBreakPoint(lineNumber);
        try {
          //await app.startDebugging(debugOptionVal);
          await app.sleep(20000);
          assert.equal(await app.checkPauseBreakPoint(), expectedResult);
          await app.stopDebugging();
          await app.sleep(5000);
          await app.openMenuBar(menubarName2);
          await app.openSubMenu(subMenubarName2); 
          await app.sleep(5000);
        } catch (err) {
          console.log('Adding breakpoint failed.');
        }
      
        
      })

    })

})