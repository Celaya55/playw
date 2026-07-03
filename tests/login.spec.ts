import { test, expect } from '@playwright/test';

test('Validar carga de la página principal de DemoQA', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  
  // Validamos que el título contenga la palabra correcta
  await expect(page).toHaveTitle(/demosite/);
  
  // Validamos que el banner principal esté visible
  const banner = page.locator('.home-banner');
  await expect(banner).toBeVisible();
});
test('llenar formulario', async ({ page }) => {
await page.goto('https://demoqa.com/automation-practice-form')
    // Playwright puede usar el placeholder o un <label> asociado para el 'name'
await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
// Playwright puede usar el placeholder o un <label> asociado para el 'name'
await page.getByRole('textbox', { name: 'Last Name' }).fill('prueba');
await page.locator('#userEmail').fill('prueba@test.com');
await page.locator('#gender-radio-1').click;
});