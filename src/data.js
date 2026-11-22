export const contacts = {
  phone: "+77007817777",
  phoneLabel: "+7 (700) 781-77-77",
  whatsappNumber: "77007817777",
  whatsappGreeting: "Здравствуйте! Пишу с сайта Titan Arms",
  instagramHandle: "@titan_arms_gym",
  instagramUrl: "https://www.instagram.com/titan_arms_gym/",
  address: "Алматы, Наурызбайский район, ЖК Alma City, ул. Жунисова 2/23, к7",
  mapUrl: "https://2gis.kz/almaty/search/Жунисова%202%2F23",
  venue: "ЖК Alma City, ул. Жунисова 2/23, к7",
};

export const visitPlans = [
  { id: "visits-7-14", title: "12 посещений", terms: "Время посещения: 07:00 — 14:00", time: "07:00 — 14:00", price: 12000, note: "утренний формат" },
  { id: "visits-7-18", title: "12 посещений", terms: "Время посещения: 07:00 — 18:00", time: "07:00 — 18:00", price: 15000, note: "день без спешки" },
  { id: "visits-7-23", title: "12 посещений", terms: "Время посещения: 07:00 — 23:00", time: "07:00 — 23:00", price: 17000, note: "полный доступ" },
];

export const unlimitedPlans = [
  { id: "unlimited-1-month", title: "Безлимит · 1 месяц", terms: "Безлимитный доступ · 1 месяц", period: "1 месяц", price: 19000, note: "первый шаг" },
  { id: "unlimited-3-months", title: "Безлимит · 3 месяца", terms: "Безлимитный доступ · 3 месяца · выгода 20%", period: "3 месяца", price: 45600, note: "выгода 20%", discount: "-20%" },
  { id: "unlimited-6-months", title: "Безлимит · 6 месяцев", terms: "Безлимитный доступ · 6 месяцев · выгода 30%", period: "6 месяцев", price: 79800, note: "выгода 30%", discount: "-30%" },
  { id: "unlimited-1-year", title: "Безлимит · 1 год", terms: "Безлимитный доступ · 1 год · выгода 40%", period: "1 год", price: 136800, note: "выгода 40%", discount: "-40%", deal: true },
];

export const trainers = [
  {
    id: "andrey-gvozdev",
    name: "Гвоздев Андрей",
    image: "./assets/trainer-andrey-gvozdev.jpg",
    alt: "Карточка персонального тренера Гвоздева Андрея",
    specialties: ["ЛФК", "ОФП", "Снижение жира", "Набор мышечной массы", "Силовые тренировки"],
    experience: "Более 5 лет в фитнесе",
    clients: "100+ довольных клиентов",
  },
  {
    id: "khristofor-peskelidi",
    name: "Пескелиди Христофор",
    image: "./assets/trainer-khristofor-peskelidi.jpg",
    alt: "Карточка персонального тренера Пескелиди Христофора",
    specialties: ["ЛФК", "ОФП", "Снижение жира", "Набор мышечной массы", "Силовые тренировки"],
    experience: "Тренерский стаж более 14 лет",
    clients: "Более 1000 клиентов",
  },
  {
    id: "kristina-ivashchenko",
    name: "Иващенко Кристина",
    image: "./assets/trainer-kristina-ivashchenko.jpg",
    alt: "Карточка персонального тренера Иващенко Кристины",
    specialties: ["ЛФК", "ОФП", "Снижение веса", "Набор мышечной массы", "Силовые тренировки"],
    experience: "Более 2 лет в фитнесе",
    clients: "100+ довольных клиентов",
  },
];

export const galleryPhotos = [
  {
    title: "Тренируйся с характером",
    tag: "ЖЕЛЕЗО · 01",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Сила — это привычка",
    tag: "ФОКУС · 02",
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Работай на результат",
    tag: "РЕЖИМ · 03",
    src: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=85",
  },
];

export const instagramTiles = [
  {
    title: "Гвоздев Андрей",
    kind: "ТРЕНЕР · ПРОФИЛЬ",
    image: trainers[0].image,
    position: "center 24%",
  },
  {
    title: "Пескелиди Христофор",
    kind: "ТРЕНЕР · ПРОФИЛЬ",
    image: trainers[1].image,
    position: "center 24%",
  },
  {
    title: "Абонементы Titan Arms",
    kind: "ПРАЙС · 2026",
    image: "./assets/catalog-reference.jpg",
    position: "center 32%",
  },
];

export const demoOrdersStorageKey = "titanArmsDemoOrders";
