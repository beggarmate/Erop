import { exportHtmlToExcel } from "@hawjeh/js-to-excel";

const inputFile = document.querySelector(".input-file");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");

let newFileName = "default";
function init_with_name(newTable) {
  exportHtmlToExcel(newTable, {
    name: `${newFileName} Обработанный.xlsx`,
    saveLocal: false,
    sheet: {
      name: "My Sheet 1",
    },
  });
}

inputFile.addEventListener("change", (event) => {
  const file = new FileReader();
  file.addEventListener("load", (e) => {
    console.log(inputFile.files);
    newFileName = inputFile.files[0].name.includes(".html")
      ? inputFile.files[0].name.slice(
          0,
          inputFile.files[0].name.indexOf(".html")
        )
      : inputFile.files[0].name.slice(
          0,
          inputFile.files[0].name.indexOf(".xls")
        );
    let text = e.target.result.slice(
      e.target.result.indexOf("<table"),
      e.target.result.indexOf("table>") + 6
    );
    container.innerHTML = text;
    container.style.display = "none";
    if (document.querySelector(".newTable")) {
      document.querySelector(".newTable").remove();
    }

    const stroka = document.querySelectorAll("tr");
    const yacheiki = document.querySelectorAll("td");
    const zagolovki = document.querySelectorAll("th");
    const nextStrokaIndex = zagolovki.length;

    let indexNazvanieSdelki = getIndex(zagolovki, "Название сделки"),
      indexDateChanges = getIndex(zagolovki, "Дата изменения"),
      indexProductTitle = getIndex(zagolovki, "Товар"),
      indexProductSum = getIndex(zagolovki, "Цена"),
      indexProductKolvo = getIndex(zagolovki, "Количество"),
      indexMontag = getIndex(zagolovki, "Кто выполнял монтаж");

    let deals = [];

    for (let i = 0; i < stroka.length - 1; i++) {
      deals.push(
        new GetDeal(
          yacheiki[indexNazvanieSdelki + nextStrokaIndex * i],
          yacheiki[indexDateChanges + nextStrokaIndex * i],
          yacheiki[indexProductTitle + nextStrokaIndex * i],
          yacheiki[indexProductSum + nextStrokaIndex * i],
          yacheiki[indexProductKolvo + nextStrokaIndex * i],
          yacheiki[indexMontag + nextStrokaIndex * i]
        )
      );
    }
    deals = getPayTypeProperty(deals);
    deals = getConditionCreditProperty(deals);
    deals = getConditionArendaProperty(deals);
    deals = getBuyProperty(deals);
    deals = getCity(deals);

    const newTable = document.createElement("table");
    newTable.className = "newTable";

    newTable.style.border = "1px solid black";
    newTable.innerHTML = `<thead>
  <tr>
        <td>Название сделки</td>
        <td>Дата изменения</td>
        <td>Товар</td>
        <td>Цена</td>
        <td>Количество</td>
        <td>Кто выполнял монтаж</td>
        <td>Безналичный</td>
        <td>Наличный
        </td>
        <td>Рассрочка Безналичный
        </td>
        <td>Рассрочка Наличный
        </td>
        <td>Аренда Безналичный
        </td>
        <td>Аренда Наличный
        </td>
        <td>Безналичный выкуп
        </td>
        <td>Наличный выкуп
        </td>
        <td>Город
        </td>
  </tr>
</thead>
<tbody></tbody>`;
    deals.forEach((deal) => {
      newTable.lastElementChild.innerHTML += `<tr>
      <td>${deal["Название сделки"]}</td>
      <td>${deal["Дата изменения"]}</td>
      <td>${deal["Товар"]}</td>
      <td>${deal["Цена"]}</td>
      <td>${deal["Количество"]}</td>
      <td>${deal["Кто выполнял монтаж"]}</td>
      <td>${deal["Безналичный"]}</td>
      <td>${deal["Наличный"]}</td>
      <td>${deal["Рассрочка Безналичный"]}</td>
      <td>${deal["Рассрочка Наличный"]}</td>
      <td>${deal["Аренда Безналичный"]}</td>
      <td>${deal["Аренда Наличный"]}</td>
      <td>${deal["Безналичный выкуп"]}</td>
      <td>${deal["Наличный выкуп"]}</td>
      <td>${deal["city"]}</td>
      </tr>`;
    });
    // container2.append(newTable);

    outputAnchor.className = "download-btn download-btn-active";
    outputAnchor.addEventListener("click", () => {
      init_with_name(newTable);
  });
  
    console.log(deals);
    console.table(deals);
  });
  file.readAsText(inputFile.files[0]);
});

import {
  getIndex,
  GetDeal,
  getPayTypeProperty,
  getConditionCreditProperty,
  getConditionArendaProperty,
  getBuyProperty,
  getCity,
} from "./fn.js";
const outputAnchor = document.querySelector(".download-btn");
