/* =============================================================
   menu-data.js — ДАННЫЕ БЛЮД (рыба-заготовка)
   -------------------------------------------------------------
   Это ЕДИНСТВЕННЫЙ файл, который вам нужно редактировать,
   чтобы наполнить меню. Вёрстку трогать не нужно.

   Структура одного блюда:
   {
     id:          уникальный идентификатор (строка/число), НЕ повторять
     category:    ключ категории — один из:
                  "appetizers" | "soups" | "salads" | "pasta_pizza" |
                  "mains" | "grill" | "vegetarian" | "desserts" | "drinks"
     name:        { ru, en, ka } — название на трёх языках
     description: { ru, en, ka } — краткое описание (в карточке обрежется)
     ingredients: { ru, en, ka } — состав (показывается в модалке)
     price:       число (в лари ₾). Валюту меняйте в script.js -> CURRENCY
     image:       путь к фото. Пока "" -> покажется красивый плейсхолдер
     tags:        массив из: "vegetarian","vegan","spicy","gluten_free","seafood"
     badges:      массив из: "hit","new"  (или [] если нет)
     allergens:   { ru, en, ka } — строка аллергенов
     prepTime:    время приготовления в минутах (число) — участвует в квизе
     spiceLevel:  острота 0–3 (число) — участвует в квизе и в иконках 🌶️
   }

   👉 ЧТОБЫ ДОБАВИТЬ БЛЮДО: скопируйте любой объект ниже и поменяйте поля.
   👉 ЧТОБЫ ВСТАВИТЬ ФОТО: положите файл (например в /img) и укажите
      image: "img/имя-файла.jpg"
   ============================================================= */

const MENU_DATA = [
  /* ---------- ЗАКУСКИ ---------- */
  {
    id: "app-1",
    category: "appetizers",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: {
      ru: "[ОПИСАНИЕ БЛЮДА: 1–2 короткие строки для карточки]",
      en: "[DISH DESCRIPTION: 1–2 short lines for the card]",
      ka: "[კერძის აღწერა: 1–2 მოკლე სტრიქონი ბარათისთვის]",
    },
    ingredients: {
      ru: "[СОСТАВ: перечислите ингредиенты]",
      en: "[INGREDIENTS: list ingredients]",
      ka: "[შემადგენლობა: ჩამოთვალეთ ინგრედიენტები]",
    },
    price: 0,
    image: "",
    tags: ["vegetarian"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 10,
    spiceLevel: 0,
  },
  {
    id: "app-2",
    category: "appetizers",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: {
      ru: "[ОПИСАНИЕ БЛЮДА]",
      en: "[DISH DESCRIPTION]",
      ka: "[კერძის აღწერა]",
    },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["spicy"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 15,
    spiceLevel: 2,
  },
  {
    id: "app-3",
    category: "appetizers",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["seafood"],
    badges: ["new"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 12,
    spiceLevel: 0,
  },

  /* ---------- СУПЫ ---------- */
  {
    id: "soup-1",
    category: "soups",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian", "gluten_free"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 20,
    spiceLevel: 1,
  },
  {
    id: "soup-2",
    category: "soups",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: [],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 25,
    spiceLevel: 0,
  },

  /* ---------- САЛАТЫ ---------- */
  {
    id: "salad-1",
    category: "salads",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegan", "gluten_free"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 8,
    spiceLevel: 0,
  },
  {
    id: "salad-2",
    category: "salads",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian"],
    badges: ["new"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 10,
    spiceLevel: 0,
  },

  /* ---------- ПАСТА И ПИЦЦА ---------- */
  {
    id: "pasta-1",
    category: "pasta_pizza",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 18,
    spiceLevel: 0,
  },
  {
    id: "pasta-2",
    category: "pasta_pizza",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["seafood"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 22,
    spiceLevel: 1,
  },

  /* ---------- ОСНОВНЫЕ БЛЮДА ---------- */
  {
    id: "main-1",
    category: "mains",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["gluten_free"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 30,
    spiceLevel: 1,
  },
  {
    id: "main-2",
    category: "mains",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["spicy"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 35,
    spiceLevel: 3,
  },

  /* ---------- ГРИЛЬ ---------- */
  {
    id: "grill-1",
    category: "grill",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["gluten_free"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 40,
    spiceLevel: 1,
  },
  {
    id: "grill-2",
    category: "grill",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["seafood", "gluten_free"],
    badges: ["new"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 28,
    spiceLevel: 0,
  },

  /* ---------- ВЕГЕТАРИАНСКОЕ ---------- */
  {
    id: "veg-1",
    category: "vegetarian",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian", "vegan"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 20,
    spiceLevel: 1,
  },
  {
    id: "veg-2",
    category: "vegetarian",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian", "gluten_free"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 15,
    spiceLevel: 0,
  },

  /* ---------- ДЕСЕРТЫ ---------- */
  {
    id: "dessert-1",
    category: "desserts",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 12,
    spiceLevel: 0,
  },
  {
    id: "dessert-2",
    category: "desserts",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian", "gluten_free"],
    badges: ["new"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 10,
    spiceLevel: 0,
  },

  /* ---------- НАПИТКИ ---------- */
  {
    id: "drink-1",
    category: "drinks",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegan", "gluten_free"],
    badges: [],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 3,
    spiceLevel: 0,
  },
  {
    id: "drink-2",
    category: "drinks",
    name: { ru: "[НАЗВАНИЕ БЛЮДА]", en: "[DISH NAME]", ka: "[კერძის სახელი]" },
    description: { ru: "[ОПИСАНИЕ БЛЮДА]", en: "[DISH DESCRIPTION]", ka: "[კერძის აღწერა]" },
    ingredients: { ru: "[СОСТАВ]", en: "[INGREDIENTS]", ka: "[შემადგენლობა]" },
    price: 0,
    image: "",
    tags: ["vegetarian"],
    badges: ["hit"],
    allergens: { ru: "[АЛЛЕРГЕНЫ]", en: "[ALLERGENS]", ka: "[ალერგენები]" },
    prepTime: 5,
    spiceLevel: 0,
  },
];

/* Порядок категорий на странице меню (табы и секции).
   Ключи должны совпадать с cat_* в i18n.js и с category у блюд. */
const MENU_CATEGORIES = [
  "appetizers",
  "soups",
  "salads",
  "pasta_pizza",
  "mains",
  "grill",
  "vegetarian",
  "desserts",
  "drinks",
];

/* экспорт в глобальную область */
window.MENU_DATA = MENU_DATA;
window.MENU_CATEGORIES = MENU_CATEGORIES;
