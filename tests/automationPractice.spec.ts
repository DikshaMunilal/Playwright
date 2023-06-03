import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
});

test('Checkbox | Radio3', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     await page.locator("//input[@value='radio3']").check();
     expect(await page.locator("//input[@value='radio1']").isChecked()).toBeFalsy();
     expect(await page.locator("//input[@value='radio2']").isChecked()).toBeFalsy();  
});

test('Checkbox | Radio2', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     await page.locator("//input[@value='radio2']").check();
     expect(await page.locator("//input[@value='radio1']").isChecked()).toBeFalsy();
     expect(await page.locator("//input[@value='radio3']").isChecked()).toBeFalsy();  
});

test(' Suggestion | South Africa', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     await page.locator("//input[@placeholder='Type to Select Countries']").click();
     await page.getByPlaceholder('Type to Select Countries').fill('South');
    
     var select =await page.locator("//div[@class='ui-menu-item-wrapper']").getByText('South Africa').click();
});

test(' Suggestion | Republic', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     await page.locator("//input[@placeholder='Type to Select Countries']").click();
     await page.getByPlaceholder('Type to Select Countries').fill('South');
  
    var select =await page.locator("//div[@class='ui-menu-item-wrapper']").getByText('South Africa').click();

    await page.getByPlaceholder('Type to Select Countries').clear();
    await page.getByPlaceholder('Type to Select Countries').fill('Republic');
    await page.locator("//div[@class='ui-menu-item-wrapper']").first().click()

});

test(' Checkbox | All checked', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     
     await page.locator("//input[@id='checkBoxOption1']").check();
     await page.locator("//input[@id='checkBoxOption2']").check();
     await page.locator("//input[@id='checkBoxOption3']").check();

     expect(await page.locator("//input[@id='checkBoxOption1']").isChecked()).toBeTruthy();
     expect(await page.locator("//input[@id='checkBoxOption2']").isChecked()).toBeTruthy();
     expect(await page.locator("//input[@id='checkBoxOption3']").isChecked()).toBeTruthy();    
});

test(' Checkbox | 1 checked', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     await page.locator("//input[@id='checkBoxOption1']").check();

     expect(await page.locator("//input[@id='checkBoxOption1']").isChecked()).toBeTruthy();
     expect(await page.locator("//input[@id='checkBoxOption2']").isChecked()).toBeFalsy();
     expect(await page.locator("//input[@id='checkBoxOption3']").isChecked()).toBeFalsy();    
});

test(' Hide | Hide textbox', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     await page.locator("//input[@id='hide-textbox']").click();

     await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();  
});

test(' show | Show textbox', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     await page.locator("//input[@id='show-textbox']").click();

     await expect(page.locator("//input[@id='displayed-text']")).toBeVisible();  
});

test(' Web Table Fixed header | Find Joe Postman', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     
     const fixHead = await page.locator("//div[@class='tableFixHead']").locator("//table[@id='product']");
     await fixHead.scrollIntoViewIfNeeded();

     const rows = fixHead.locator("tbody tr");

     const nameMatch = rows.filter({
          has: page.locator("td"),
          hasText: "Joe",

     } );

     await nameMatch.locator("td").getByRole('row', { name: 'Joe Postman Chennai 46' });
   
});

test(' Web Table Fixed header | Validate total amount collected is 296', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     await expect(page.locator("//div[@class='totalAmount']")).toContainText('Total Amount Collected: 296');

});

test(' Web Table Fixed header | sum of Amount column is 296', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     const table = await page.locator("//div[@class='tableFixHead']").locator("//table[@id='product']");
     const tbody = table.locator("tbody");

     const rowsCount = await tbody.locator("tr").count();
     expect(rowsCount).toBe(9);

     let total = 0;

     for(let i=0; i < rowsCount; i++){
      const row = tbody.locator("tr").nth(i);
      const price = await row.locator("td").last().textContent();
      total += Number(price);
     }

     expect(total).toBe(296);

});

test(' iframe | Validate iframe exists', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  
     await page.frameLocator("courses-iframe");

     const test = page.locator("//iframe[@id='courses-iframe']");
     await test.scrollIntoViewIfNeeded();
});

test(' iframe | interact with element in iframe', async({ page }) => {
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

     const test = page.locator("//iframe[@id='courses-iframe']");
     await test.scrollIntoViewIfNeeded();
  
     const frame = page.frameLocator("//iframe[@id='courses-iframe']");
     await frame.getByRole('link',{name:'Blog'}).click();
 
});