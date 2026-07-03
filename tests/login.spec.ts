import { test, expect } from '@playwright/test';

test('Validar carga de la página principal de DemoQA', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  
  // Validamos que el título contenga la palabra correcta
  await expect(page).toHaveTitle(/DEMOQA/);
  
  // Validamos que el banner principal esté visible
  const banner = page.locator('.home-banner');
  await expect(banner).toBeVisible();
});