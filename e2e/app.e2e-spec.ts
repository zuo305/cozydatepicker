import { NewdatepickerPage } from './app.po';

describe('newdatepicker App', function() {
  let page: NewdatepickerPage;

  beforeEach(() => {
    page = new NewdatepickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
