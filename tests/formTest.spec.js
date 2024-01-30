const { test, expect } = require('@playwright/test');

test.describe('Testing the car form app', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://gaabrielogan2.github.io/app-car');
  });

  test('Filling in mandatory fields and checking the success message', async () => {
    await page.fill('#modelo', 'Chevette');
    await page.fill('#marca', 'Chevrolet');
    await page.fill('#ano', '1973');
    await page.fill('#senha', 'senha');
    await page.fill('#pais', ' Alemanha');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#mensagem-sucesso', { state: 'visible' });
    const successMessage = await page.textContent('#mensagem-sucesso');
    expect(successMessage).toBe('Pedido realizado com sucesso!');
  });

  test('Enabling a disabled field and filling it out', async () => {
    const campoDesabilitado = await page.$('#campoDesabilitado');
    expect(await campoDesabilitado.inputValue()).toBe('');
    await campoDesabilitado.evaluate(element => element.removeAttribute('disabled'));
    await campoDesabilitado.fill('50%');
    expect(await campoDesabilitado.inputValue()).toBe('50%');
  });

  test('Interacting with a date field', async () => {
    await page.fill('#hora', '23:23');
    expect(await page.inputValue('#hora')).toBe('23:23');
  });

  test('Simulating the CTRL+V command to paste an extended text into a textarea field', async () => {
    const longText = '0123456789'.repeat(20);
    await page.fill('textarea', longText);
    expect(await page.inputValue('textarea')).toBe(longText);
  });


 test('Selecting the fuel in the dropdown menu', async () => {
    await page.selectOption('#combustivel', 'Gasolina');
    const selectedValue = await page.$eval('#combustivel', (e) => e.value);
    expect(selectedValue).toBe('gasolina');
  });

  test('Testing checkbox element', async () => {
    const checkbox = await page.$('#direcaoHidraulica');
    expect(await checkbox.isChecked()).toBe(false);
    await checkbox.check();
    expect(await checkbox.isChecked()).toBe(true);
  });

  test('Testing input date', async () => {
    await page.fill('#data', '2024-01-01');
    const inputValue = await page.$eval('#data', (e) => e.value);
    expect(inputValue).toBe('2024-01-01');
  });

  test('Testing input radio', async () => {
    const radioButtons = await page.$$('input[type="radio"]');
  
    expect(radioButtons.length).toBe(3);

    for (const radioButton of radioButtons) {
      expect(await radioButton.isChecked()).toBe(false);
      await radioButton.check();
      expect(await radioButton.isChecked()).toBe(true);
    }
  });

  test('Testing input color', async () => {
    await page.fill('#cor', '#ffa500');
    const inputValue = await page.$eval('#cor', (e) => e.value);
    expect(inputValue).toBe('#ffa500');
  });

  test('Testing file input', async () => {
    const filePath = 'tests/image/image1.jpeg';
    const inputFile = await page.locator('input[type="file"]');
  
   
    await inputFile.setInputFiles(filePath);
    await page.waitForTimeout(5000);
  
    const selectedFileName = await inputFile.evaluate((input) => {
      return input.files[0].name;
    });
    expect(selectedFileName).toBe('image1.jpeg');
  });
  
  test('Testing file input drag-drop', async () => {
    const filePath = 'tests/image/image1.jpeg';
    const inputFile = await page.locator('input[type="file"]');
  
   
    await inputFile.setInputFiles(filePath, { dragAndDrop: true });
  
    await page.waitForTimeout(5000);
  
    const selectedFileName = await inputFile.evaluate((input) => {
      return input.files[0].name;
    });
  
    expect(selectedFileName).toBe('image1.jpeg');
  });

  test('Testing links', async () => {
    const links = await page.$$('a');
  
    for (const link of links) {
      await link.evaluate((el) => el.removeAttribute('target'));
      await link.click();
      await page.waitForSelector('.gallery-title', { state: 'visible' });
    }
  });

  test('CSS Test', async () => {
    const button = await page.locator('button[type="submit"]');
    const buttonColor = await button.evaluate((btn) => {
      const computedStyle = getComputedStyle(btn);
      return computedStyle.color;
    });
  
    expect(buttonColor).toBe('rgb(255, 255, 255)');
  });

  test('Displaying error message and hidden car in the app', async () => {
    const cartSelector = '#cart';
    const successMessageSelector = '#mensagem-sucesso';
    const errorMessageSelector = '#mensagem-erro';
  
    expect(await page.isVisible(cartSelector)).toBe(false);
  
    await page.$eval(cartSelector, (cart) => {
      cart.style.display = 'block';
    });
    expect(await page.isVisible(cartSelector)).toBe(true);
  
    expect(await page.isVisible(successMessageSelector)).toBe(false);
  
    await page.$eval(successMessageSelector, (successMessage) => {
      successMessage.style.display = 'block';
    });
    expect(await page.isVisible(successMessageSelector)).toBe(true);
  
    expect(await page.isVisible(errorMessageSelector)).toBe(false);
  
    await page.$eval(errorMessageSelector, (errorMessage) => {
      errorMessage.style.display = 'block';
    });
    expect(await page.isVisible(errorMessageSelector)).toBe(true);
  });
});
