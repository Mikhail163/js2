"use strict";

/**
Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький (50 рублей, 20 калорий);**
- большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
** - сыром (+ 10 рублей, + 20 калорий);**
** - салатом (+ 20 рублей, + 5 калорий);**
- картофелем (+ 15 рублей, + 10 калорий).

*Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий) и полить майонезом (+ 20 рублей, + 5 калорий). *

Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Используйте ООП-подход (подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).
*/

/**
 * Класс, объекты которого описывают параметры гамбургера. 
 * 
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(id = "food") {

    this.id = id;

    /* Заполняем свойства гамбургера */
    this.info = [
        new HambAttrInfo(50, 20, "маленький", 1, "radio", "SIZE", "Размер гамбургера", "SMALL"),
        new HambAttrInfo(100, 40, "большой", 0, "radio", "SIZE", "Размер гамбургера", "BIG"),
        new HambAttrInfo(10, 20, "сыр", 0, "checkbox", "STUFFING", "Начинка", "CHEESE"),
        new HambAttrInfo(20, 5, "салат", 0, "checkbox", "STUFFING", "Начинка", "SALAD"),
        new HambAttrInfo(15, 10, "картофель", 0, "checkbox", "STUFFING", "Начинка", "POTATO"),
        new HambAttrInfo(15, 0, "майонез", 0, "checkbox", "TOPPING", "Дополнительные вкусняшки", "MAYO"),
        new HambAttrInfo(20, 5, "зелень", 0, "checkbox", "TOPPING", "Дополнительные вкусняшки", "SPICE")
    ];

    this.food = document.getElementById(this.id);
    this.result = null;
    this.total_price = 0;
    this.total_kal = 0;

    this.render();


}

/**
 * Метод подсчитывает калории и цену и выводит результат на экран
 * @param   {integer} [attrId = -1] Какое свойство изменено
 * @returns {string} Вывод результата - строка с подсчитанными значениями
 */
Hamburger.prototype.calculate = function (attrId = -1) {

    let total_kal = 0;
    let total_price = 0;

    for (let i = 0; i < this.info.length; i++) {

        if (i === attrId) {
            // Изменилось свойство
            this.info[i].select = this.info[i].select === 0 ? 1 : 0;

            if (this.info[i].type === "radio") {
                for (let j = 0; j < this.info.length; j++) {

                    if (j != i) {
                        if (this.info[j].type === "radio" && this.info[j].attr === this.info[i].attr) {
                            if (this.info[j].select === 1) {
                                this.info[j].select = 0;
                                if (j < i) {
                                    total_price -= this.info[j].price;
                                    total_kal -= this.info[j].kal;
                                }
                            }
                        }
                    }
                }
            }
        }

        total_price += this.info[i].getPrice();
        total_kal += this.info[i].getKal();

    }

    this.total_kal = total_kal;
    this.total_price = total_price;

    let result = `Цена заказ ${this.total_price} р, калорийность ${this.total_kal} кал`;

    if (attrId != -1)
        this.result.textContent = result;


    return result;

}

/**
 * Отрисовываем наш объект гамбургер
 */
Hamburger.prototype.render = function () {

    // отображаем все свойства
    let div;

    for (let i = 0; i < this.info.length; i++) {

        // создаем новый блок food-item
        if (i === 0 || this.info[i - 1].attr != this.info[i].attr) {
            div = document.createElement('div');
            div.classList.add("food-item");
            this.food.appendChild(div);

            let span = document.createElement('span');
            span.classList.add("food-title");
            span.textContent = this.info[i].ru_attr;
            div.appendChild(span);

            let br = document.createElement('br');
            div.appendChild(br);
        }

        const select = document.createElement('input');

        let attr = document.createAttribute("type");
        attr.value = this.info[i].type;
        select.setAttributeNode(attr);

        attr = document.createAttribute("name");
        attr.value = this.info[i].attr;
        select.setAttributeNode(attr);

        let id = this.info[i].attr + "_" + this.info[i].value;

        attr = document.createAttribute("id");
        attr.value = id;
        select.setAttributeNode(attr);

        attr = document.createAttribute("value");
        attr.value = this.info[i].value;
        select.setAttributeNode(attr);

        if (this.info[i].select === 1) {
            this.total_price += this.info[i].getPrice();
            this.total_kal += this.info[i].getKal();

            attr = document.createAttribute("checked");
            select.setAttributeNode(attr);
        }

        select.addEventListener("change", () => this.calculate(i));
        div.appendChild(select);

        const label = document.createElement('label');

        attr = document.createAttribute("for");
        attr.value = id;
        label.setAttributeNode(attr);

        label.textContent = this.info[i].name;

        div.appendChild(label);

        const br = document.createElement('br');
        div.appendChild(br);
    }

    // создаем форму подсчета
    const form = document.createElement("form");

    form.classList.add("food-item");

    let attr = document.createAttribute("method");
    attr.value = "post";
    form.setAttributeNode(attr);

    attr = document.createAttribute("action");
    attr.value = "#";
    form.setAttributeNode(attr);

    this.result = document.createElement("p");
    this.result.classList.add("food-result");

    this.result.textContent = this.calculate();

    form.appendChild(this.result);

    this.food.appendChild(form);
}

/**
 * Класс аттрибут гамбургера
 * @param {integer} price  Цена параметра
 * @param {integer} kal    Кол-во каллорий
 * @param {string} name   Имя
 * @param {integer} select Выбрано? 1 - да; 0 - нет
 * @param {string} type   это checkbox или select?
 * @param {string} attr   имя параметра
 * @param {string} ru_attr   имя параметра на русском
 * @param {string} value  значение параметра
 */
function HambAttrInfo(price, kal, name, select, type, attr, ru_attr, value) {
    this.price = price;
    this.kal = kal;
    this.name = name;
    this.select = select;
    this.type = type;
    this.attr = attr;
    this.value = value;
    this.ru_attr = ru_attr;
}

/**
 * Возвращаем цену, если свойство выбрано
 * @returns {integer} Цена свойства
 */
HambAttrInfo.prototype.getPrice = function () {
    return this.select === 0 ? 0 : this.price;
};

/**
 * Возвращаем кол-во калорий, если свойство выбрано
 * @returns {integer} Кол-во калорий
 */
HambAttrInfo.prototype.getKal = function () {
    return this.select === 0 ? 0 : this.kal;
};


/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */
/*function HamburgerException(...) { ...
}*/

window.onload = function () {
    let hamburger = new Hamburger();
}
