import { Page, Locator } from '@playwright/test';

export class LinksPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dynamicLink: Locator;

    readonly createdLink: Locator;
    readonly noContentLink: Locator;
    readonly badRequestLink: Locator;
    readonly unauthorizedLink: Locator;
    readonly forbiddenLink: Locator;
    readonly linkResponseLink: Locator;
    
    // 👇 NUEVO: Elemento donde aparece el texto de respuesta
    readonly responseMessage: Locator;

  constructor(page: Page) {
    this.page = page; // 👈 Cambiado a this
    this.homeLink = page.locator('#simpleLink'); // 👈 Cambiado a this
    this.dynamicLink = page.locator('#dynamicLink'); // 👈 Cambiado a this
    // 👇 NUEVOS: Links de simulación de API

    this.createdLink = page.locator('#created');
    this.noContentLink = page.locator('#no-content');
    this.badRequestLink = page.locator('#bad-request');
    this.unauthorizedLink = page.locator('#unauthorized')
    this.forbiddenLink = page.locator('#forbidden')
    this.linkResponseLink = page.locator('#invalid-url')
    
    // Inicializamos el contenedor del mensaje final
    this.responseMessage = page.locator('#linkResponse'); 
  
    
  }

  async goto() {
    // Usamos la URL base de tu entorno configurado
    await this.page.goto(`${process.env.URL}/links`); // 👈 Cambiado a this
  }
}