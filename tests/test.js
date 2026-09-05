const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("React Application UI Tests", function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        let options = new chrome.Options();
        options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--window-size=1920,1080");

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it("should load the React application", async function () {
        await driver.get("http://localhost:3000");

        await driver.wait(
            until.titleIs("React App"),
            10000
        );

        const title = await driver.getTitle();
        expect(title).to.equal("React App");
    });

    it("should display the React welcome content", async function () {
        await driver.get("http://localhost:3000");

        const body = await driver.findElement(By.tagName("body"));
        const text = await body.getText();

        expect(text).to.contain("Learn React");
    });
});