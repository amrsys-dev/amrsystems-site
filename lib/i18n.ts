export type Lang = "ru" | "uz" | "ar" | "en";
export const LANGS: [Lang, string, string][] = [["ru", "🇷🇺", "Русский"], ["uz", "🇺🇿", "Oʻzbekcha"], ["ar", "🇸🇦", "العربية"], ["en", "🇬🇧", "English"]];
export const SLUGS = ["safar", "hub", "3d-constructor", "vision", "materials"] as const;
export type Slug = (typeof SLUGS)[number];
export const META: Record<Slug, { name: string; icon: string; status: "dev" | "soon" | "live"; cover?: string; og?: string }> = {
  safar: { name: "AMR Safar", icon: "i-van", status: "dev" },
  hub: { name: "AMR Service Hub", icon: "i-services", status: "soon" },
  "3d-constructor": { name: "AMR 3D Constructor", icon: "i-tool", status: "soon" },
  vision: { name: "AMR Vision", icon: "i-rent", status: "live", cover: "/apps/vision/cover.jpg", og: "/apps/vision/og.jpg" },
  materials: { name: "AMR Materials", icon: "i-bag", status: "soon" },
};
type P = { tag: string; value: string; f: [string, string][] };
type D = {
  products: string; signin: string; signup: string; account: string; tagline: string; sub: string; learn: string; open: string; soon: string; dev: string; live: string; explore: string;
  features: string; email: string; password: string; name: string; google: string; or: string; noacc: string; haveacc: string; authoff: string; signout: string; hello: string; pwhint: string;
  p: Record<Slug, P>;
};
export const T: Record<Lang, D> = {
  ru: {
    products: "Продукты", signin: "Войти", signup: "Регистрация", account: "Аккаунт",
    tagline: "Одна экосистема. Безграничные возможности.", sub: "AMR Systems: цифровые продукты для дома, ремесла и жизни в Саудовской Аравии.",
    learn: "Подробнее", open: "Открыть приложение", soon: "Скоро", dev: "В разработке", live: "Работает", explore: "Все продукты", features: "Возможности",
    email: "Эл. почта", password: "Пароль", name: "Имя", google: "Продолжить с Google", or: "или", noacc: "Нет аккаунта? Зарегистрируйтесь", haveacc: "Уже есть аккаунт? Войдите",
    authoff: "Вход и регистрация скоро заработают.", signout: "Выйти", hello: "Вы вошли как", pwhint: "Не меньше 8 символов",
    p: {
      safar: { tag: "Дорога под контролем.", value: "Мини-приложение в Telegram для водителей межгорода в КСА.", f: [["Счётчик дней визы", "Сколько дней осталось по визе — всегда перед глазами."], ["Маршрут и топливо", "Маршрут между городами КСА и стоимость топлива заранее."], ["Отметки на дороге", "Ремонт дороги, опасные участки и ДТП — водители отмечают для своих."], ["Попутчики к границе", "Иордания (Аль-Хадиса, Аль-Умари) и Катар (Салва). Объявления удаляются после выезда."]] },
      hub: { tag: "Люди в решениях.", value: "Сервисы и помощь для приезжих в Саудовской Аравии в одном месте.", f: [["Услуги рядом", "Мастера, перевозки и бытовые услуги."], ["На родном языке", "Русский, узбекский, арабский и английский."], ["Через Telegram", "Связь с исполнителями там, где вам удобно."]] },
      "3d-constructor": { tag: "От идеи до реальности.", value: "3D-конструктор мебели: соберите проект и увидьте его до изготовления.", f: [["3D-проект", "Размеры, материалы и вид изделия в объёме."], ["Под ваш размер", "Мебель, подогнанная под конкретное помещение."], ["Готово к производству", "Проект, который можно передать мастеру."]] },
      vision: { tag: "Шкаф и раскрой.", value: "Проектируйте шкаф в 2D и 3D и сразу получайте раскрой листа 2440×1220.", f: [["2D чертёж", "Размеры, полки и двери шкафа на чертеже."], ["3D вид", "Шкаф в объёме: крутите и смотрите со всех сторон."], ["Раскрой листа", "Детали на листе 2440×1220 и процент заполнения."]] },
      materials: { tag: "Устойчивые инновации.", value: "Материалы и композиты для мебели и ремесла.", f: [["Каталог материалов", "Свойства и применение материалов."], ["Композиты", "Современные решения для прочных изделий."], ["Устойчивость", "Акцент на бережном использовании ресурсов."]] },
    },
  },
  uz: {
    products: "Mahsulotlar", signin: "Kirish", signup: "Roʻyxatdan oʻtish", account: "Akkaunt",
    tagline: "Bitta ekotizim. Cheksiz imkoniyatlar.", sub: "AMR Systems: uy, hunarmandchilik va Saudiya Arabistonidagi hayot uchun raqamli mahsulotlar.",
    learn: "Batafsil", open: "Ilovani ochish", soon: "Tez orada", dev: "Ishlab chiqilmoqda", live: "Ishlaydi", explore: "Barcha mahsulotlar", features: "Imkoniyatlar",
    email: "Email", password: "Parol", name: "Ism", google: "Google bilan davom etish", or: "yoki", noacc: "Akkaunt yoʻqmi? Roʻyxatdan oʻting", haveacc: "Akkaunt bormi? Kiring",
    authoff: "Kirish va roʻyxatdan oʻtish tez orada ishlaydi.", signout: "Chiqish", hello: "Siz kirdingiz:", pwhint: "Kamida 8 ta belgi",
    p: {
      safar: { tag: "Yoʻl nazoratda.", value: "Saudiyadagi shaharlararo haydovchilar uchun Telegram mini-ilovasi.", f: [["Viza kunlari hisoblagichi", "Vizangiz tugashiga necha kun qolgani doim koʻz oldingizda."], ["Yoʻnalish va yoqilgʻi", "Saudiya shaharlari orasidagi yoʻnalish va yoqilgʻi narxi oldindan."], ["Yoʻldagi belgilar", "Yoʻl taʼmiri, xavfli joylar va avariyalar — haydovchilar bir-biri uchun belgilaydi."], ["Chegaraga hamrohlar", "Iordaniya (Al-Hadisa, Al-Umari) va Qatar (Salva). Eʼlonlar joʻnab ketgandan keyin oʻchiriladi."]] },
      hub: { tag: "Yechimlardagi odamlar.", value: "Saudiya Arabistonidagi mehmonlar uchun xizmatlar va yordam bir joyda.", f: [["Yaqin xizmatlar", "Ustalar, tashish va maishiy xizmatlar."], ["Ona tilida", "Rus, oʻzbek, arab va ingliz tillarida."], ["Telegram orqali", "Ijrochilar bilan qulay joyda aloqa."]] },
      "3d-constructor": { tag: "Gʻoyadan haqiqatga.", value: "Mebel uchun 3D konstruktor: loyihani tuzing va tayyorlanishidan oldin koʻring.", f: [["3D loyiha", "Oʻlchamlar, materiallar va buyumning hajmdagi koʻrinishi."], ["Oʻlchamingizga", "Aniq xonaga moslangan mebel."], ["Ishlab chiqarishga tayyor", "Ustaga topshirsa boʻladigan loyiha."]] },
      vision: { tag: "Shkaf va bichish.", value: "Shkafni 2D va 3D da loyihalang va 2440×1220 list bichimini darhol oling.", f: [["2D chizma", "Shkaf oʻlchamlari, tokchalari va eshiklari."], ["3D koʻrinish", "Shkafni har tomondan aylantirib koʻring."], ["List bichimi", "Detallar 2440×1220 listda va toʻldirish foizi."]] },
      materials: { tag: "Barqaror innovatsiyalar.", value: "Mebel va hunarmandchilik uchun materiallar va kompozitlar.", f: [["Materiallar katalogi", "Materiallarning xossalari va qoʻllanilishi."], ["Kompozitlar", "Mustahkam buyumlar uchun zamonaviy yechimlar."], ["Barqarorlik", "Resurslardan ehtiyotkorlik bilan foydalanish."]] },
    },
  },
  ar: {
    products: "المنتجات", signin: "تسجيل الدخول", signup: "إنشاء حساب", account: "الحساب",
    tagline: "منظومة واحدة. إمكانيات لا حدود لها.", sub: "AMR Systems: منتجات رقمية للمنزل والحِرفة والحياة في المملكة العربية السعودية.",
    learn: "المزيد", open: "فتح التطبيق", soon: "قريبًا", dev: "قيد التطوير", live: "متاح", explore: "كل المنتجات", features: "المزايا",
    email: "البريد الإلكتروني", password: "كلمة المرور", name: "الاسم", google: "المتابعة باستخدام Google", or: "أو", noacc: "ليس لديك حساب؟ أنشئ حسابًا", haveacc: "لديك حساب؟ سجّل الدخول",
    authoff: "تسجيل الدخول وإنشاء الحساب سيتوفران قريبًا.", signout: "تسجيل الخروج", hello: "تم تسجيل الدخول باسم", pwhint: "8 أحرف على الأقل",
    p: {
      safar: { tag: "الطريق تحت السيطرة.", value: "تطبيق مصغّر في تيليجرام لسائقي الرحلات بين المدن في المملكة.", f: [["عدّاد أيام التأشيرة", "عدد الأيام المتبقية في تأشيرتك أمامك دائمًا."], ["المسار والوقود", "المسار بين مدن المملكة وتكلفة الوقود مسبقًا."], ["علامات على الطريق", "أعمال الطرق والمقاطع الخطرة والحوادث يضعها السائقون لبعضهم."], ["رفقاء الطريق إلى الحدود", "الأردن (الحديثة، العمري) وقطر (سلوى). تُحذف الإعلانات بعد المغادرة."]] },
      hub: { tag: "أشخاص في الحلول.", value: "خدمات ومساعدة للقادمين إلى المملكة في مكان واحد.", f: [["خدمات قريبة", "حِرفيون ونقل وخدمات منزلية."], ["بلغتك", "الروسية والأوزبكية والعربية والإنجليزية."], ["عبر تيليجرام", "تواصل مع مقدّمي الخدمة حيث يناسبك."]] },
      "3d-constructor": { tag: "من الفكرة إلى الواقع.", value: "مصمّم أثاث ثلاثي الأبعاد: أنشئ مشروعك وشاهده قبل التصنيع.", f: [["مشروع ثلاثي الأبعاد", "المقاسات والمواد وشكل القطعة بالأبعاد الثلاثة."], ["على مقاسك", "أثاث مصمّم لمساحتك بالتحديد."], ["جاهز للتصنيع", "مشروع يمكن تسليمه للحِرفي."]] },
      vision: { tag: "الخزانة والتقطيع.", value: "صمّم خزانتك بالأبعاد الثنائية والثلاثية واحصل فورًا على مخطط تقطيع لوح 2440×1220.", f: [["رسم ثنائي الأبعاد", "مقاسات الخزانة والرفوف والأبواب."], ["عرض ثلاثي الأبعاد", "شاهد الخزانة من كل الجهات."], ["تقطيع اللوح", "القطع على لوح 2440×1220 ونسبة الاستغلال."]] },
      materials: { tag: "ابتكار مستدام.", value: "مواد ومركّبات للأثاث والحِرف.", f: [["دليل المواد", "خصائص المواد واستخداماتها."], ["المواد المركّبة", "حلول حديثة لقطع متينة."], ["الاستدامة", "استخدام واعٍ للموارد."]] },
    },
  },
  en: {
    products: "Products", signin: "Sign in", signup: "Sign up", account: "Account",
    tagline: "One ecosystem. Infinite possibilities.", sub: "AMR Systems: digital products for home, craft and life in Saudi Arabia.",
    learn: "Learn more", open: "Open app", soon: "Coming soon", dev: "In development", live: "Live", explore: "All products", features: "Features",
    email: "Email", password: "Password", name: "Name", google: "Continue with Google", or: "or", noacc: "No account? Sign up", haveacc: "Have an account? Sign in",
    authoff: "Sign in and sign up are coming soon.", signout: "Sign out", hello: "Signed in as", pwhint: "At least 8 characters",
    p: {
      safar: { tag: "The road, under control.", value: "A Telegram mini-app for intercity drivers in KSA.", f: [["Visa day counter", "See how many days are left on your visa at a glance."], ["Route and fuel", "Routes between KSA cities with fuel cost in advance."], ["Road marks", "Road works, dangerous sections and accidents, marked by drivers for drivers."], ["Fellow travellers to the border", "Jordan (Al-Haditha, Al-Omari) and Qatar (Salwa). Listings are deleted after departure."]] },
      hub: { tag: "People in solutions.", value: "Services and help for newcomers in Saudi Arabia, in one place.", f: [["Services nearby", "Craftsmen, transport and home services."], ["In your language", "Russian, Uzbek, Arabic and English."], ["Via Telegram", "Reach providers where it suits you."]] },
      "3d-constructor": { tag: "From idea to reality.", value: "A 3D furniture constructor: build your project and see it before it's made.", f: [["3D project", "Dimensions, materials and the piece in full 3D."], ["Made to measure", "Furniture fitted to your exact space."], ["Ready for production", "A project you can hand to a craftsman."]] },
      vision: { tag: "Cabinets and cutting.", value: "Design a cabinet in 2D and 3D and get a 2440×1220 sheet cutting plan right away.", f: [["2D drawing", "Cabinet size, shelves and doors on a drawing."], ["3D view", "Turn the cabinet and see it from every side."], ["Sheet cutting", "Parts laid out on a 2440×1220 sheet with fill rate."]] },
      materials: { tag: "Sustainable innovation.", value: "Materials and composites for furniture and craft.", f: [["Materials catalogue", "Properties and uses of materials."], ["Composites", "Modern solutions for durable pieces."], ["Sustainability", "Careful use of resources."]] },
    },
  },
};
