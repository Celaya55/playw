// 1. EL CAMBIO CLAVE: Importamos desde nuestro archivo Fixture en lugar de '@playwright/test'.
// (Asegúrate de que la ruta './test-base' o '../test-base' coincida con donde lo guardaste)
import { test, expect } from '../fixtures/test-base'; 


test.describe('DemoQA - Interacción con Elementos Básicos', () => {

  // 2. Pedimos nuestras variables dinámicas directamente en los argumentos del test
  test('Llenar y validar sección Text Box', async ({ page, randomFullName, randomEmail, randomAddress }) => {
    
    await page.goto(URL+'/text-box');
    
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
    
    await page.goto(`${process.env.URL}/webtables`);
    
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
    await page.goto(`${process.env.URL}/buttons`);
    
    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
    await page.getByRole('button', { name: 'Click Me', exact: true }).click();

    await expect(page.locator('#doubleClickMessage')).toBeVisible();
    await expect(page.locator('#rightClickMessage')).toBeVisible();
    await expect(page.locator('#dynamicClickMessage')).toBeVisible();
  });
  // 1. Asegúrate de importar el test desde tu archivo base personalizado, NO desde '@playwright/test'




// 1. El agrupador principal para esta sección
test.describe('DemoQA - Validación de Links', () => {

  // --- PRIMER TEST: Pestañas nuevas ---
  test('Validar múltiples enlaces que abren pestañas nuevas', async ({ page, linksPage }) => {
    
    const [pageHome] = await Promise.all([
      page.waitForEvent('popup'),
      linksPage.homeLink.click() 
    ]);
    await pageHome.waitForLoadState();
    await expect(pageHome).toHaveURL(`${process.env.URL}`); 
    await pageHome.close();

    const [pageDynamic] = await Promise.all([
      page.waitForEvent('popup'),
      linksPage.dynamicLink.click() 
    ]);
    await pageDynamic.waitForLoadState();
    await expect(pageDynamic).toHaveURL(`${process.env.URL}`);
    await pageDynamic.close(); 
  });


  // --- SEGUNDO TEST: API Simulación ---
  test('Validar enlaces de simulación de API (Misma pestaña)', async ({ linksPage }) => {
    
    // Validar Link "Created" (Status 201)
    await linksPage.createdLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 201 and status text Created');
    await expect(linksPage.responseMessage).toContainText('Created');

    // Validar Link "No Content" (Status 204)
    await linksPage.noContentLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 204 and status text No Content');

    // Validar Link "Bad Request" (Status 400)
    await linksPage.badRequestLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 400 and status text Bad Request');
    
    //Validar Link Unauthorized request
    await linksPage.unauthorizedLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 401 and status text Unauthorized');

    //Validar Link Forbidden request
    await linksPage.forbiddenLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 403 and status text Forbidden');

     //Validar Link Not found  request
    await linksPage.linkResponseLink.click();
    await expect(linksPage.responseMessage).toBeVisible();
    await expect(linksPage.responseMessage).toContainText('Link has responded with staus 404 and status text Not Found');

  });

});

});