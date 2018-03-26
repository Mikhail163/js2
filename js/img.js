"use strict";

/**
 * @property {Object} settings Настройки галереи.
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedPreloadImageClass: 'galleryPreload__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageLeftBtnClass: 'galleryWrapper__left',
        openedImageLeftBtnSrc: 'images/gallery/left.png',
        openedImageRightBtnClass: 'galleryWrapper__right',
        openedImageRightBtnSrc: 'images/gallery/right.png',
        loadedImageSrc: 'images/gallery/loading.gif',
        openedDefaultImageSrc: 'images/gallery/default.jpg',
    },

    /**
     * Перечень всех доступных картинок
     * @param {integer} index индекс текущей картинки
     * @param {array} array масcив ссылок на все картинки                     
     */
    images: {
        index: 0,
        array: [],
    },

    /**
     * Инициализируем галерею.
     * @param {Object} settings Объект с настройками.
     */
    init(settings) {
        this.settings = Object.assign(this.settings, settings);

        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event))
    },

    /**
     * Обработчик события клика для открытия картинки.
     * @param {MouseEvent} event Событие клика мышью.
     * @param {string} event.target.dataset.full_image_url Событие клика мышью.
     */
    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') {
            return;
        }

        this.openImage(event.target.dataset.full_image_url);
    },

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     *               
     * @param {HTMLObject} preload - помещаем большую картинку в этот объект,
     *                             чтобы проверить - загрузится ли она
     */
    openImage(src) {

        // Изначально в картинку ставим значок загрузки
        this.getScreenContainer(src)
            .querySelector(`.${this.settings.openedImageClass}`).src = this.settings.loadedImageSrc;

        // Готовим основную картинку
        let preload =
            this.getScreenContainer()
            .querySelector(`.${this.settings.openedPreloadImageClass}`);


        // Картинка загрузилась 
        preload.onload = () => this.imgLoad(src);
        // Ошибка при загрузке страницы
        preload.onerror = () => this.imgError();

        preload.src = src;
    },

    /**
     * Картинка загрузилась, все отлично - показываем её
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    imgLoad(src) {

        this.getScreenContainer()
            .querySelector(`.${this.settings.openedImageClass}`)
            .src = src;
    },


    /**
     * Если картинка не загрузилась, то ставим картинку заглушку
     */
    imgError() {

        this.getScreenContainer()
            .querySelector(`.${this.settings.openedImageClass}`)
            .src = this.settings.openedDefaultImageSrc;
    },

    /**
     * Возвращает контейнер для открытой картинки.
     * @param {string} src ссылка на картинку, которую нужно отобразить
     * @returns {Element}
     */
    getScreenContainer(src = null) {
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        return this.createScreenContainer(src);
    },

    /**
     * Создает контейнер для открытой картинки.
     * @param {string} src ссылка на картинку, которую нужно отобразить
     * @returns {Element}
     */
    createScreenContainer(src = null) {

        this.createImageArray(src);

        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const leftImageElement = new Image();
        leftImageElement.classList.add(this.settings.openedImageLeftBtnClass);
        leftImageElement.src = this.settings.openedImageLeftBtnSrc;
        leftImageElement.addEventListener('click', () => this.left());
        galleryWrapperElement.appendChild(leftImageElement);

        const rightImageElement = new Image();
        rightImageElement.classList.add(this.settings.openedImageRightBtnClass);
        rightImageElement.src = this.settings.openedImageRightBtnSrc;
        rightImageElement.addEventListener('click', () => this.right());
        galleryWrapperElement.appendChild(rightImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        const preload = new Image();
        preload.classList.add(this.settings.openedPreloadImageClass);
        galleryWrapperElement.appendChild(preload);

        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    /**
     * создаем массив картинок
     * @param {string} src ссылка на картинку, которую нужно отобразить
     */
    createImageArray(src = null) {

        this.images.index = 0;
        this.images.array = [];

        const images = document.querySelectorAll(`[data-full_image_url]`);

        let find = false; // небольшая оптимизация, чтоб лишний раз
        // строки не сравнивать
        for (let i = 0; i < images.length; i++) {

            if (!find)
                if (images[i].dataset.full_image_url === src) {
                    this.images.index = i;
                    find = true;
                }

            this.images.array.push(images[i].dataset.full_image_url);
        }
    },

    /**
     * Удадяем созданные элементы галерии
     * и массив картинок
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
        this.images.index = 0;
        this.images.array = [];
    },

    /**
     * Перелистываем фотографии влево
     */
    left() {
        this.openImage(this.getImgUrl(--this.images.index));
    },

    /**
     * Перелистываем фотографии вправо
     */
    right() {
        this.openImage(this.getImgUrl(++this.images.index));
    },

    /**
     * Возвращаем url картинки, который нужно показать,
     * метод используется когда нажали left, right
     * @param   {integer} index номер картинки, которую нужно показать
     * @returns {string}  url картинки
     */
    getImgUrl(index) {


        if (index < 0) {
            index = this.images.array.length - 1;
        } else if (index >= this.images.array.length) {
            index = 0;
        }

        this.images.index = index;

        return this.images.array[index];
    }
};

/*
window.onload = () => gallery.init({
    previewSelector: '.galleryPreviewsContainer'
});
*/

function _Ajax() {
    this.xhr = new XMLHttpRequest();
}

_Ajax.prototype.getAsync = function (url, callBack) {

    // загружаем файл с метаинформацией с помощью ajax
    this.xhr.open('GET', url);

    this.xhr.onreadystatechange = () => this.getResponse(callBack);

    this.xhr.send();

};

_Ajax.prototype.getResponse = function (obj) {

    if (this.xhr.readyState !== 4) {
        return;
    }

    if (this.xhr.status !== 200 && this.xhr.status !== 0) {
        console.log('Error', this.xhr.status, this.xhr.statusText);
    } else {
        obj.process(this.xhr.responseText);
    }
};


function ImageBox(parentId) {

    this.images = [];
    this.ajaxObj = new _Ajax();


    this.parent = document.getElementById(parentId);

    this.ajaxObj.getAsync('./json/img.json', this);
}

ImageBox.prototype.process = function (data) {

    data = JSON.parse(data);



    for (let i = 0; i < data.images.length; i++) {
        this.images.push(this.parceImage(data.images[i]));
    }


    this.render();
};

ImageBox.prototype.parceImage = function (image) {
    return new ImageIB(image.big, image.little, image.alt)
};

ImageBox.prototype.render = function () {

    let div = document.createElement('div');
    div.classList.add("galleryPreviewsContainer");
    this.parent.appendChild(div);


    for (let i = 0; i < this.images.length; i++) {
        let img = document.createElement('img');

        let attr = document.createAttribute("src");
        attr.value = this.images[i].little;
        img.setAttributeNode(attr);

        attr = document.createAttribute("data-full_image_url");
        attr.value = this.images[i].big;
        img.setAttributeNode(attr);

        attr = document.createAttribute("alt");
        attr.value = this.images[i].alt;
        img.setAttributeNode(attr);

        div.appendChild(img);
    }

    gallery.init({
        previewSelector: '.galleryPreviewsContainer'
    })

};

function ImageIB(big, little, alt) {
    this.big = big;
    this.little = little;
    this.alt = alt;
}