/**
 * Selenium Test Suite
 * 
 * @author Kamil Kawka
 * 
 */

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testSuite() {
    
    // Use Firefox browser (requires a geckodriver to be in the same directory)
    let driver = await new Builder().forBrowser('firefox').build();

    // Maximize the browser window
    driver.manage().window().maximize();

    /* TEST 1 */
    console.log('***** Begin Testing');
    console.log('***** Test 1, Login to MyBMS');

    // Navigate to the page
    await driver.get('http://localhost:3000/');
    // Wait for the page to load
    await driver.wait(until.elementLocated(By.id('email-field')));

    // Test Login Page
    await driver.findElement(By.id('email-field')).sendKeys('2@2.com');
    await driver.findElement(By.id('password-field')).sendKeys('321321');
    await driver.findElement(By.id('login-button')).click();

    // assert that the dashboard page has loaded upon successful login
    await driver.wait(until.elementLocated(By.css('h3')))
    let dashboard =  await driver.findElement(By.css("h3")).getText().then(function (dashboard) {
        return dashboard;
    });
    assert.equal(dashboard, 'Dashboard');
    console.log('TEST 1, PASSED  -  Login Successful');

    // Navigate to the building overview page of Building-1
    await driver.wait(until.elementLocated(By.id('building-1')));
    await driver.findElement(By.id('building-1')).click();

    console.log('***** Start Testing Environmental Data Simulator Alerts');
    console.log('***** Using empty values');

    /* TEST 2 */

    // Enter Environmental Data Simulator
    await driver.wait(until.elementLocated(By.id('envSettingsBtn')));
    await driver.findElement(By.id('envSettingsBtn')).click();

    // Test input for the Temperature Setpoint
    await driver.wait(until.elementLocated(By.id('setpoint')));
    await driver.findElement(By.id('setpoint')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    let alert = await driver.switchTo().alert();

    //Store the alert text in a variable
    let alertText = await alert.getText();

    //Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Temperature setpoint must be between 15 and 30 degrees');
    console.log("TEST 2, PASSED  -  Temperature setpoint must be between 15 and 30 degrees");
    await driver.findElement(By.id('setpoint')).sendKeys('23'); // add legal input to test the next field


    /* TEST 3 */

    // Test input for the Indoor Temperature
    await driver.findElement(By.id('inTemp')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    alert = await driver.switchTo().alert();

    //Store the alert text in a variable
    alertText = await alert.getText();

    //Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Indoor temperature must be between 0 and 35 degrees');
    console.log("TEST 3, PASSED  -  Indoor temperature must be between 0 and 35 degrees");
    await driver.findElement(By.id('inTemp')).sendKeys('25'); // add legal input to test the next field


    /* TEST 4 */

    // Test input for the Outdoor Temperature
    await driver.findElement(By.id('outTemp')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    alert = await driver.switchTo().alert();

    //Store the alert text in a variable
    alertText = await alert.getText();

    //Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Outdoor temperature must be between -50 and 50 degrees');
    console.log("TEST 4, PASSED  -  Outdoor temperature must be between -50 and 50 degrees");
    await driver.findElement(By.id('outTemp')).sendKeys('25'); // add legal input to test the next field


    /* TEST 5 */

    // Test input for the Indoor Humidity
    await driver.findElement(By.id('inHumidity')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    alert = await driver.switchTo().alert();

    //Store the alert text in a variable
    alertText = await alert.getText();

    //Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Indoor humidity must be between 0 and 100 percent');
    console.log("TEST 5, PASSED  -  Indoor humidity must be between 0 and 100 percent");
    await driver.findElement(By.id('inHumidity')).sendKeys('40'); // add legal input to test the next field


    /* TEST 6 */

    // Test input for the Outdoor Humidity
    await driver.findElement(By.id('outHumidity')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    alert = await driver.switchTo().alert();

    // Store the alert text in a variable
    alertText = await alert.getText();

    // Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Outdoor humidity must be between 0 and 100 percent');
    console.log("TEST 6, PASSED  -  Outdoor humidity must be between 0 and 100 percent");
    await driver.findElement(By.id('outHumidity')).sendKeys('40'); // add legal input to test the next field


    /* TEST 7 */

    // Test input for the Occupancy
    await driver.findElement(By.id('occupancy')).sendKeys('');
    await driver.findElement(By.id('submitSettings')).click();

    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    alert = await driver.switchTo().alert();

    // Store the alert text in a variable
    alertText = await alert.getText();

    // Press the OK button
    await alert.accept();

    // assert that the alert is working and alert text is correct
    assert.equal(alertText, 'Occupancy must be between 0 and 100 percent');
    console.log("TEST 7, PASSED  -  Occupancy must be between 0 and 100 percent");
    await driver.findElement(By.id('occupancy')).sendKeys('55'); // add legal input to test the next field

    // Submit all values and close the window of the Modal
    await driver.findElement(By.id('submitSettings')).click();
    await driver.findElement(By.className('btn-close')).click();

    // Env. Settings Tests Passed
    console.log('***** Environmental Data Settings Component Tests Passed');
    console.log('***** Data has been set to legal values');
    console.log('***** End Testing Environmental Data Simulator');
 
    /* TEST 8 */
    console.log('***** Start Testing Connection Status of the Devices');
    console.log('***** Waiting for the heartbeat information to update on the page...');

    // Waiting 10 seconds for connection data to update on the page
    // It takes 10 seconds for the data to update on the page
    console.log('***** Evaluating Status wait 10 seconds...');
    await driver.sleep(10000);

    // Get the connection status of the devices
    await driver.wait(until.elementLocated(By.id('AHU-1-Heartbeat')));
    let badge =  await driver.findElement(By.id('AHU-1-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 8, PASSED  -  AHU-1-Heartbeat is HEALTHY');


    /* TEST 9 */
    badge = await driver.findElement(By.id('AHU-2-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 9, PASSED  -  AHU-2-Heartbeat is HEALTHY');


    /* TEST 10 */
    badge = await driver.findElement(By.id('Chiller-1-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 10, PASSED  -  Chiller-1-Heartbeat is HEALTHY');


    /* TEST 11 */
    badge = await driver.findElement(By.id('Chiller-2-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 11, PASSED  -  Chiller-2-Heartbeat is HEALTHY');


    /* TEST 12 */
    badge = await driver.findElement(By.id('Pump-1-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 12, PASSED  -  Pump-1-Heartbeat is HEALTHY');


    /* TEST 13 */
    badge = await driver.findElement(By.id('Pump-2-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 13, PASSED  -  Pump-2-Heartbeat is HEALTHY');


    /* TEST 14 */
    badge = await driver.findElement(By.id('TempSensorSimulator-1-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 14, PASSED  -  TempSensorSimulator-1-Heartbeat is HEALTHY');


    /* TEST 15 */
    badge = await driver.findElement(By.id('TempSensorSimulator-2-Heartbeat')).getText().then(function (badge) {
        return badge;
    });

    // assert that the connection status is HEALTHY
    assert.equal(badge, 'HEALTHY');
    console.log('TEST 15, PASSED  -  TempSensorSimulator-2-Heartbeat is HEALTHY');


    // Go to the Air Handling Plant page

    // Click on the Navbar's burger menu
    await driver.findElement(By.id('navbarToggle')).click();
    console.log('***** Clicked on the navbar\'s burger menu');

    // Click on the Air Handling Plant Button
    await driver.wait(until.elementLocated(By.id('airHandlingPlant-btn')));
    await driver.findElement(By.id('airHandlingPlant-btn')).click();
    console.log('***** clicked on the air handling plant button');

    // Close the burger menu
    await driver.findElement(By.className('btn-close')).click();
    console.log('***** Closed the navbar\'s burger menu');

    // To avoid clicking on fading offcanvas element
    await driver.sleep(2000);



    // Check if the components of the devices are working
    console.log('***** Start testing air handling plant page');
    console.log('***** Wait for the first component to appear');

    /* TEST 16 */
    await driver.wait(until.elementLocated(By.id('AHU-1')));
    await driver.findElement(By.id('AHU-1')).then(function () {
        console.log('TEST 16, PASSED  -  AHU-1 Component has been loaded');
    });

    /* TEST 17 */
    await driver.findElement(By.id('AHU-2')).then(function () {
        console.log('TEST 17, PASSED  -  AHU-2 Component has been loaded');
    });

    /* TEST 18 */
    await driver.findElement(By.id('Chiller-1')).then(function () {
        console.log('TEST 18, PASSED  -  Chiller-1 Component has been loaded');
    });

    /* TEST 19 */
    await driver.findElement(By.id('Chiller-2')).then(function () {
        console.log('TEST 19, PASSED  -  Chiller-2 Component has been loaded');
    });

    /* TEST 20 */
    await driver.findElement(By.id('Pump-1')).then(function () {
        console.log('TEST 20, PASSED  -   Pump-1 Component has been loaded');
    });

    /* TEST 21 */
    await driver.findElement(By.id('Pump-2')).then(function () {
        console.log('TEST 21, PASSED  -  Pump-2 Component has been loaded');
    });

    console.log('***** ALL TESTS PASSED');
    console.log('***** Closing the browser');

    // close the browser
    await driver.close();
}

testSuite();