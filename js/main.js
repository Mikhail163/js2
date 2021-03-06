"use strict";

function Link(url = "", name = "") {

    this.url = "#" + url;
    this.name = name;

}

Link.prototype.getHtmlCode = function (class_ = "", id = "") {

    class_ = class_ === "" ? " " : ' class="' + class_ + '" ';
    id = id === "" ? " " : ' id="' + id + '" ';

    return `<a href="${this.url}" ${class_} ${id}>${this.name}</a>`;
};

function Page(h1 = "", description = [], link = new Link(), subpages = []) {
    this.h1 = h1;
    this.link = link;
    this.description = description;
    this.subpages = subpages;

}





/**
 * Контент на нашей странице
 * @param {string} contentId = "content" Id того, где все будем отрисовывать
 * @param {string} menuId = "main_menu"  Id главного меню
 */
function Content(contentId = "content", menuId = "main_menu") {
    this.pages = [];
    this.headNav = "";

    this.content = document.getElementById(contentId);
    this.mainMenu = document.getElementById(menuId);
    this.mainMenuClass = "menu";

    // Индекс текущей страницы
    this.pageId = -1;
    this.subPageId = -1;

    // Это html элементы, которые меняются
    // при изменение ссылок
    this.h1;
    this.nav;
    this.subMenu;
    this.description;
    this.task;

    this.xhr = new XMLHttpRequest();


    // загружаем файл с метаинформацией с помощью ajax
    this.xhr.open('GET', './json/main.json');

    this.xhr.onreadystatechange = () => this.getAjax();

    this.xhr.send();

}

/**
 * Обработчик полученных ajax запросов
 */
Content.prototype.getAjax = function () {
    //console.log(this.xhr.readyState);

    if (this.xhr.readyState !== 4) {
        return;
    }

    if (this.xhr.status !== 200 && this.xhr.status !== 0) {
        console.log('Error', this.xhr.status, this.xhr.statusText);
        this.loadError = true;
    } else {
        this.parseData(this.xhr.responseText);
    }
};

/**
 * Парсим полученные данные от сервера (инфорамция о страницах)
 * @param {object} data JSON объект полученнный от сервера
 */
Content.prototype.parseData = function (data) {

    data = JSON.parse(data);



    for (let i = 0; i < data.pages.length; i++) {
        this.pages.push(this.parsePage(data.pages[i]));
    }

    this.url = data.pages[0].link.url;


    this.render();
};

/**
 * Парсим информацию об отдельной странице
 * @param   {object}   page Объект нашего пристального внимания
 * @returns {object} возвращаем новый объект страницы, обработанный после JSON
 */
Content.prototype.parsePage = function (page) {

    let h1 = page.h1;
    let description = page.description;

    let link = new Link(page.link.url, page.link.name);

    let tasks = [];

    if (page.tasks !== undefined) {
        for (let i = 0; i < page.tasks.length; i++) {
            tasks.push(this.parsePage(page.tasks[i]));
        }
    }

    return new Page(h1, description, link, tasks);

};


/**
 * Очищаем страницу
 */
Content.prototype.remove = function () {

    this.content.textContent = "";
    this.mainMenu.textContent = "";
};

Content.prototype.render = function () {


    let url = window.location.hash;

    if (url === "") {
        url = "#";
    }

    let pageId = -1;
    let subPageId = -1;

    // 1 - ищем на какой странице мы находимся    
    for (let i = 0; i < this.pages.length; i++) {

        let temp_url = this.pages[i].link.url;
        if (url === temp_url) {
            pageId = i;
            break;
        }

        for (let j = 0; j < this.pages[i].subpages.length; j++) {
            if (url === this.pages[i].subpages[j].link.url) {
                pageId = i;
                subPageId = j;
                break;
            }
        }

        if (subPageId >= 0) {
            break;
        }

    }


    // Проверяем, изменилась ли страница
    if (pageId === this.pageId && subPageId === this.subPageId) {
        // ничего не изменилось, проверяем - это мы первый раз
        // отрисовываем?

        if (this.pageId !== -1) {
            // ничего не изменилось - выходим
            return;
        }

    }

    //this.remove();



    if (this.pageId === -1) {
        // зашли первый раз, нужно все отрисовать

        this.nav = document.createElement('div');
        this.nav.classList.add("content-nav");
        this.content.appendChild(this.nav);



        this.h1 = document.createElement('h1');
        this.content.appendChild(this.h1);


        this.subMenu = document.createElement('div');
        this.subMenu.classList.add("submenu");
        this.content.appendChild(this.subMenu);

        this.description = document.createElement("p");
        this.content.appendChild(this.description);

        this.task = document.createElement("div");
        let attr = document.createAttribute("id");
        attr.value = 'task';
        this.task.setAttributeNode(attr);
        this.content.appendChild(this.task);

        this.renderMenu();

    }

    // все уже отриовано, нужно только изменить содержимое
    this.pageId = pageId === -1 ? 0 : pageId;
    this.subPageId = subPageId;

    this.drawElement();

};

/**
 * Отрисовываем всю информацию
 */
Content.prototype.drawElement = function () {

    this.description.innerHTML = this.getDescription();
    this.h1.textContent = this.getH1();
    this.makeTask();
    this.nav.innerHTML = this.getNav();
    this.subMenu.innerHTML = this.getSubMenu();

}

/**
 * Метод выполнения непосредственно заданий
 */
Content.prototype.makeTask = function () {

    this.task.innerHTML = "";

    let a;

    if (this.subPageId !== -1) {
        switch (this.pageId) {

            case 1:
                switch (this.subPageId) {
                    case 1:
                        createMenu(this.task);
                        break;
                    case 2:
                        let hamburger = new Hamburger("task");
                        break;
                }
                break;
            case 2:
                switch (this.subPageId) {
                    case 0:
                    case 1:
                        createMenu(this.task);
                        break;
                    case 2:
                        let image = new ImageBox("task");
                        break;
                    case 3:
                        a = new AjaxHandler("task");
                        break;
                }

                break;
            case 3:

                a = new Lesson3("task", this.subPageId);
                break;

            case 4:
                a = new Lesson4("task", this.subPageId);
                break;


        }

    }
}

Content.prototype.getH1 = function () {

    if (this.subPageId === -1)
        return this.pages[this.pageId].h1;

    return this.pages[this.pageId].subpages[this.subPageId].h1;
}

Content.prototype.getSubMenu = function () {

    let content = "";

    if (this.pageId > 0) {
        for (let i = 0; i < this.pages[this.pageId].subpages.length; i++) {
            let active = i === this.subPageId ? " active" : "";

            content += `<a href="${this.pages[this.pageId].subpages[i].link.url}" title="${this.pages[this.pageId].subpages[i].h1}" class="submenu-item${active}">${this.pages[this.pageId].subpages[i].link.name}</a>`;
        }
    }

    return content;
}

Content.prototype.getDescription = function () {

    let description = [];

    if (this.subPageId === -1)
        description = this.pages[this.pageId].description;
    else
        description = this.pages[this.pageId].subpages[this.subPageId].description;

    if (description.length === 1) {
        description = description[0]
    } else if (description.length > 1) {
        let content = "";
        for (let i = 0; i < description.length; i++) {
            content += '<p>' + description[i] + '</p>';
        }

        description = content;
    } else {
        description = "";
    }

    return description;
}

Content.prototype.getNav = function () {


    let result = this.pages[0].link.getHtmlCode();

    if (this.pageId === 0)
        return result;

    if (this.subPageId === -1)
        return result + " » " + this.pages[this.pageId].link.getHtmlCode();



    return result + " » " + this.pages[this.pageId].link.getHtmlCode() + " » " + this.pages[this.pageId].subpages[this.subPageId].link.getHtmlCode()

}

/**
 * Методы отрисовки меню
 */
Content.prototype.renderMenu = function () {

    let menuItems = [];

    for (let i = 0; i < this.pages.length; i++) {
        menuItems.push(this.getMenuItem(this.pages[i]));
    }

    let menuObj = new Menu("", this.mainMenuClass, menuItems);

    this.mainMenu.innerHTML = menuObj.render();

};

/**
 * Получаем объект меню
 * @param   {string} id = ""           id меню
 * @param   {string} classCss = "menu" стиль css меню
 * @param   {array} pages = []        Информация о страницах
 * @returns {object} Возвращает сформированный объект меню
 */
Content.prototype.getMenu = function (id = "", classCss = "menu", pages = []) {

    let menuItem = [];

    for (let i = 0; i < pages.length; i++) {
        menuItem.push(this.getMenuItem(pages[i]));
    }

    return new Menu(id, classCss, menuItem)

};

/**
 * Формируем menu item
 * @param   {object}   page информация о страницах
 * @returns {object} возвращаем  объект menuitem
 */
Content.prototype.getMenuItem = function (page) {

    let menu = {};

    if (page.subpages.length > 0) {
        menu = this.getMenu("", this.mainMenuClass, page.subpages);
    }


    return new MenuItem(page.link.url, page.link.name, menu);

};

let content = {};

window.onload = function () {
    content = new Content();
}


window.onhashchange = function () {
    content.render();
}

/**
 * Объект обработчик Ajax запросов
 * @param {string} parentId Id объекта, где его будем отрисовывать
 */
function AjaxHandler(parentId) {

    this.errorPath = './json/answer/error.json';
    this.successPath = './json/answer/success.json';

    this.parent = document.getElementById(parentId);

    this.ajaxObg = new _Ajax();

    this.render();

    this.canvas;
}

AjaxHandler.prototype.render = function () {

    let div = document.createElement('div');
    div.classList.add("ajaxHandler");
    this.parent.appendChild(div);

    let button = document.createElement('input');
    let attr = document.createAttribute("type");
    attr.value = 'button';
    button.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = 'Получить ошибку';
    button.setAttributeNode(attr);
    div.appendChild(button);

    button.addEventListener('click', () => this.getError());


    button = document.createElement('input');
    attr = document.createAttribute("type");
    attr.value = 'button';
    button.setAttributeNode(attr);

    attr = document.createAttribute("value");
    attr.value = 'Получить, что все ок';
    button.setAttributeNode(attr);
    div.appendChild(button);

    button.addEventListener('click', () => this.getSuccess());

    this.canvas = document.createElement('div');
    this.canvas.classList.add("ajaxCanvas");
    div.appendChild(this.canvas);

};

/**
 * Отправляем запрос для получения ошибки
 */
AjaxHandler.prototype.getError = function () {

    this.ajaxObg.getAsync(this.errorPath, this);
};

/**
 * Отправляем запрос для получения успеного результата
 */
AjaxHandler.prototype.getSuccess = function () {

    this.ajaxObg.getAsync(this.successPath, this);
};

/**
 * Обрабатываем полученный ответ
 * @param {object} data присланные данные от сервера - обычно JSON объект
 */
AjaxHandler.prototype.process = function (data) {

    data = JSON.parse(data);

    if (data.result === "success")
        this.canvas.textContent = "Миссия выполнена успешно!"
    else {
        this.canvas.textContent = "Внимание - ошибка!"
    }
};
