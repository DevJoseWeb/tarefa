import { browser, by, element } from "protractor";

export class MainPage {
    navigateTo() {
        return browser.get("/");
    }

    getTitleText() {
        return element(by.css("s-breadcrumb h1")).getText();
    }
}
