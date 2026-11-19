export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  pricePHP: number | null;
  variants?: { name: string; pricePHP: number }[];
};
export type MenuCategory = { id: string; name: string; items: MenuItem[] };
export type Restaurant = {
  slug: string;
  name: string;
  cuisines: string[];
  locationLabel: string;
  description: string;
  image: string | null;
  artLabel: string;
  menuUpdatedAt: string;
  menu: MenuCategory[];
};
const category = (
  id: string,
  name: string,
  items: [string, number | null, string?][],
): MenuCategory => ({
  id,
  name,
  items: items.map(([name, pricePHP, description], i) => ({
    id: `${id}-${i}`,
    name,
    pricePHP,
    description,
  })),
});
const sample = (
  slug: string,
  name: string,
  cuisines: string[],
  description: string,
  artLabel: string,
  image: string | null,
  menu: MenuCategory[],
): Restaurant => ({
  slug,
  name,
  cuisines,
  description,
  artLabel,
  image,
  menu,
  locationLabel: "Balanga City, Bataan · Demo location",
  menuUpdatedAt: "2026-11-18",
});
// Entirely fictional examples. These are not verified businesses, menus, prices, or addresses.
const restaurants: Restaurant[] = [
  sample(
    "kape-sa-kanto",
    "Kape sa Kanto",
    ["Café", "Drinks"],
    "Isang kape, sandaling pahinga. Coffee and merienda for slow afternoons.",
    "KAPE / MERIENDA",
    "/art/cafe.svg",
    [
      category("coffee", "Kape", [
        ["Spanish latte", 130, "Espresso, milk, and a little sweetness."],
        ["Barako americano", 95],
        ["Oat latte", null, "Sample price not yet available."],
      ]),
      category("merienda", "Merienda", [
        [
          "Kesong puti toast",
          110,
          "Toasted bread with local-style white cheese.",
        ],
        ["Banana bread", 75],
      ]),
    ],
  ),
  sample(
    "tambayan-burger",
    "Tambayan Burger",
    ["Burgers"],
    "Burgers, fries, at kuwentuhan. A little comfort between two buns.",
    "BURGERS / FRIES",
    "/art/burger.svg",
    [
      category("burgers", "Burgers", [
        [
          "Kanto cheeseburger",
          165,
          "Beef patty, cheddar, pickles, and house-style sauce.",
        ],
        ["Mushroom burger", 180, "Mushroom patty with crisp lettuce."],
      ]),
      category("sides", "Sides & drinks", [
        ["Seasoned fries", 70],
        ["Calamansi cooler", 65],
      ]),
    ],
  ),
  sample(
    "hapag-ni-luna",
    "Hapag ni Luna",
    ["Filipino"],
    "Pamilyar na lasa, bagong tambayan. Filipino favorites for your next lunch.",
    "KANIN / ULAM",
    "/art/rice.svg",
    [
      category("rice", "Rice meals", [
        [
          "Chicken adobo",
          155,
          "Soy and vinegar braised chicken with steamed rice.",
        ],
        ["Pork sisig rice", 175, "Sizzling-style pork, onions, and calamansi."],
        ["Ginisang gulay", 120, "Seasonal vegetables with rice."],
      ]),
      category("extras", "Dagdag", [
        ["Garlic rice", 35],
        ["Sago at gulaman", 50],
      ]),
    ],
  ),
  sample(
    "mesa-pasta",
    "Mesa Pasta",
    ["Pasta"],
    "Para sa pasta cravings. Simple plates, generous comfort.",
    "PASTA / PAN DE AJO",
    "/art/pasta.svg",
    [
      category("pasta", "Pasta", [
        ["Roasted tomato spaghetti", 170, "Tomato sauce, basil, and parmesan."],
        ["Creamy mushroom pasta", 185, "Mushrooms in a light cream sauce."],
      ]),
      category("sides", "On the side", [
        ["Garlic bread", 65],
        ["Iced lemon tea", 55],
      ]),
    ],
  ),
  sample(
    "pugon-at-papel",
    "Pugon at Papel",
    ["Pizza"],
    "Hati-hati tayo. Oven-baked pizza made for sharing.",
    "PIZZA / PANG-SHARE",
    "/art/pizza.svg",
    [
      category("pizza", "Pizza", [
        ["Three-cheese pizza", 280, "Mozzarella, cheddar, and parmesan."],
        ["Garden pizza", 260, "Tomatoes, peppers, onions, and olives."],
      ]),
      category("drinks", "Drinks", [["House iced tea", 60]]),
    ],
  ),
  sample(
    "presko-club",
    "Presko Club",
    ["Drinks", "Café"],
    "Palamig muna. Fruity drinks and easy afternoon snacks.",
    "PALAMIG / PAHINGA",
    "/art/drinks.svg",
    [
      category("coolers", "Palamig", [
        ["Mango cooler", 95, "Mango and ice with a squeeze of calamansi."],
        ["Calamansi soda", 80],
        ["Iced cacao", 110],
      ]),
      {
        id: "tea",
        name: "Milk tea",
        items: [
          {
            id: "classic-tea",
            name: "Classic milk tea",
            description: "Black tea with milk. Choose a size.",
            pricePHP: null,
            variants: [
              { name: "Regular", pricePHP: 90 },
              { name: "Large", pricePHP: 115 },
            ],
          },
        ],
      },
    ],
  ),
  sample(
    "kusina-dos",
    "Kusina Dos",
    ["Filipino"],
    "Lutong-bahay ang hanap? A small sample of everyday Filipino comfort.",
    "LUTONG / BAHAY",
    null,
    [
      category("ulam", "Mga ulam", [
        [
          "Sinigang na baboy",
          190,
          "Pork and vegetables in a sour tamarind broth.",
        ],
        ["Chicken tinola", 165, "Ginger broth, chicken, and leafy greens."],
      ]),
      category("dessert", "Panghimagas", [
        ["Leche flan", 65],
        ["Turon", 45],
      ]),
    ],
  ),
];
// Data access boundary: replace these functions with API reads when verified data is ready.
export function getRestaurants(): Restaurant[] {
  return restaurants;
}
export function getRestaurant(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}
export const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
export function filterRestaurants(
  data: Restaurant[],
  query: string,
  cuisine: string,
) {
  const words = normalize(query).split(" ").filter(Boolean);
  return data.filter(
    (r) =>
      (cuisine === "All" || r.cuisines.includes(cuisine)) &&
      words.every((word) =>
        normalize(
          [
            r.name,
            ...r.cuisines,
            ...r.menu.flatMap((c) =>
              c.items.map((i) => `${i.name} ${i.description ?? ""}`),
            ),
          ].join(" "),
        ).includes(word),
      ),
  );
}
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(price);
