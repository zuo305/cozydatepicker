import { TempProjectPage } from './app.po';

describe('temp-project App', function() {
  let page: TempProjectPage;

  beforeEach(() => {
    page = new TempProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
