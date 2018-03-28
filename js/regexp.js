"use strict";

/**
 * Объект обработки регулярных выражений
 */
function Reg() {

}


function Lesson3(parentId) {

    this.parent = document.getElementById(parentId);
    let a = new Task1L3(this.parent);
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
function Task1L3(parent) {

    this.parent = parent;

    this.text = "' Здравствуйте! А в продаже есть печенье «Ореховое»? ' Этого печенья нет, оно закончилось. ' Извините, а почему тогда на витрине выставлена пачка и написано «Ореховое»? ' Где?... Ах, это! Эта пачка не настоящая, а муляж. ' Ух ты! А зачем муляжи-то? ' Чтобы покупатели видели, что обычно «Ореховое» есть у нас в ассортименте.";

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

    field.appendChild(input);

    // Рисуем кнопку поиска и замены
    input = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'button';
    input.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = "Заменить";
    input.setAttributeNode(attr);
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

    // рисуем элемент вывода результатов
    span = document.createElement('span');
    span.innerHTML = "Результат:";
    field.appendChild(span);

    this.result = document.createElement('div');
    this.result.classList.add("result");
    field.appendChild(this.result);


};

Task1L3.prototype.clear = function () {

    this.parent.innerHTML = "";

};

Task1L3.prototype.make = function () {

    ;

};
