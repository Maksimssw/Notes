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

export default modalNote;