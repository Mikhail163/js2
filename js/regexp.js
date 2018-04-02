"use strict";

/**
 * Объект обработки регулярных выражений
 */
function Reg() {

}


function Lesson3(parentId, task = 0) {

    let a;
    this.parent = document.getElementById(parentId);
    switch (task) {
        case 0:
            a = new Task1L3(this.parent);
            break;
        case 1:
            a = new Task2L3(this.parent);
            break;
    }
}

/**
 * Дан большой текст, в котором для обозначения диалогов 
 * используются одинарные кавычки. Придумать шаблон, который 
 * меняет одинарные кавычки на двойные.
 */
Lesson3.prototype.task1Make = function () {

    class_ = class_ === "" ? " " : ' class="' + class_ + '" ';
    id = id === "" ? " " : ' id="' + id + '" ';

};

/**
 * Задание 1 урока 3:
 * Дан большой текст, в котором для обозначения диалогов 
 * используются одинарные кавычки. Придумать шаблон, который 
 * меняет одинарные кавычки на двойные.
 */
function Task1L3(parent, text = "") {

    this.parent = parent;


    this.text = text === "" ? "' wasn't isn't aren'rerer Здравствуйте! А в продаже есть печенье «Ореховое»? ' Этого печенья нет, оно закончилось. ' Извините, а почему тогда на витрине выставлена пачка и написано «Ореховое»? ' Где?... Ах, это! Эта пачка не настоящая, а муляж. ' Ух ты! А зачем муляжи-то? ' Чтобы покупатели видели, что обычно «Ореховое» есть у нас в ассортименте." : text;

    this.find = "'";
    this.replace = '"';
    this.pattern = "";

    this.result;

    this.render();

}

/**
 * Отрисовываем 5 объектов
 * 1) что ищем
 * 2) на что меняем найденное
 * 3) кнопка поиск и замена
 * 4) поле с исходным текстом
 * 5) результат
 */
Task1L3.prototype.render = function () {

    this.clear();

    let field = document.createElement('div');
    field.classList.add("field");
    this.parent.appendChild(field);

    // Что меняем?
    let span = document.createElement('span');
    span.innerHTML = "Что меняем?";
    field.appendChild(span);


    let input = document.createElement('input');
    let attr = document.createAttribute("type");
    attr.value = 'text';
    input.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = this.find;
    input.setAttributeNode(attr);

    input.addEventListener('change', (e) => this.findChange(e));

    field.appendChild(input);

    // На что меняем?
    span = document.createElement('span');
    span.innerHTML = "На что меняем?";
    field.appendChild(span);


    input = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'text';
    input.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = this.replace;
    input.setAttributeNode(attr);

    input.addEventListener('change', (e) => this.replaceChange(e));

    field.appendChild(input);




    // Создаем новое поле, для текста и результата
    field = document.createElement('div');
    field.classList.add("field");
    this.parent.appendChild(field);

    // Исходный текст
    span = document.createElement('span');
    span.innerHTML = "Исходный текст";
    field.appendChild(span);


    input = document.createElement('textarea');
    input.textContent = this.text;
    field.appendChild(input);
    input.addEventListener('change', (e) => this.textChange(e));

    // Рисуем кнопку поиска и замены
    input = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'button';
    input.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = "Заменить";
    input.setAttributeNode(attr);

    input.addEventListener('click', (e) => this.make());

    field.appendChild(input);

    // рисуем элемент вывода результатов
    span = document.createElement('span');
    span.innerHTML = "Результат:";
    field.appendChild(span);

    this.result = document.createElement('div');
    this.result.classList.add("result");
    field.appendChild(this.result);


};

/**
 * Изменили строку, которую нужно найти
 * @param {object} event Событие вызвавшее изменение
 */
Task1L3.prototype.findChange = function (event) {
    this.find = event.path[0].value;

    // Проверяем на запрещенные символы
    console.log("find = " + this.find);
};

/**
 * Изменили заменяемую строку
 * @param {object} event событие, вызвавшее изменение
 */
Task1L3.prototype.replaceChange = function (event) {

    this.replace = event.path[0].value;

    console.log("replace = " + this.replace);

};

/**
 * События изменения текста
 * @param {object} event Объект, который вызвал событие - извлекаем текст
 */
Task1L3.prototype.textChange = function (event) {

    this.text = event.path[0].textContent;
    console.log("text = " + this.text);
};

/**
 * Полностю очищаем поле задания со всеми элементами
 */
Task1L3.prototype.clear = function () {

    this.parent.innerHTML = "";

};

/**
 * Выполняем замену символов с помощью регулярных выражений
 */
Task1L3.prototype.make = function () {


    let regex = new RegExp(this.find, "g");

    this.result.textContent = this.text.replace(regex, this.replace);

};


/**
 * Выполняем второе задание - это то же первое задание
 * только изменился один метод обработки
 * @param {[[Type]]} parent [[Description]]
 */

function Task2L3(parent) {
    Task1L3.call(this, parent);

}

Task2L3.prototype = Object.create(Task1L3.prototype);

/**
 * Задание 2 урока 3:
 * Улучшить шаблон таким образом, чтобы конструкции типа aren’t не меняли одинарную кавычку на двойную.
 */
Task2L3.prototype.make = function () {

    // условие
    let condition1 = "(?!\\w)";
    let condition2 = "(?!t)";
    let regex = new RegExp(condition1 + this.find + condition2, "g");

    this.result.textContent = this.text.replace(regex, this.replace);

};

function FeedBack(parent) {
    this.parent = parent;
    //Имя, Телефон, e-mail, текст, кнопка «Отправить».

    this.name;
    this.phone;
    this.mail;
    this.text;
}

FeedBack.prototype.render = function () {

}
