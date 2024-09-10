import { Builder, By, until } from 'selenium-webdriver';

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

        await usernameField.clear(); 
        await usernameField.sendKeys('invaliduser@example.com');

        await passwordField.clear(); 
        await passwordField.sendKeys('wrongpassword');

        await loginButton.click();

        await driver.wait(until.urlIs('http://localhost:5173/Notsuccessfull'), 5000);
        console.log('Login with invalid credentials: Failed as expected, navigated to Notsuccessfull page');

    } catch (error) {
        console.error('Test failed: ', error);
    } finally {
        await driver.quit();
    }
})();
