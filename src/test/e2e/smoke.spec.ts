import { test, expect } from '@playwright/test';

// Helpers: small fixtures for predictable UI
const MOVIE_ID = 'tt1375666';
const MOVIE_TITLE = 'Inception';

test.describe('Smoke', () => {
  test('A) 로그인 → 메인', async ({ page }) => {
    // Mock login and refresh endpoints (adjust to your actual routes if different)
    await page.route('**/api/auth/login', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, user: { name: 'Jactio' } }),
      }),
    );
    await page.route('**/api/auth/refresh', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto('/login');

    // Prefer accessibility-first locators (labels/roles)
    await page.getByLabel(/email/i).fill('user@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /login/i }).click();

    // Expect redirect to main (/) and some signed-in indicator
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(/jactio/i)).toBeVisible();
  });

  test('B) 메인 검색 → 결과 반영', async ({ page }) => {
    // Mock search API. If you later adopt `/search?q=...`, you can assert URL as well.
    await page.route('**/api/search?**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ results: [{ id: MOVIE_ID, title: MOVIE_TITLE }] }),
      }),
    );

    await page.goto('/');
    await page.getByRole('textbox', { name: /search/i }).fill('inception');
    await page.getByRole('button', { name: /search/i }).click();

    // Option A (if you implement /search):
    // await expect(page).toHaveURL(/\/search\?q=inception/i);

    // Option B (current home-based search UI): assert first result is visible.
    await expect(page.getByRole('link', { name: new RegExp(MOVIE_TITLE, 'i') })).toBeVisible();
  });

  test('C-1) 카드 → 모달 상세(인터셉트)', async ({ page }) => {
    // Mock list and detail to keep test deterministic
    await page.route('**/api/search?**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ results: [{ id: MOVIE_ID, title: MOVIE_TITLE }] }),
      }),
    );
    await page.route(`**/api/movies/${MOVIE_ID}`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: MOVIE_ID,
          title: MOVIE_TITLE,
          overview: 'A mind-bending sci‑fi heist.',
        }),
      }),
    );

    await page.goto('/');
    await page.getByRole('textbox', { name: /search/i }).fill('inception');
    await page.getByRole('button', { name: /search/i }).click();

    // Click the first card (link role recommended for accessibility)
    await page.getByRole('link', { name: new RegExp(MOVIE_TITLE, 'i') }).click();

    // Intercepting route modal: keep URL (e.g. "/") and show dialog overlay.
    // Make sure your modal element has role="dialog".
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: new RegExp(MOVIE_TITLE, 'i') })).toBeVisible();

    // Close the modal and ensure it disappears
    await page.getByRole('button', { name: /close/i }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('C-2) 딥링크 상세 페이지', async ({ page }) => {
    await page.route(`**/api/movies/${MOVIE_ID}`, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: MOVIE_ID, title: MOVIE_TITLE, overview: '...' }),
      }),
    );

    // Current folder structure uses /movie/[id]. If you later rename to /movies/[id], update this path.
    await page.goto(`/movie/${MOVIE_ID}`);
    await expect(page.getByRole('heading', { name: new RegExp(MOVIE_TITLE, 'i') })).toBeVisible();
  });
});
