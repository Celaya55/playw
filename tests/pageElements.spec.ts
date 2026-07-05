import { test, expect } from '@playwright/test';

// Creamos un grupo lógico para todas estas pruebas
test.describe('DemoQA - Interacción con Elementos Básicos', () => {

  test('Llenar y validar sección Text Box', async ({ page }) => {
    // 1. Navegación directa
    await page.goto('https://demoqa.com/text-box');
    
    // 2. Llenado limpio (sin clicks previos)
    await page.getByPlaceholder('Full Name').fill('prueba test');
    await page.getByPlaceholder('name@example.com').fill('email@ejemplo.com');
    await page.getByPlaceholder('Current Address').fill('calle test123');
    await page.locator('#permanentAddress').fill('calle test122');
    await page.getByRole('button', { name: 'Submit' }).click();

    // 3. ASSERTION: Validamos que aparezca la caja de resultados
    const outputBox = page.locator('#output');
    await expect(outputBox).toBeVisible();
  });

  test('Agregar y eliminar usuario en Web Tables', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    
    // Agregar usuario
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByPlaceholder('First Name').fill('test');
    await page.getByPlaceholder('Last Name').fill('nuevo');
    await page.getByPlaceholder('name@example.com').fill('name@example.com');
    await page.getByPlaceholder('Age').fill('21');
    await page.getByPlaceholder('Salary').fill('1200');
    
    //  Llenamos el último campo y presionamos "Enter" en lugar de hacer click
    // Esto fuerza el envío nativo del formulario HTML y esquiva botones bloqueados.
    await page.getByPlaceholder('Department').fill('QA');
    await page.getByPlaceholder('Department').press('Enter');

   // 1. Validamos que el modal se cerró 
    await expect(page.locator('.modal-content')).toBeHidden();

    // 2.Buscamos LA FILA que contenga un dato único (como el email)
    const nuevaFila = page.getByRole('row').filter({ hasText: 'name@example.com' });
    
    // Validamos que esa fila en específico sea visible
    await expect(nuevaFila).toBeVisible();

    // 3. ELIMINACIÓN DINÁMICA: 
    // buscamos el botón de borrar DENTRO de esa misma fila exacta que encontramos.
    await nuevaFila.locator('[title="Delete"]').click();
  });

  test('Validar acciones complejas en Buttons', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    
    // Acciones de ratón
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();

    // ASSERTIONS: Validar los mensajes de éxito
    await expect(page.locator('#doubleClickMessage')).toBeVisible();
    await expect(page.locator('#rightClickMessage')).toBeVisible();
    await expect(page.locator('#dynamicClickMessage')).toBeVisible();
  });

});