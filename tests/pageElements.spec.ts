// 1. EL CAMBIO CLAVE: Importamos desde nuestro archivo Fixture en lugar de '@playwright/test'.
// (Asegúrate de que la ruta './test-base' o '../test-base' coincida con donde lo guardaste)
import { test, expect } from '../fixtures/test-base'; 

test.describe('DemoQA - Interacción con Elementos Básicos', () => {

  // 2. Pedimos nuestras variables dinámicas directamente en los argumentos del test
  test('Llenar y validar sección Text Box', async ({ page, randomFullName, randomEmail, randomAddress }) => {
    
    await page.goto('https://demoqa.com/text-box');
    
    // 3. Usamos las variables inyectadas por la Fixture
    await page.getByPlaceholder('Full Name').fill(randomFullName);
    await page.getByPlaceholder('name@example.com').fill(randomEmail);
    await page.getByPlaceholder('Current Address').fill(randomAddress);
    await page.locator('#permanentAddress').fill(randomAddress); 
    
    await page.getByRole('button', { name: 'Submit' }).click();

    // ASSERTION
    const outputBox = page.locator('#output');
    await expect(outputBox).toBeVisible();
    await expect(outputBox).toContainText(randomEmail); 
  });

  // Aquí pedimos otro set de variables completamente distinto
  test('Agregar y eliminar usuario en Web Tables', async ({ page, randomFirstName, randomLastName, randomEmail, randomAge, randomSalary, randomDepartment }) => {
    
    await page.goto('https://demoqa.com/webtables');
    
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('First Name').fill(randomFirstName);
    await page.getByPlaceholder('Last Name').fill(randomLastName);
    await page.getByPlaceholder('name@example.com').fill(randomEmail);
    await page.getByPlaceholder('Age').fill(randomAge);
    await page.getByPlaceholder('Salary').fill(randomSalary);
    
    // Truco del Enter
    await page.getByPlaceholder('Department').fill(randomDepartment);
    await page.getByPlaceholder('Department').press('Enter');

    // Validamos que el modal se cerró 
    await expect(page.locator('.modal-content')).toBeHidden();

    // Buscamos LA FILA usando nuestra variable dinámica
    const nuevaFila = page.getByRole('row').filter({ hasText: randomEmail });
    await expect(nuevaFila).toBeVisible();

    // Eliminación dinámica dentro de esa fila
    await nuevaFila.locator('[title="Delete"]').click();
  });

  test('Validar acciones complejas en Buttons', async ({ page }) => {
    // Este test se queda igual porque no necesita datos de Faker.
    // Playwright es tan inteligente que aquí no gastará memoria generando datos aleatorios.
    await page.goto('https://demoqa.com/buttons');
    
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();

    await expect(page.locator('#doubleClickMessage')).toBeVisible();
    await expect(page.locator('#rightClickMessage')).toBeVisible();
    await expect(page.locator('#dynamicClickMessage')).toBeVisible();
  });

});