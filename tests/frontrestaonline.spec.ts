import { test, expect } from '@playwright/test';

test('Tiene titulo', async ({ page }) => {
  await page.goto('https://master--polite-haupia-b69aa9.netlify.app/');
  await expect(page).toHaveTitle(/RestaOnline/);
});

test('Tiene un boton de login', async ({ page }) => {
  await page.goto('https://6473fcc67840e215a1fe1c94--polite-haupia-b69aa9.netlify.app/');
  await page.getByRole('navigation').filter({ hasText: 'RestaOnlineBarbosaIngresar' }).getByRole('paragraph').click();

});

test('Navegacion Basica', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://6473fcc67840e215a1fe1c94--polite-haupia-b69aa9.netlify.app/');
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.getByText('Huevos PericosHuevos revueltos con cebolla, tomate y cilantro, acompañados de ar').click();
  await page.getByRole('combobox').selectOption('[object Object]');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill('harryjhoi01@gmail.com');
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('aquiles01');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('navigation').filter({ hasText: 'RestaOnlineBarbosaHola!, Harrison Diaz' }).getByRole('paragraph').click();
  await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Continuar con Google' }).click();
  const page1 = await page1Promise;
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill('harryjhoi01@gmail.com');
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('aquiles01');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.locator('div:nth-child(3) > .navbar > .container-fluid > #navbarSupportedContent > div:nth-child(5) > .ml-3').click();
  await page.getByRole('button', { name: 'Pagar' }).click();
  await page.getByRole('button', { name: 'RestaOnline' }).click();
});

test('Compra desde 0', async ({ page }) => {
  await page.goto('https://polite-haupia-b69aa9.netlify.app/platillo/12');
  await page.getByText('Ingresar').click();
  await page.getByText('Iniciar sesiónCorreo electrónicoContraseñaIniciar sesión Continuar con Google ¿N').click();
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill('harryjhoi01@gmail.com');
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('aquiles01');
  await page.getByLabel('Contraseña').press('Enter');
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('heading', { name: 'Huevos Pericos' }).click();
  await page.getByRole('combobox').selectOption('[object Object]');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();
  await page.locator('div:nth-child(5)').first().click();
  await page.getByPlaceholder('Dirección').click();
  await page.getByPlaceholder('Dirección').fill('123');
  await page.getByRole('combobox', { name: 'Seleccione el tipo de pago,' }).selectOption('Paypal');
  await page.getByPlaceholder('Celular').click();
  await page.getByPlaceholder('Celular').fill('21314');
  await page.getByRole('button', { name: 'Pagar' }).click();
});

test('Aceptar Cookies', async ({ page }) => {
  await page.goto('https://6473fcc67840e215a1fe1c94--polite-haupia-b69aa9.netlify.app/');
  await page.getByRole('button', { name: 'Aceptar' }).click();
});

test('vista admin usuarios', async ({ page }) => {
  await page.goto('https://6473fcc67840e215a1fe1c94--polite-haupia-b69aa9.netlify.app/');
  await page.getByRole('navigation').filter({ hasText: 'RestaOnlineBarbosaIngresar' }).getByRole('paragraph').click();
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill('harrison.diaz@uptc.edu.co');
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('admin123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Usuarios' }).click();
  await page.goto('https://6473fcc67840e215a1fe1c94--polite-haupia-b69aa9.netlify.app/admin/users');
});

test('Vista admin productos', async ({ page }) => {
  await page.goto('https://polite-haupia-b69aa9.netlify.app/');
  await page.getByRole('navigation').filter({ hasText: 'RestaOnlineBarbosaIngresar' }).getByRole('paragraph').click();
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill('harrison.diaz@uptc.edu.co');
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('admin123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Productos' }).click();
});