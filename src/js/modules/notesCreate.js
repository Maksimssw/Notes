import modalNote from "./modalNote";

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
        modalNote();
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

export default notesCreate;