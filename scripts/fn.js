export {
  getIndex,
  GetDeal,
  getPayTypeProperty,
  getConditionCreditProperty,
  getConditionArendaProperty,
  getBuyProperty,
  getCity,
};

function getIndex(arr, name) {
  let x = 0;
  arr.forEach((item, index) => {
    if (item.textContent.includes(name)) {
      x = index;
    }
  });
  return x;
}

function GetDeal(
  dealName,
  dealDate,
  dealproduct,
  dealSum,
  dealQuantity,
  dealMontage
) {
  this["Название сделки"] = `${dealName?.textContent} `;
  this["Дата изменения"] = dealDate?.textContent;
  this["Товар"] = dealproduct?.textContent;
  this["Цена"] = +dealSum?.textContent || null;
  this["Количество"] = +dealQuantity?.textContent || null;
  this["Кто выполнял монтаж"] = dealMontage?.textContent;
}

function getPayTypeProperty(arr) {
  return arr.map((item) => {
    if (item["Товар"].includes("БезНал")) {
      return {
        ...item,
        ["Безналичный"]: item["Цена"] * item["Количество"],
        ["Наличный"]: false,
      };
    }
    if (!item["Товар"].includes("БезНал") && item["Товар"].includes("Нал")) {
      return {
        ...item,
        ["Безналичный"]: false,
        ["Наличный"]: item["Цена"] * item["Количество"],
      };
    }
    return { ...item, ["Безналичный"]: false, ["Наличный"]: false };
  });
}

function getConditionCreditProperty(arr) {
  return arr.map((item) => {
    if (
      (item["Товар"].includes("6 мес") &&
        !item["Наличный"] &&
        item["Безналичный"]) ||
      (item["Товар"].includes("2 мес") &&
        !item["Наличный"] &&
        item["Безналичный"])
    ) {
      return {
        ...item,
        ["Рассрочка Безналичный"]: item["Цена"] * item["Количество"],
        ["Рассрочка Наличный"]: false,
      };
    }
    if (
      (item["Товар"].includes("6 мес") &&
        item["Наличный"] &&
        !item["Безналичный"]) ||
      (item["Товар"].includes("2 мес") &&
        item["Наличный"] &&
        !item["Безналичный"])
    ) {
      return {
        ...item,
        ["Рассрочка Наличный"]: item["Цена"] * item["Количество"],
        ["Рассрочка Безналичный"]: false,
      };
    }
    return {
      ...item,
      ["Рассрочка Безналичный"]: false,
      ["Рассрочка Наличный"]: false,
    };
  });
}

function getConditionArendaProperty(arr) {
  return arr.map((item) => {
    if (
      item["Товар"].includes("Аренда") &&
      !item["Наличный"] &&
      item["Безналичный"]
    ) {
      return {
        ...item,
        ["Аренда Безналичный"]: item["Цена"] * item["Количество"],
        ["Аренда Наличный"]: false,
      };
    }
    if (
      item["Товар"].includes("Аренда") &&
      item["Наличный"] &&
      !item["Безналичный"]
    ) {
      return {
        ...item,
        ["Аренда Наличный"]: item["Цена"] * item["Количество"],
        ["Аренда Безналичный"]: false,
      };
    }
    return {
      ...item,
      ["Аренда Безналичный"]: false,
      ["Аренда Наличный"]: false,
    };
  });
}

function getBuyProperty(arr) {
  return arr.map((item) => {
    if (
      !item["Аренда Безналичный"] &&
      !item["Аренда Наличный"] &&
      !item["Рассрочка Безналичный"] &&
      !item["Рассрочка Наличный"]
    ) {
      return {
        ...item,
        ["Безналичный выкуп"]: item["Безналичный"] || false,
        ["Наличный выкуп"]: item["Наличный"] || false,
      };
    }
    return { ...item, ["Безналичный выкуп"]: false, ["Наличный выкуп"]: false };
  });
}

const citys = [
  "Камень-на-Оби",
  "Камень",
  "Яровое",
  "Адриановка",
  "Березовский",
  "Борисовский",
  "Тамбовский",
  "Тельманский",
  "Толстовский",
  "Трубачево",
  "Гусиная Ляга",
  "Филипповский",
  "Черемшанка",
  "Алейск",
  "Алеус",
  "Александровка",
  "Аллак",
  "Ананьевка",
  "Андроново",
  "Антоново",
  "Баево",
  "Байгамут",
  "Березовка",
  "Благовещенка",
  "Богатское",
  "Большеромановка",
  "Большой Лог",
  "Боровое",
  "Бурла",
  "Буян",
  "Васильевка",
  "Велижанка",
  "Верх-Аллак",
  "Верх-Пайва",
  "Верх-Чуманка",
  "Вершинино",
  "Воробьево",
  "Гальбштадт",
  "Гилевка",
  "Гонохово",
  "Гришковка",
  "Грязново",
  "Гусиная-Ляга",
  "Дресвянка",
  "Дубровино",
  "Елунино",
  "Еремеевка",
  "Забавное",
  "Заковряшино",
  "Заплывино",
  "Зеркалы",
  "Зимино",
  "Иня",
  "Истимис",
  "Камышевка",
  "Камышенка",
  "Караси",
  "Качусово",
  "Кибасово",
  "Киприно",
  "Кирей",
  "Клочки",
  "Ключи",
  "Корнилово",
  "Коробейниково",
  "Кособоково",
  "Красноярка",
  "Крутиха",
  "Крутишка",
  "Куликово",
  "Кулунда",
  "Кусак",
  "Ларичиха",
  "Леньки",
  "Лесное",
  "Луговое",
  "Луковка",
  "Максимовка",
  "Малетино",
  "Маловолчанка",
  "Малышев-Лог",
  "Митрофаново",
  "Мыски",
  "Нечунаево",
  "Нижне-Чуманка",
  "Николаевка",
  "Новоандреевка",
  "Новобарнаулка",
  "Новокиевка",
  "Новокормиха",
  "Новопесчаное",
  "Новопетровка",
  "Новоярки",
  "Обское",
  "Овечкино",
  "Орехово",
  "Орловка",
  "Паклино",
  "Панкрушиха",
  "Первомайское",
  "Плотава",
  "Подветренно-Телеутское",
  "Поперечное",
  "Притыка",
  "Прослауха",
  "Ребриха",
  "Романово",
  "Рыбное",
  "Сафроново",
  "Селиверстово",
  "Сидоровка",
  "Ситниково",
  "Смирненькое",
  "Степное Озеро",
  "Столбово",
  "Суворовка",
  "Табуны",
  "Татьяновка",
  "Топчиха",
  "Тугозвоново",
  "Тюменцево",
  "Удальное",
  "Урывки",
  "Усть-Алеус",
  "Усть-Мосиха",
  "Цветополь",
  "Чайкино",
  "Чарышское",
  "Чернопятово",
  "Шарчино",
  "Шаталовка",
  "Шелаболиха",
  "Шилово",
  "Шипуново",
  "Шумилиха",
  "Плотинная",
  "Шпагино",
  "Ветренно-Телеутское",
  "Гавриловский",
  "Заводской",
  "Карповский",
  "Комсомольский",
  "Королевский",
  "Масляха",
  "Молодежный",
  "Новообинцево",
  "Октябрьский",
  "Правда",
  "Радостный",
  "Раздольный",
  "Ребриха",
  "Самарский",
  "Вылково",
  "Балей",
  "Борзя",
  "Могоча",
  "Нерчинск",
  "Шилка",
  "Дарасун",
  "Карымское",
  "Первомайский",
  "Чернышевск",
  "Шерловая Гора",
  "Алеур",
  "Кадахта",
  "Называевск",
  "Тюкалинск",
  "Марьяновка",
  "Муромцево",
];

function getCity(arr) {
  return arr.map((item) => {
    for (let i = 0; i < citys.length; i++) {
      if (
        item["Название сделки"].includes("Забайкальск ") ||
        item["Название сделки"].includes("Забайкальск,")
      ) {
        return { ...item, city: "Забайкальск" };
      }
      if (item["Название сделки"].includes(citys[i])) {
        return { ...item, city: citys[i] };
      }
    }
    return { ...item, city: false };
  });
}
