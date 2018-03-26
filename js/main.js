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

function Page(h1 = "", description = "", link = new Link(), subpages = []) {
    this.h1 = h1;
    this.link = link;
    this.description = description;
    this.subpages = subpages;

}

Link.prototype.init = function (link = "") {

    // проверяем ссылку на корректность
    if (link.length != 0) {}
    //
};


function Content(url, contentId = "content", menuId = "main_menu") {
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
    this.description;
    this.task;

    this.xhr = new XMLHttpRequest();


    // загружаем файл с метаинформацией с помощью ajax
    this.xhr.open('GET', './json/main.json');

    this.xhr.onreadystatechange = () => this.getAjax();

    this.xhr.send();

}

Content.prototype.getAjax = function () {
    console.log(this.xhr.readyState);

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

Content.prototype.parseData = function (data) {

    data = JSON.parse(data);



    for (let i = 0; i < data.pages.length; i++) {
        this.pages.push(this.parsePage(data.pages[i]));
    }

    this.h1 = data.pages[0].h1;
    this.url = data.pages[0].link.url;


    this.render();
};

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

Content.prototype.getLessonInfo = function (lesson) {

    console.log(lesson);

}


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
        this.pageId = 0;
    } else {
        // все уже отриовано, нужно только изменить содержимое
        this.pageId = pageId;
        this.subPageId = subPageId;

        this.h1.textContent = this.getH1();
        this.description.textContent = this.getDescription();
        this.nav.innerHTML = this.getNav();


        return;
    }


    this.nav = document.createElement('div');

    this.nav.innerHTML = this.getNav();

    this.nav.classList.add("content-nav");
    this.content.appendChild(this.nav);


    this.h1 = document.createElement('h1');
    this.h1.textContent = this.getH1();
    this.content.appendChild(this.h1);


    this.description = document.createElement("p");
    this.description.textContent = this.getDescription();
    this.content.appendChild(this.description);

    this.task = document.createElement("div");
    this.content.appendChild(this.task);



    this.renderMenu();

};

Content.prototype.getH1 = function () {

    if (this.subPageId === -1)
        return this.pages[this.pageId].h1;

    return this.pages[this.pageId].subpages[this.subPageId].h1;
}

Content.prototype.getDescription = function () {

    if (this.subPageId === -1)
        return this.pages[this.pageId].description;

    return this.pages[this.pageId].subpages[this.subPageId].description;
}

Content.prototype.getNav = function () {


    let result = this.pages[0].link.getHtmlCode();

    if (this.pageId === 0)
        return result;

    if (this.subPageId === -1)
        return result + " » " + this.pages[this.pageId].link.getHtmlCode();



    return result + " » " + this.pages[this.pageId].link.getHtmlCode() + " » " + this.pages[this.pageId].subpages[this.subPageId].link.getHtmlCode()

}

Content.prototype.renderMenu = function () {

    let menuItems = [];

    for (let i = 0; i < this.pages.length; i++) {
        menuItems.push(this.getMenuItem(this.pages[i]));
    }

    let menuObj = new Menu("", this.mainMenuClass, menuItems);

    this.mainMenu.innerHTML = menuObj.render();

};

Content.prototype.getMenu = function (id = "", classCss = "menu", pages = []) {

    let menuItem = [];

    for (let i = 0; i < pages.length; i++) {
        menuItem.push(this.getMenuItem(pages[i]));
    }

    return new Menu(id, classCss, menuItem)

};

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
