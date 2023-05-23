// dropdowns
document.querySelectorAll('.dropdown-wrapper').forEach(function (dropdownWrapper) {

  const dropdownBtn = dropdownWrapper.querySelector('.dropdown__btn'),
        dropdown = dropdownWrapper.querySelector('.dropdown'),
        dropdownList = dropdownWrapper.querySelector('.dropdown__list'),
        dropdownListItem = dropdownList.querySelectorAll('.dropdown__item'),
        dropdownInput = dropdownWrapper.querySelector('.dropdown__input-hidden');

  /*
  по клику открывается и закрывается меню дропдауна
  */ 
  dropdownBtn.addEventListener('click', function () {
    dropdown.classList.toggle('dropdown--active');

    if (dropdownList.classList.contains('dropdown__list--active')) {
      dropdownList.classList.remove('dropdown__list--active');
      dropdownList.style.maxHeight = 0;
    } else {
      dropdownList.classList.add('dropdown__list--active');
      dropdownList.style.maxHeight = dropdownList.scrollHeight + 10 + 'px';
      /*
      при ширине экрана меньше 700px, в меню дропдауна, отвечающего за сортировку товаров,
      добавляется 25px нижнего отступа (нужно только для стилистического оформления)
      */
      if (document.documentElement.clientWidth < 700) {
        if (dropdownList.classList.contains('dropdown__sort-list')) {
          dropdownList.style.maxHeight = dropdownList.scrollHeight + 25 + 'px';
        };
      };
    };
  });

  /*
  функция, которая закрывает дропдаун
  */
  const removeClassActive = () => {
    dropdown.classList.remove('dropdown--active');
    dropdownList.classList.remove('dropdown__list--active');
    dropdownList.style.maxHeight = 0;
  }

  /* 
  при клике по элементу из меню дропдауна, значение этого элемента 
  отображается сверху в дропдауне. Также это значение передается в 
  input value, а сам дропдаун закрывается
  */
  dropdownListItem.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      removeClassActive();

      dropdownBtn.innerText = this.innerText;
      dropdownInput.value = this.dataset.value;
    });
  });

  /* 
  при клике где-угодно, кроме самого дропдауна, этот дропдаун закрывается
  */
  document.addEventListener('click', function (e) {
    if (e.target !== dropdownBtn) {
      removeClassActive();
    };
  });

  /* 
  при нажатии кнопок tab или escape, дропдаун закрывается
  */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      removeClassActive();
    };
  });

});


// filter
/*
сначала проверяем, есть ли на странице фильтр
*/
if (document.querySelector('.filter') !== null) {

  const filterDeclineBtn = document.querySelector('.filter__decline-btn');
  
  document.querySelectorAll('.filter__form-section').forEach(function (formSection) {
  
    const filterSectionTitle = formSection.querySelector('.filter__section-title'),
          checkboxWrapper = formSection.querySelector('.filter__checkbox-wrapper'),
          checkedProducts = formSection.querySelector('.filter__item-checked'),
          productsAmmount = formSection.querySelector('.filter__items-ammount'),
          products = formSection.querySelectorAll('.filter__checkbox-label'),
          checkbox = formSection.querySelectorAll('.filter__checkbox-hidden'),
          productsCount = formSection.querySelector('.filter__count');
  
    /* 
    в первое число из счетчика в фильтре записывается общее количество 
    доступных чекбоксов, а во второе число записывается количество
    отмеченных чекбоксов
    */
    productsAmmount.innerText = products.length;
    checkedProducts.innerText = formSection.querySelectorAll('input:checked').length;
  
    checkbox.forEach(function(checked) {
      /*
      при клике на чекбокс, к нему добавляется или 
      удаляется атрибут checked, а счетчик 
      отмеченных чекбоксов обновляется
      */
      checked.addEventListener('click', function () {
        checked.toggleAttribute('checked');
        checkedProducts.innerText = formSection.querySelectorAll('input:checked').length;
        /*
        если количество отмеченных чекбоксов больше 0,
        счетчик появляется, если меньше - исчезает
        */
        if (formSection.querySelectorAll('input:checked').length > 0) {
          productsCount.classList.add('filter__count--active');
        } else {
          productsCount.classList.remove('filter__count--active');
        };
      });
    });
  
    /*
    при клике на кнопку decline, счетчик отмеченных чекбоксов
    обнуляется и исчезает, а у всех чекбоксов удаляется
    атрибут checked 
    */
    filterDeclineBtn.addEventListener('click', () => {
      checkedProducts.innerText = 0;    
      productsCount.classList.remove('filter__count--active');
      checkbox.forEach((checked) => {
        checked.removeAttribute('checked');
      });
    });
  
    /*
    при клике на заголовок секции в фильтре, список чекбоксов
    под ним открывается
    */
    filterSectionTitle.addEventListener('click', () => {
      filterSectionTitle.classList.toggle('filter__section-title--active');
  
      if (checkboxWrapper.classList.contains('filter__checkbox-wrapper--active')) {
        checkboxWrapper.classList.remove('filter__checkbox-wrapper--active');
        checkboxWrapper.style.maxHeight = 0;
      } else {
        checkboxWrapper.classList.add('filter__checkbox-wrapper--active');
        checkboxWrapper.style.maxHeight = checkboxWrapper.scrollHeight + 'px';
      };
    });
  });
  
  // открытие и закрытие фильтра
  const filterOpenBtn = document.querySelectorAll('.filter-btn'),
        filterCloseBtn = document.querySelector('.filter__close-btn'),
        filterSubmitBtn = document.querySelector('.filter__submit-btn'),
        filterForm = document.querySelector('.filter');
  
  filterOpenBtn.forEach((openBtn) => {
    openBtn.addEventListener('click', () => {
      filterForm.classList.add('filter--active');
    });
  });
  
  filterCloseBtn.addEventListener('click', () => {
    filterForm.classList.remove('filter--active');
  });
  
  filterSubmitBtn.addEventListener('click', () => {
    filterForm.classList.remove('filter--active');
  });
  
  
  // слайдер цен в фильтре 
  const rangeSlider = document.querySelector('.range-slider__base'),
        lowNums = document.querySelector('.range-slider__nums--low'),
        highNums = document.querySelector('.range-slider__nums--high');
  
  noUiSlider.create(rangeSlider, {
    start: [0, 10000],
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 10000
    }
  });
  
  rangeSlider.noUiSlider.on('update', function (values, handle) {
  
    let value = values[handle];
  
    if (handle) {
      highNums.value = Math.round(value);
    } else {
      lowNums.value = Math.round(value);
    };
  });
  
  lowNums.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([this.value, null]);
  });
  
  highNums.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });
};


// шестеренка с настройками
document.querySelectorAll('.settings').forEach((settings) => {

  const settingsBtn = settings.querySelector('.settings-btn'),
        settingsList = settings.querySelector('.settings__list');

  settings.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  /*
  фукция, которая закрывает меню настроек
  */
  const removeSettings = () => {
    settingsList.classList.remove('settings__list--active');
    settingsBtn.classList.remove('settings-btn--active')
    settingsList.style.maxHeight = 0;
  };
  /*
  по клику на шестеренку открывается меню настроек
  */
  settingsBtn.addEventListener('click', () => {
    settingsBtn.classList.add('settings-btn--active')
    if(settingsList.classList.contains('settings__list--active')) {
      removeSettings();
    } else {
      settingsList.classList.add('settings__list--active');
      settingsList.style.maxHeight = settingsList.scrollHeight + 20 + 'px';
    };
  });
  /*
  при клике где-угодно, кроме меню настроек, оно закрывается
  */
  document.addEventListener('click', (e) => {
    if (e.target !== settings) {
      removeSettings();
    };
  });
  /* 
  при нажатии кнопки tab или escape, меню настроек закрывается
  */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      removeSettings();
    };
  });
});


// item
const item = document.querySelectorAll('.item'),
      modalOverlay = document.querySelector('.modal-overlay');

item.forEach((oneItem) => {

  const overlay = oneItem.querySelector('.item__overlay'),
        icons = oneItem.querySelector('.item__icons'),
        openModalBtn = oneItem.querySelector('.item__details'),
        modalItem = oneItem.querySelector('.modal-item'),
        favouriteBtn = oneItem.querySelector('.item__star'),
        floatSlider = modalItem.querySelector('.float-scale__base'),
        floatValue = modalItem.querySelector('.float-value');

  /*
  разноцветная полоска в модальном окне
  */
  noUiSlider.create(floatSlider, {
    /*
    ползунок над полоской показывает то число,
    которое записано в float-value
    */
    start: floatValue.innerText,
    step: 0.00000001,
    range: {
      'min': 0,
      'max': 1
    }
  });

  /*
  если у айтема есть клас item--icons,
  на нем отображаются две иконки
  */
  if (oneItem.classList.contains('item--icons')) {
    icons.style.display = 'block'; 
  };
  /*
  при клике на звезду на айтеме, она меняет свой цвет
  */
  favouriteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    favouriteBtn.classList.toggle('item__star--chosen');
  });
  /*
  при клике на оверлей айтема, у айтема появляется
  или удаляется фиолетовый бордер
  */
  overlay.addEventListener('click', () => {
    oneItem.classList.toggle('item--chosen');
    
    if (oneItem.classList.contains('item--chosen')) {
      overlay.classList.add('item__overlay-chosen');
    } else {
      overlay.classList.remove('item__overlay-chosen');
    };
  });
  /*
  при клике на item__details открывается модальное окно
  */
  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();

    modalItem.classList.add('modal-item--active');
    modalOverlay.classList.add('modal-overlay--active');
  });
  /*
  при клике на оверлей, модальное окно закрывается
  */
  modalOverlay.addEventListener('click', () => {
    modalItem.classList.remove('modal-item--active');
    modalOverlay.classList.remove('modal-overlay--active');
  });
});

// слайдер в модальном окне 
const modalSwiper = new Swiper('.modal-item__slider', {
  grabCursor: true,
  slidesPerView: 4.5,
  spaceBetween: 3,
});

// закрытие модального окна
const closeModalBtn = document.querySelectorAll('.modal-item__close'),
      modalItem = document.querySelectorAll('.modal-item');

closeModalBtn.forEach((closeBtn) => {
  /*
  при клике на крестик, модальное окно закрывается
  */
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-overlay--active');
    modalItem.forEach((modal) => {
      modal.classList.remove('modal-item--active');
    });
  });
});

// открытие и закрытие главного меню
const menuOpenBtn = document.querySelector('.menu__open-btn'),
      menuCloseBtn = document.querySelector('.menu__close-btn'),
      menuListWrapper = document.querySelector('.menu__list-wrapper');

menuOpenBtn.addEventListener('click', () => {
  menuListWrapper.classList.add('menu__list-wrapper--active');
});

menuCloseBtn.addEventListener('click', () => {
  menuListWrapper.classList.remove('menu__list-wrapper--active');
});

/* 
разворачивание и сворачивание формы поиска.
Это происходит только при ширине экрана меньше 1100px 
*/
document.querySelectorAll('.search').forEach((search) => {

  const showFormBtn = search.querySelector('.search__show-btn'),
        searchForm = search.querySelector('.search__form');
  /*
  по клику на иконку лупы, открывается форма поиска
  */
  showFormBtn.addEventListener('click', () => {
    searchForm.classList.toggle('search__form--active');
  });
  
  search.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  /*
  при клике где-угодно, кроме формы поиска, она сворачивается
  */
  document.addEventListener('click', function (e) {
    if (e.target !== search) {
      searchForm.classList.remove('search__form--active');
    };
  });
  /*
  при нажатии кнопок tab или escape, форма поиска сворачивается
  */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      searchForm.classList.remove('search__form--active');
    };
  });
});

/*
слайдер в deal__buy-items на странице deal
*/
const dealSwiper = new Swiper('.deal__items-slider', {
  grabCursor: true,
  slidesPerView: 5.5,
});

/* 
  табы на странице deal (работает начиная с ширины 1000px)
*/
const tabsButtons = document.querySelectorAll('.deal__items-header'),
      tabsContent = document.querySelectorAll('.deal__side');

tabsButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    for (let i = 0; i < tabsButtons.length; i++) {
      tabsButtons[i].classList.remove('deal__items-header--active');
    };
    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].classList.remove('deal__side--active');
      if (tabsContent[i].dataset.tab === btn.dataset.btn) {
        tabsContent[i].classList.add('deal__side--active');
      };
    };
    btn.classList.add('deal__items-header--active');
  });
});



const dealHeader = document.querySelector('.deal__header');

document.querySelectorAll('.deal__side-header').forEach((header) => {
  header.style.top = dealHeader.clientHeight - 1 + 'px';  
  
  window.addEventListener('resize', () => {
    header.style.top = dealHeader.clientHeight - 1 + 'px';
    console.log(dealHeader.clientHeight);
  });
});


const headerCategory = document.querySelector('.header__category'),
      headerLogo = document.querySelector('.header__logo');
    
if (headerCategory.classList.contains('header__category--off')) {
  headerLogo.style.marginLeft = 'auto';
};


/*
смена имейла на странице account
*/
const emailValue = document.querySelector('.account__email-value'),
      emailChangeBtn = document.querySelector('.account__email-change'),
      emailForm = document.querySelector('.account__email-form'),
      emailInput = document.querySelector('.account__email-input'),
      emailSubmitBtn = document.querySelector('.account__email-submit');

emailInput.value = emailValue.innerText;

emailChangeBtn.addEventListener('click', () => {
  emailValue.classList.add('account__email-value--off');
  emailChangeBtn.classList.add('account__email-change--off');

  emailForm.classList.add('account__email-form--active');
});

emailSubmitBtn.addEventListener('click', () => {
  emailValue.innerText = emailInput.value;

  emailValue.classList.remove('account__email-value--off');
  emailChangeBtn.classList.remove('account__email-change--off');

  emailForm.classList.remove('account__email-form--active');
});