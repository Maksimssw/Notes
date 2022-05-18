/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/modalNote.js":
/*!*************************************!*\
  !*** ./src/js/modules/modalNote.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modalNote(){
    const note = document.querySelector('.model-note'),
          noteClose = note.querySelector('.model-note__close'),
          noteHeading = note.querySelector('.model-note__title'),
          noteText = note.querySelector('.model-note__text'),
          patternOpen = document.querySelectorAll('.open');

    // При вызове скрытие окна
    function closeModal(){
        note.style.display = 'none';
        document.body.style.overflow = '';
    }

    // При вызове открытие окна
    function openModal(){
        note.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // При нажатий на кнопку скрывается окно
    noteClose.addEventListener('click', closeModal);

    // При нажатий на кнопку открытие окна
    patternOpen.forEach(item => {
        item.addEventListener('click', function(e) {

            // Получение заголовка и текста
            const pattern = e.target.closest('[data-pattern]'),
                  patternHeading = pattern.querySelector('.notes__pattern__title').innerText;
            
            const patternText = pattern.querySelector('.notes__pattern__text').innerText;

            // Отправка заголовка и текста
            noteHeading.innerText = patternHeading;
            noteText.innerText = patternText;

            openModal();
        });
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalNote);

/***/ }),

/***/ "./src/js/modules/notesCreate.js":
/*!***************************************!*\
  !*** ./src/js/modules/notesCreate.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalNote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalNote */ "./src/js/modules/modalNote.js");


function notesCreate(){
    const buttonClose = document.querySelector('.model-create__close'),
            modelCreate = document.querySelector('.model-create'),
            notesCircle = document.querySelector('.notes__create__circle'),
            notesWrapper = document.querySelector('.notes__wrapper');    

    // При вызове закрыть или открыть окно создания Заметки
    function сommutatusModel(){
        modelCreate.classList.toggle('active');

        if(modelCreate.classList.contains('active')){
            document.body.style.overflow = 'hidden';
        } else{
            document.body.style.overflow = '';
        }
    }

    // При нажатий открытие окна
    notesCircle.addEventListener('click', сommutatusModel);

    // При нажатий закрытие окна
    buttonClose.addEventListener('click', сommutatusModel);

    // Получение данных с LocalStorage
    for(let i = 0; i <= 100; i++){
        const pattern = localStorage.getItem(`pattern${i}`);
        if(!pattern){} else{
            setPattern(pattern, i);
        }
    }

    function setPattern(pattern, i){
        const div = document.createElement('div');
        div.classList.add('notes__pattern');
        div.innerHTML = `${pattern}`;
        div.setAttribute('data-pattern', i);
        notesWrapper.appendChild(div);
        createAttribute();
        putternOn();
    }


    // Создание Заметки
    function newNote(data){
        const wrapper = data.map(({heading, description}, i) => {
            
            const div = document.createElement('div');
            div.classList.add('notes__pattern');

            div.innerHTML = `
            <h2 class="notes__pattern__title">${heading}</h2>
                <p class="notes__pattern__text">${description}</p>
            <div class="notes__pattern__settings">
                <img src="icon/delete.svg" class="delete-icon" alt="delete">
                <img src="icon/open_document_icon_124226.svg" class="open" alt="pen">
            </div>
            `;

            notesWrapper.appendChild(div);
        });
        createAttribute();
        putternOn();
        (0,_modalNote__WEBPACK_IMPORTED_MODULE_0__["default"])();
    }

    const modelForm = document.querySelector('.model-create__wrapper form'),
          modelHeding = document.querySelector('.model-create__input'),
          modelDescription = document.querySelector('form textarea'),
          errorHeading = document.querySelector('#errorHeading'),
          errorDecription = document.querySelector('#errorDecription'),
          spinner = document.querySelector('.loader');


    modelForm.addEventListener('submit', function(e){
        e.preventDefault();

        const heading = modelHeding.value,
              description = modelDescription.value;

        if(heading === '' || heading.length > 15){
            errorHeading.style.display = 'block';
        } else {
            errorHeading.style.display = 'none';
        }

        
        if(description === ''){
            errorDecription.style.display = 'block';
        } else {
            errorDecription.style.display = 'none';
        }

        if(description.length >= 1 && heading.length >= 1 && heading.length <= 15){
           
            spinner.style.display = 'block';
            
            const res = [
               {
                heading: heading,
                description: description
               }
            ]

            
            newNote(res);
            spinner.style.display = 'none';
            modelForm.reset();
            сommutatusModel();
        }
        
    });

    // Cоздание атрибута для блока и корзины
    function createAttribute(){
        const pattern = document.querySelectorAll('.notes__pattern'),
              basket = document.querySelectorAll('.delete-icon');
           
        for(let i = 0; i < pattern.length;i++){
            try{
                if(pattern[i].getAttribute('data-pattern')){} else{
                    pattern[i].setAttribute('data-pattern', i);
                    basket[i].setAttribute('data-basket', i);
                    setLocal(pattern, i);
                }
            }catch{}
        }
    }

    // Создать запись в локальном хранилище
    function setLocal(pattern, i){
        const res = pattern[i].innerHTML;
        localStorage.setItem(`pattern${i}`, res);
        localStorage.setItem(`number`, i);
    }


    // Удалить запись с локального хранилища
    function removeLocal(i){
        localStorage.removeItem(`pattern${i}`);
    }

    // При нажатий на корзину удаляется блок
    function putternOn(){
        const basket = document.querySelectorAll('[data-basket]');
        
        basket.forEach(item => {
            item.addEventListener('click', function(e){
               const attribut = e.target.closest('[data-pattern]'),
                     number = attribut.getAttribute('data-pattern');

                attribut.remove();
                removeLocal(number);
            });
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notesCreate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_notesCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/notesCreate */ "./src/js/modules/notesCreate.js");
/* harmony import */ var _modules_modalNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modalNote */ "./src/js/modules/modalNote.js");



window.addEventListener('DOMContentLoaded', function(){
    (0,_modules_notesCreate__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modalNote__WEBPACK_IMPORTED_MODULE_1__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map