import { test, expect } from "@playwright/test";

for (const width of [375, 768, 1440]) {
  test(`browse menus without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.locator(".restaurant-card")).toHaveCount(7);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Anong gusto mo?",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    // Load lazy artwork before capturing the full document.
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await page
      .locator(".restaurant-card img")
      .evaluateAll((images) =>
        Promise.all(images.map((img) => (img as HTMLImageElement).decode())),
      );
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    if (width === 375) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Main navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
    }
    await page.getByRole("button", { name: "Filipino", exact: true }).click();
    await expect(page.locator(".restaurant-card")).toHaveCount(2);
    await page.getByRole("searchbox").fill("  ADOBO  ");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator(".restaurant-card")).toHaveCount(1);
    await page.locator(".restaurant-card").click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hapag ni Luna",
    );
    await expect(page.getByText("₱155", { exact: true })).toBeVisible();
    await page
      .getByRole("navigation", { name: "Menu categories" })
      .getByRole("link", { name: "Dagdag" })
      .click();
    await expect(page).toHaveURL(/#extras$/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/menu-${width}.png`,
      fullPage: true,
    });
    await page.getByRole("link", { name: "Back to restaurants" }).click();
    await expect(page.locator(".restaurant-card")).toHaveCount(1);
    await expect(page.getByRole("searchbox")).toHaveValue("ADOBO");
    await page.getByRole("button", { name: "Pizza", exact: true }).click();
    await expect(
      page.getByText("Walang tugma. Ibang craving naman?"),
    ).toBeVisible();
    await page.getByRole("button", { name: "Clear search & filters" }).click();
    await expect(page.locator(".restaurant-card")).toHaveCount(7);
    await page.goBack();
    await expect(
      page.getByText("Walang tugma. Ibang craving naman?"),
    ).toBeVisible();
    await page.goForward();
    await expect(page.locator(".restaurant-card")).toHaveCount(7);
    await page.getByRole("searchbox").fill("cafe");
    await page.getByRole("searchbox").press("Enter");
    await expect(page.locator(".restaurant-card")).toHaveCount(2);
    await page
      .getByRole("button", { name: "Clear search", exact: true })
      .click();
    await expect(page.locator(".restaurant-card")).toHaveCount(7);
    expect(errors).toEqual([]);
  });
}

test("all restaurant routes, price variants, unknown prices, about and 404", async ({
  page,
}) => {
  await page.goto("/");
  const links = await page
    .locator(".restaurant-card")
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!));
  for (const href of links) {
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
    await expect(page.locator(".menu-item")).not.toHaveCount(0);
  }
  await page.goto("/restaurants/kape-sa-kanto");
  await expect(
    page.getByText("Price unavailable", { exact: true }),
  ).toBeVisible();
  await page.goto("/restaurants/presko-club");
  await expect(
    page.locator(".menu-price").filter({ hasText: "Regular" }),
  ).toContainText("₱90");
  await expect(
    page.locator(".menu-price").filter({ hasText: "Large" }),
  ).toContainText("₱115");
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Less guessing.",
  );
  const missing = await page.goto("/restaurants/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Balik sa mga kainan" }),
  ).toBeVisible();
});
