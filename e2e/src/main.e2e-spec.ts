import { MainPage } from "~e2e/src/main.po";

describe("Project tcr-baixa-frontend", () => {
    let mainPage: MainPage;

    beforeEach(() => {
        mainPage = new MainPage();
    });

    it("should display project name", () => {
        mainPage.navigateTo();
        expect(mainPage.getTitleText()).toEqual("tcr-baixa-frontend".toUpperCase());
    });
});
