import { AppPage } from './app.po';
import { browser, logging, by, element, protractor } from 'protractor';

describe('Landing Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(element(by.tagName('h3')).getText()).toEqual('Welcome to Taskboard!');
  });

  it('should be able to register', () => {
    page.navigateTo();
    element(by.buttonText('Log in')).click();
    element(by.id('registerLink')).click();
    
    // Generate unique user that doesn't exist yet by adding number
    const num = Math.ceil(Math.random() * 1000);

    element(by.id('email')).sendKeys('testuser' + num + '@mail.com');
    element(by.id('displayName')).sendKeys('Test User ' + num);
    element(by.id('password')).sendKeys('Password123');
    element(by.id('repeat')).sendKeys('Password123');

    element(by.buttonText('Sign up')).click();
    page.navigateTo();
    
    expect(element(by.tagName('h3')).getText()).toEqual('Welcome to Taskboard!');
  });

  it('should be able to log in', () => {
    page.navigateTo();

    element(by.buttonText('Log in')).click();
    element(by.id('email')).sendKeys('victor@gmail.com');
    element(by.id('password')).sendKeys('test123');
    element(by.id('logInBtn')).click();

    expect(element(by.buttonText('Sign Out'))).toBeDefined();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
