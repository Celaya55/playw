// Archivo: test-base.ts
import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

// 1. Declaramos qué variables dinámicas van a existir en nuestro proyecto
type MisFixtures = {
  randomFullName: string;
  randomFirstName: string;
  randomLastName: string;
  randomEmail: string;
  randomAge: string;
  randomSalary: string;
  randomDepartment: string;
  randomAddress: string;
};

// 2. Extendemos el test base de Playwright y le enseñamos cómo generar cada dato
export const test = base.extend<MisFixtures>({
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

// Exportamos también el 'expect' para que no tengas que importarlo de dos lugares distintos
export { expect } from '@playwright/test';