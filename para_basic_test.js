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
        it('Test1: check projects directory', async function() {
            let menubarName = 'View';
            let subMenubarName = 'Explorer'
            let dirname1 = '.theia';
            let dirname2 = 'para_qemu_demo';
            let dirname3 = 'para-qemu';
            let dirname4 = 'PARA1903_generator';
            let dirname5 = 'PARA1903_sample';
            await app.sleep(5000);
            await app.openMenuBar(menubarName);
            await app.openSubMenu(subMenubarName); 
            await app.sleep(3000);
            assert.equal(await app.isExistDir(dirname1), true);
            assert.equal(await app.isExistDir(dirname2), true);
            assert.equal(await app.isExistDir(dirname3), true);
            assert.equal(await app.isExistDir(dirname4), true);
            assert.equal(await app.isExistDir(dirname5), true);
    
            await app.closeTabExplorer();
          })
    
          it('Test2: clangTidy check' , async function() {
            let menubarName = 'View';
            let subMenubarName = 'Explorer';
            let dirname = '.theia';
            let filename = 'settings.json';
            let text = '//*[@id="code-editor-opener:file:///projects/.theia/settings.json"]/div/div[1]/div[2]/div[1]/div[4]/div[8]/span/span[4]';
            let clangTidyCheck = '",-readability-"';        
    
            await app.openMenuBar(menubarName);
            await app.openSubMenu(subMenubarName);
            await app.openProjectsDir(dirname);
            await app.openProjectsFile(dirname, filename); 
    
            assert.equal(await app.containTextInFile(text), clangTidyCheck);
            //await app.closeTabExplorer();
            await app.closeAllTabsInMainArea();
          })

          it('Test3: launch.json debug setting check', async function() {
            let menubarName = 'View';
            let subMenubarName = 'Explorer';
            let dirname = '.theia';
            let filename = 'launch.json';
            let text = '//*[@id="code-editor-opener:file:///projects/.theia/launch.json"]/div/div[1]/div[2]/div[1]/div[4]/div[7]/span/span[4]';
            let text2 = '//*[@id="code-editor-opener:file:///projects/.theia/launch.json"]/div/div[1]/div[2]/div[1]/div[4]/div[18]/span/span[4]';
            let cppDebugProgram = '"${workspaceFolder}/hello.out"';        
            let gdbServerProgram = '"${workspaceFolder}/PARA1903_sample/adaptive_platf';
    
            // await app.openMenuBar(menubarName);
            // await app.openSubMenu(subMenubarName);
             //await app.openProjectsDir(dirname);
             await app.openProjectsFile(dirname, filename); 
             await app.sleep(3000);
            assert.equal(await app.containTextInFile(text), cppDebugProgram);
            assert.equal(await app.containTextInFile(text2), gdbServerProgram);
    
            await app.closeTabExplorer();
            await app.closeAllTabsInMainArea();
          })
    
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
    
      
          



  })
  

})