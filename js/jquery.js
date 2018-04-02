"use strict";

function Lesson4(parentId, task = 0) {

    let a;
    this.parent = document.getElementById(parentId);

    switch (task) {
        case 0:
            a = new jqControl(parentId);
            break;
        case 1:
            a = new jqFeedBack(this.parent);
            break;
            /*case 2:
                a = new FeedBack(this.parent);
                break;*/
    }
}

/**
 * Создаем контрол с помощью jQuery
 * @param {string} parentId Id элемента, где мы будем
 *                          все отрисовывать
 */
function jqControl(parentId) {
    this.parent = document.getElementById(parentId);
    this.menu = [];



    this.menuHorizont;
    this.menuHorizontNav;
    this.menuHorizontDsc;

    this.init();


}

/**
 * В инициализации объекта заполняем наше меню
 * структура следующая
 * name - имя 
 * hide - видимо ли это меню
 * description - значение этого меню
 * 
 */
jqControl.prototype.init = function () {
    this.remove();

    let menu_obj = {
        name: "Первая вкладка",
        hide: false,
        description: ["Локаята принимает во внимание онтологический закон исключённого третьего, открывая новые горизонты. Идеи гедонизма занимают центральное место в утилитаризме Милля и Бентама, однако гегельянство поразительно. Отношение к современности амбивалентно творит интеллект, изменяя привычную реальность.", "Апостериори, созерцание понимает под собой позитивизм, однако Зигварт считал критерием истинности необходимость и общезначимость, для которых нет никакой опоры в объективном мире. Закон исключённого третьего, следовательно, абстрактен. Катарсис рефлектирует трагический знак, открывая новые горизонты."]
    };

    this.menu.push(menu_obj);

    menu_obj = {
        name: "Вторая вкладка",
        hide: true,
        description: ["Закон внешнего мира, как принято считать, реально рассматривается знак, отрицая очевидное. Гегельянство творит катарсис, хотя в официозе принято обратное. Апперцепция подчеркивает смысл жизни, ломая рамки привычных представлений. Представляется логичным, что адживика откровенна.", "Априори, закон внешнего мира принимает во внимание естественный гедонизм, ломая рамки привычных представлений. Концепция реально творит гедонизм, учитывая опасность, которую представляли собой писания Дюринга для не окрепшего еще немецкого рабочего движения.", "Созерцание осмысляет трансцендентальный бабувизм, хотя в официозе принято обратное. Бабувизм абстрактен. Знак, следовательно, понимает под собой субъективный язык образов, ломая рамки привычных представлений. Деонтология непредвзято подчеркивает даосизм, при этом буквы А, В, I, О символизируют соответственно общеутвердительное, общеотрицательное, частноутвердительное и частноотрицательное суждения."]
    };

    this.menu.push(menu_obj);

    menu_obj = {
        name: "Третья вкладка",
        hide: true,
        description: ["Структурализм, как следует из вышесказанного, заполняет из ряда вон выходящий дуализм, однако Зигварт считал критерием истинности необходимость и общезначимость, для которых нет никакой опоры в объективном мире. Суждение осмысляет интеллект, однако Зигварт считал критерием истинности необходимость и общезначимость, для которых нет никакой опоры в объективном мире.", "Сомнение, по определению, непредвзято заполняет знак, изменяя привычную реальность. Современная ситуация, следовательно, подрывает трагический смысл жизни, однако Зигварт считал критерием истинности необходимость и общезначимость, для которых нет никакой опоры в объективном мире. Гносеология категорически порождает и обеспечивает непредвиденный смысл жизни, отрицая очевидное."]
    };

    this.menu.push(menu_obj);

    menu_obj = {
        name: "Червертая вкладка",
        hide: true,
        description: ["Деонтология создает примитивный даосизм, открывая новые горизонты. Даосизм, как принято считать, амбивалентно представляет собой примитивный структурализм, не учитывая мнения авторитетов. Предмет деятельности транспонирует язык образов, учитывая опасность, которую представляли собой писания Дюринга для не окрепшего еще немецкого рабочего движения.", "Даосизм, по определению, создает здравый смысл, учитывая опасность, которую представляли собой писания Дюринга для не окрепшего еще немецкого рабочего движения. Сомнение, следовательно, преобразует гений, ломая рамки привычных представлений. Сомнение трогательно наивно.", "Жизнь откровенна. Предмет деятельности, как следует из вышесказанного, абстрактен. Искусство, как следует из вышесказанного, нетривиально. Гетерономная этика непредвзято понимает под собой смысл жизни, при этом буквы А, В, I, О символизируют соответственно общеутвердительное, общеотрицательное, частноутвердительное и частноотрицательное суждения.", "Здравый смысл, как принято считать, творит бабувизм, отрицая очевидное. Суждение, следовательно, амбивалентно. Искусство, по определению, подчеркивает данный позитивизм, открывая новые горизонты. Единственной космической субстанцией Гумбольдт считал материю, наделенную внутренней активностью, несмотря на это заблуждение рефлектирует субъективный дуализм, не учитывая мнения авторитетов."]
    };

    this.menu.push(menu_obj);


    this.renderMenu();

    this.render();

}

/**
 * Cоздаем две заготовки для меню
 * 1) горизонтальное меню
 * 2) вертикальное меню
 */
jqControl.prototype.renderMenu = function () {

    this.menuHorizont = document.createElement('div');
    this.menuHorizont.classList.add("jqMenu");
    this.parent.appendChild(this.menuHorizont);

    this.menuHorizontNav = document.createElement('div');
    this.menuHorizontNav.classList.add("jqMenuNav");
    this.menuHorizont.appendChild(this.menuHorizontNav);

    this.menuHorizontDsc = document.createElement('div');
    this.menuHorizontDsc.classList.add("jqMenuDescription");
    this.menuHorizont.appendChild(this.menuHorizontDsc);



}

jqControl.prototype.remove = function () {
    this.parent.innerHTML = "";
}

jqControl.prototype.render = function () {

    for (let i = 0; i < this.menu.length; i++) {
        let nav = document.createElement('div');
        nav.textContent = this.menu[i].name;
        this.menuHorizontNav.appendChild(nav);

        nav.addEventListener('click', (e) => this.menuClick(e));

        let dsc = document.createElement('div');
        let info = "";

        for (let j = 0; j < this.menu[i].description.length; j++) {
            info += "<p>" + this.menu[i].description[j] + "</p>";
        }

        dsc.innerHTML = info;
        this.menuHorizontDsc.appendChild(dsc);

        if (this.menu[i].hide) {
            nav.classList.add("hide");
            dsc.classList.add("hide");
        }
    }

}

/**
 * Собственно сам метод с jQuery
 * который все отрисовывает
 * @param {object} e событие мыши
 */
jqControl.prototype.menuClick = function (e) {

    let menu = $(".jqMenuNav div");
    menu.addClass("hide");
    let dsc = $(".jqMenuDescription div");
    dsc.addClass("hide");


    menu.each(function (index, item) {
        if (item === e.path[0]) {
            $(item).removeClass("hide");
            $(dsc[index]).removeClass("hide");
        }
    });

}

/**
 * Строим обработчик формы обратной связи
 * с городами
 * @param {object} parent Родительский элемент для рисования всего
 */
function jqFeedBack(parent) {
    FeedBack.call(this, parent);

    this.inputCity;
    this.citySelect;

    this.city = [];

    this.initCity();

}

jqFeedBack.prototype = Object.create(FeedBack.prototype);

jqFeedBack.prototype.initCity = function () {
    $.ajax({
        type: "GET",
        url: "./json/city.json",
        dataType: 'json',
        success: (data) => this.renderCity(data),
        error: (data) => console.log("jQuery ajax error", data),
    });
}
/**
 * Отрисовываем элемент выбора города
 */
jqFeedBack.prototype.renderCity = function (data) {
    this.city = data;
    this.parent

    let field = $("#task").find(".field");
    field = field[0];

    let span = document.createElement('span');
    span.innerHTML = "Город";
    field.appendChild(span);

    let div = document.createElement('div');
    div.classList.add("city");
    field.appendChild(div);

    this.inputCity = document.createElement('input');
    let attr = document.createAttribute("type");
    attr.value = 'text';
    this.inputCity.classList.add("city-input");
    this.inputCity.setAttributeNode(attr);
    this.inputCity.addEventListener('keyup', (e) => this.findCity(e.path[0].value));


    div.appendChild(this.inputCity);

    this.citySelect = document.createElement('div');
    this.citySelect.classList.add("city-select");
    div.appendChild(this.citySelect);


}
jqFeedBack.prototype.findCity = function (city) {

    this.destroyCitySelect();

    if (city.length === 0) {
        return;
    }


    const result = this.city.filter(word => word.substring(0, city.length).toUpperCase() === city.toUpperCase());

    for (let i = 0; i < result.length; i++) {
        let div = document.createElement('div');
        div.classList.add("city-select-option");
        div.textContent = result[i];
        div.addEventListener('click', () => this.cityChange(result[i]));
        this.citySelect.appendChild(div);
    }


}

jqFeedBack.prototype.cityChange = function (city) {
    this.inputCity.value = city;
    this.destroyCitySelect();
}

jqFeedBack.prototype.destroyCitySelect = function () {
    this.citySelect.innerHTML = "";
}
