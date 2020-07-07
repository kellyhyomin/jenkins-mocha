const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const app = require('./app');
describe('Test', function() {
  let iframeId = 'ide-application-iframe';
  this.timeout(180000);
  before(async function() {
  
    let stack = process.env.POPCORNSAR_STUDIO_STACK;
    let username = process.env.POPCORNSAR_STUDIO_USERNAME;
    let password = process.env.POPCORNSAR_STUDIO_PASSWORD;
    let url = process.env.POPCORNSAR_STUDIO_URL;

    await app.init(url);
    await app.maximizeBrowser();
    
    //await app.selectWorkspace(stack);
   
  });
  beforeEach(async function() {
    //await app.switchIFrame(iframeId);
  });
  after(async function() {
    await app.quit();
  });
  afterEach(async function() {
    //await app.switchDefaultContent();
  });
 
    describe('PARA Basic Test', function() { 
        it('Test: LOGIN', async function() {
          let username = process.env.POPCORNSAR_STUDIO_USERNAME;
          let password = process.env.POPCORNSAR_STUDIO_PASSWORD;
          await app.login(username, password);
        })

        it('Test: SELECT WORKSPACE', async function() {
          let stack = process.env.POPCORNSAR_STUDIO_STACK;
          await app.selectWorkspace(stack);
        })
      
      




  })
  

})