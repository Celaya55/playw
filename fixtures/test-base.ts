// Archivo: test-base.ts
import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

// 👇 1. Importamos tu nueva página (Asegúrate de que la ruta sea correcta)
import { LinksPage } from '../pages/components/LinksPage';

// Declaramos qué variables y PÁGINAS van a existir en nuestro proyecto
type MisFixtures = {
  // Datos aleatorios
  randomFullName: string;
  randomFirstName: string;
  randomLastName: string;
  randomEmail: string;
  randomAge: string;
  randomSalary: string;
  randomDepartment: string;
  randomAddress: string;
  
  // 👇 2. Agregamos tu Page Object Model a las fixtures
  linksPage: LinksPage; 
};

// Extendemos el test base de Playwright
export const test = base.extend<MisFixtures>({
  
  // 👇 3. Inicializamos linksPage para que Playwright la pase a los tests
  linksPage: async ({ page }, use) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto(); // Navega automáticamente antes de que empiece el test
    await use(linksPage);
  },

  // Tus generadores de Faker siguen intactos:
  randomFullName: async ({}, use) => {
    await use(faker.person.fullName());
  },
  randomFirstName: async ({}, use) => {
    await use(faker.person.firstName());
  },
  randomLastName: async ({}, use) => {
    await use(faker.person.lastName());
  },
  randomEmail: async ({}, use) => {
    await use(faker.internet.email());
  },
  randomAge: async ({}, use) => {
    await use(faker.number.int({ min: 18, max: 65 }).toString());
  },
  randomSalary: async ({}, use) => {
    await use(faker.number.int({ min: 1000, max: 9000 }).toString());
  },
  randomDepartment: async ({}, use) => {
    await use(faker.commerce.department());
  },
  randomAddress: async ({}, use) => {
    await use(faker.location.streetAddress());
  },
});

export { expect } from '@playwright/test';