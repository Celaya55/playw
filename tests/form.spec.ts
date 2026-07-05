import { test, expect } from '@playwright/test';

test('Llenar y validar formulario de registro', async ({ page }) => {
  // 1. Navegación directa al grano
  await page.goto('https://demoqa.com/automation-practice-form');

  // 2. Llenado directo usando placeholders (sin clicks previos)
  await page.getByPlaceholder('First Name').fill('test');
  await page.getByPlaceholder('Last Name').fill('test22');
  await page.getByPlaceholder('name@example.com').fill('test@gmail.com');

  // 3. Radios y Checkboxes (getByText suele ser muy estable aquí)
  await page.getByText('Male', { exact: true }).click();
  await page.getByPlaceholder('Mobile Number').fill('6547894434');

  // 4. Calendario: Mucho más limpio y sin hardcodear el día actual
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__month-select').selectOption('0'); // 0 = Enero
  await page.locator('.react-datepicker__year-select').selectOption('2010');
  await page.getByLabel('Choose Thursday, January 28th, 2010').click();

  // 5. Autocompletado (Subjects) - Escribimos y presionamos Enter
  await page.locator('#subjectsInput').fill('Computer Science');
  await page.keyboard.press('Enter');

  // 6. Checkboxes múltiples
 
  await page.getByRole('checkbox', { name: 'Sports' }).check({ force: true });
  await page.getByRole('checkbox', { name: 'Reading' }).check({ force: true });
  await page.getByRole('checkbox', { name: 'Music' }).check({ force: true });
  await page.getByPlaceholder('Current Address').fill('calle test 123');

  // 7. Dropdowns Complejos (State y City) - Evitamos las clases CSS frágiles
  await page.locator('#state input').fill('Haryana');
  await page.keyboard.press('Enter');
  await page.locator('#city input').fill('Karnal');
  await page.keyboard.press('Enter');

  // 8. Enviar formulario
  await page.getByRole('button', { name: 'Submit' }).click();

  // 9. ASSERTION: Validamos que el modal de éxito aparezca y tenga el texto correcto
  const modalTitle = page.locator('#example-modal-sizes-title-lg');
  await expect(modalTitle).toBeVisible();
  await expect(modalTitle).toHaveText('Thanks for submitting the form');

  // Cerramos el modal
  await page.getByRole('button', { name: 'Close' }).click();
});