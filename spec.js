// spec.js

/*
I wanted to test a few things in this page and show proof of concept:
1 - The ability to create a project from a tile (e.g., Self Mailer with Card) and dismiss it.
2 - The ability to create a project from a tile and create a project.
3-  The abilities to search.

Known Issues:
- I ran into issues with timing. I googled searches and found workarounds, but the expected .then capability did not work.
- I only tested one tile, but the POC would work for all tiles.
- I found a couple of bugs, one with search and one with creating a project.
  - If searching for something and then doing a subsequent search would result in 'Minimum Quantity is -1'
  - Creating a project did not work at all.
*/
describe('KleerMail Idea Center', function() {
  beforeEach(function () {
    browser.get('https://staging.kleermail.com/spa/index.html#/idea-center');
    // wait for page to load
    browser.manage().timeouts().implicitlyWait(5000);
  });

  it('Self Mailer with Card should show modal and dismiss it', function() {
    // Arrange
    var modal = element(by.id('modal-dialog-cover-screen'));
    expect(modal.getCssValue('display')).toBe('none');
    var selfMailerWithCardButton = element(by.id('tile-create-project-button-6'));

    // Act
    selfMailerWithCardButton.click();
    expect(modal.getCssValue('display')).toBe('block');
    var cancelButton = element(by.id('cancel-button'));
    cancelButton.click();

    // Assert
    expect(modal.getCssValue('display')).toBe('none');
  });

  it('Self Mailer with Card modal should let user enter a project name and create it', function() {
    // Arrange
    var modal = element(by.id('modal-dialog-cover-screen'));
    expect(modal.getCssValue('display')).toBe('none');
    var selfMailerWithCardButton = element(by.id('tile-create-project-button-6'));

    // Act
    selfMailerWithCardButton.click();
    expect(modal.getCssValue('display')).toBe('block');

    var projectNameInput = element(by.id('input'));
    projectNameInput.sendKeys('Hello KleerMail');

    // Assert
    expect(element(by.id('input')).getAttribute('value')).toEqual('Hello KleerMail');

    // Unable to test the create functionality at the moment as the create button is not clickable
    // var createButton = element(by.id('create-button'));
    // createButton.click();
  });

  it('Self Mailer with Card modal should show error when project name is already taken', function() {
    // Arrange
    var modal = element(by.id('modal-dialog-cover-screen'));
    expect(modal.getCssValue('display')).toBe('none');
    var selfMailerWithCardButton = element(by.id('tile-create-project-button-6'));
    selfMailerWithCardButton.click();
    expect(modal.getCssValue('display')).toBe('block');
    var projectNameInput = element(by.id('input'));

    // Act
    projectNameInput.sendKeys('Hello KleerMail');
    browser.sleep(3000); // FIXME: .then(function()) does not work because there is a delay in the input

    // Assert
    expect(element(by.id('input')).getAttribute('value')).toEqual('Hello KleerMail');
    expect(element(by.id('projNameInput')).getAttribute('error-message')).toEqual('Project name is already taken');
  });

  it('should search', function() {
    // Arrange
    var search = element(by.id('spa-search-bar-new-namespace'));

    // Act
    search.sendKeys('Hello KleerMail');

    // Assert
    expect(element(by.id('spa-search-bar-new-namespace')).getAttribute('value')).toEqual('Hello KleerMail');
    expect(element(by.className('disabled-text')).getText()).toEqual('Please enter a valid number');

    // Arrange
    // bug with clearing and waiting
    // https://github.com/angular/protractor/issues/1583
    search.clear();
    browser.sleep(1000);

    // Act
    search.sendKeys('1');
    browser.sleep(1000);

    // Assert
    expect(element(by.className('disabled-text')).getText()).toEqual('Minimum Quantity is 10,000');

    search.clear().sendKeys('10000');
    expect(element(by.className('spa-molecule-tile-price')).getText()).toEqual('$14,730.00');
  });
});
