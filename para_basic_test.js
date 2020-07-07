const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const app = require('./app');
describe('Test', function() {
  let iframeId = 'ide-application-iframe';
  this.timeout(30000);
  before(async function() {
  
    let stack = process.env.POPCORNSAR_STUDIO_STACK;
    let username = process.env.POPCORNSAR_STUDIO_USERNAME;
    let password = process.env.POPCORNSAR_STUDIO_PASSWORD;
    let url = process.env.POPCORNSAR_STUDIO_URL;

    await app.init(url);
    console.log('init success')
    /* await app.maximizeBrowser();
    await app.login(username, password);
    await app.selectWorkspace(stack); */
   
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
      
      




  })
  

})