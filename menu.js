"use strict";

//Класс Menu
/**
 * Класс меню
 * @param {string} myId         Id меню
 * @param {string} myClass      Класс меню  - используется для стилизации
 * @param {array} [myItems = []]  Пункты меню, по умолчанию их нет
 */
function Menu(myId, myClass, myItems = []) {
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
}

/**
 * Метод класса Menu
 * @param   {array} [myItems = []] массив пунктов меню: заголовок и ссылка
 * @returns {string} Возвращает построеное меню в html коде
 */
Menu.prototype.render = function (myItems = []) {

    if (myItems.length !== 0)
        this.items = myItems;

    var result5 = '<ul class="' + this.className + '" id="' + this.id + '">';

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {
            result5 += this.items[i].renderItem(); //result5 = result5 + this.items[i].renderItem();
        }
    }

    result5 += '</ul>';
    return result5;
};

/**
 * Удаляем наше построенное меню
 */
Menu.prototype.remove = function () {

    this.items = [];

    let menu = document.getElementById(this.id)

    if (menu !== null)
        menu.remove();
};

//Класс для пункта меню
function MenuItem(href, title) {
    this.href = href;
    this.title = title;
}

/**
 * Рендерим пункт меню: заголовок и ссылку
 * @returns {string} Возвращаем html код пункта меню
 */
MenuItem.prototype.renderItem = function () {
    return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
};

/**
 */


// глобальные данные
let menuMain;
let menu1;
let createMenuButton;
let deleteMenuButton;

/**
 * Создаем меню
 */
function createMenu() {

    //console.log(menuMain.render());
    menu1.innerHTML = menuMain.render([
                new MenuItem('/', 'Home'),
                new MenuItem('/about', 'О нас'),
                new MenuItem('/service', 'Услуги'),
                new MenuItem('/blog', 'Блог'),
                new Menu('my2', 'my2', [
                    new MenuItem('/blog/php', 'php'),
                    new MenuItem('/blog/js', 'js'),
                    new MenuItem('/blog/mysql', 'mysql'),
                    new MenuItem('/blog/yii2', 'yii2'),
                ]),
                new MenuItem('/contacts', 'Контакты'),
                //new Menu('34', '324', [])
            ]);
}

/**
 * Удаляем меню
 */
function deleteMenu() {
    menuMain.remove();
}


/**
 * Создаем класс SubMenu со вложенными меню, родитель класс Menu
 * @param {string} myId         Id меню
 * @param {string} myClass      Класс меню  - используется для стилизации
 * @param {array} [myItems = []]  Пункты меню, по умолчанию их нет
 */
function SubMenu(myId, myClass, myItems = []) {
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
}

// Наследуем все методы класса Menu
SubMenu.prototype.__proto__ = Menu.prototype;

/**
 * Метод класса SubMenu
 * @param   {array} [myItems = []] массив пунктов меню: заголовок и ссылка
 * @returns {string} Возвращает построеное меню в html коде
 */
SubMenu.prototype.render = function (myItems = []) {

    if (myItems.length !== 0)
        this.items = myItems;

    var result5 = '<ul class="' + this.className + '" id="' + this.id + '">';

    for (var i = 0; i < this.items.length; i++) {

        if (this.items[i] instanceof Menu) {
            result5 += this.items[i].render();
        } else if (this.items[i] instanceof MenuItem) {
            result5 += this.items[i].renderItem(); //result5 = result5 + this.items[i].renderItem();
        }
    }

    result5 += '</ul>';
    return result5;
};

window.onload = function () {

    menu1 = document.getElementById('menu1');
    menuMain = new SubMenu('my1', 'my1');

    createMenuButton = document.getElementById("createMenu");
    deleteMenuButton = document.getElementById("deleteMenu");

    createMenuButton.addEventListener("click", createMenu);
    deleteMenuButton.addEventListener("click", deleteMenu);



    //menu1.remove();//Удаляет меню из DOM (со страницы)
}
