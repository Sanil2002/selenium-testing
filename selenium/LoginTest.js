import { Builder, By, until } from 'selenium-webdriver';

async function getElement(driver, locator) {                                                                       //This function is designed to handle StaleElementReferenceError, which occurs when the element you're trying to interact with is no longer attached to the DOM.
    for (let i = 0; i < 3; i++) {
        try {
            return await driver.findElement(locator);
        } catch (error) {
            if (error.name === 'StaleElementReferenceError') {
                console.log('Retrying to find element due to StaleElementReferenceError...');
                await driver.sleep(1000);                                                                         // Wait before retrying
            } else {
                throw error;
            }
        }
    }
    throw new Error('Element could not be found after multiple attempts.');
}


(async function testLogin() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        await driver.get('http://localhost:5173');

        let usernameField = await driver.findElement(By.id('email'));
        await usernameField.sendKeys('sanilm4637@gmail.com');

        let passwordField = await driver.findElement(By.id('password'));
        await passwordField.sendKeys('12345');

        let loginButton = await driver.findElement(By.css('button'));
        await loginButton.click();

        await driver.wait(until.urlIs('http://localhost:5173/successfull'), 5000);
        console.log('Login with valid credentials: Success! Navigated to successfull page');

        await driver.get('http://localhost:5173');

        usernameField = await getElement(driver, By.id('email'));                                                  // Re-locate. Elements are re-located before each interaction to ensure they are up-to-date and not stale. 
        await usernameField.clear();                                                                               //....This is especially important after page navigation or when the DOM changes.
        await usernameField.sendKeys('invaliduser@example.com');

        passwordField = await getElement(driver, By.id('password'));
        await passwordField.clear();
        await passwordField.sendKeys('wrongpassword');

        loginButton = await getElement(driver, By.css('button'));
        await loginButton.click();

        await driver.wait(until.urlIs('http://localhost:5173/Notsuccessfull'), 5000);
        console.log('Login with invalid credentials: Failed as expected, navigated to Notsuccessfull page');

    } catch (error) {
        console.error('Test failed: ', error);
    } finally {
        await driver.quit();                                                                                        //if you wants to quit from the browser after testing, you can use 'quit'.
    }
})();
