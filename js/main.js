// variables
const gameItems = document.querySelectorAll('.item');
const filter = document.querySelector('.filter');
const rangeSlider = filter?.querySelector('.range-slider__base');
const rangeSliderLowNums = filter?.querySelector('.range-slider__nums--low');
const rangeSliderHighNums = filter?.querySelector('.range-slider__nums--high');
const openFilterButton = document.querySelector('.filter-btn');
const menu = document.querySelector('.menu');
const menuOpenBtn = menu?.querySelector('.menu__open-btn');
const menuCloseBtn = menu?.querySelector('.menu__close-btn');
const menuListWrapper = menu.querySelector('.menu__list-wrapper');
const languageDropdown = document.getElementById('language_dropdown');
const currencyDropdown = document.getElementById('currency_dropdown');
const menuLangDropdown = document.getElementById('menu_language_dropdown');
const menuCurrencyDropdown = document.getElementById('menu_currency_dropdown');
const sortDropdown = document.getElementById('sort_dropdown');
const storeSort = document.getElementById('sort_dropdown_store');
const inventorySort = document.getElementById('sort_dropdown_inventory');
const search = document.querySelectorAll('.search');
const searchForms = document.querySelectorAll('.search__form');
const dealItemsSlider = document.querySelector('.deal__items-slider');
const settings = document.querySelectorAll('.settings');
const accountItemsList = document.querySelectorAll('.account__items-list');
const emailForm = document.querySelector('.user__email-form');
const emailFormInput = emailForm?.querySelector('.user__email-input');
const emailFormLabel = emailForm?.querySelector('.user__email-label');
const emailFormButton = emailForm?.querySelector('.user__email-button');
const emailFormHiddenText = emailForm?.querySelector('.user__email-text');
const tabsButtons = document.querySelectorAll('.deal__items-header');
const tabsContent = document.querySelectorAll('.deal__side');
const statisticTableWrapper = document.querySelector('.statistic__table-wrapper');
const statisticTable = statisticTableWrapper?.querySelector('.statistic__table');


// function calls and events
if (gameItems.length > 0) {
  gameItems.forEach(item =>  {
    item.addEventListener('click', event => {
      addItem(event, item);
      choseItem(event, item);
      deleteButton(event, item)
    });
  });
}

filter?.addEventListener('click', event => {
  toggleFilterSection(event);
  countCheckedFilterItems(event);
  declineFilterForm(event);
  closeMobileFilter(event);
});

openFilterButton?.addEventListener('click', openMobileFilter);

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [0, 10000],
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 10000
    },
    margin: 1
  });
    
  rangeSlider.noUiSlider.on('update', function (values, handle) {
  
    let value = values[handle];
  
    if (handle) {
      rangeSliderHighNums.value = Math.round(value);
    } else {
      rangeSliderLowNums.value = Math.round(value);
    };
  });
  
  rangeSliderLowNums.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([this.value, null]);
  });
  
  rangeSliderHighNums.addEventListener('change', function () {
    rangeSlider.noUiSlider.set([null, this.value]);
  });
}

menuOpenBtn?.addEventListener('click', openMainMenu);
menuCloseBtn?.addEventListener('click', closeMainMenu);

if (languageDropdown) {
  new Dropdown('#language_dropdown').start();
}
if (currencyDropdown) {
  new Dropdown('#currency_dropdown').start();
}
if (menuLangDropdown) {
  new Dropdown('#menu_language_dropdown').start();
}
if (menuCurrencyDropdown) {
  new Dropdown('#menu_currency_dropdown').start();
}
if (sortDropdown) {
  new Dropdown('#sort_dropdown').start();
}
if (storeSort) {
  new Dropdown('#sort_dropdown_store').start();
}
if (inventorySort) {
  new Dropdown('#sort_dropdown_inventory').start();
}

if (search.length > 0) {
  search.forEach((search) => {
    const searchForm = search.querySelector('.search__form');
    const showFormBtn = search.querySelector('.search__show-btn');
    showFormBtn.addEventListener('click', () => {
      searchForm.classList.add('search__form--active')
    });
  });

  document.addEventListener('click', hideSearchField);
}

if (dealItemsSlider) {
  const dealSwiper = new Swiper('.deal__items-slider', {
    grabCursor: true,
    slidesPerView: 5.5,
  });
}

if (settings.length > 0) {
  settings.forEach(setting => {
    const settingsBtn = setting.querySelector('.settings-btn');
    const settingsList = setting.querySelector('.settings__list');
  
    settingsBtn.addEventListener('click', () => {
      toggleSettings(settingsBtn, settingsList);
    });
  });

  document.addEventListener('click', event => {
    const {target} = event;
    const isSettings = target.closest('.settings');
    if (!isSettings) {
      const list = document.querySelectorAll('.settings__list');
      const button = document.querySelectorAll('.settings-btn');
      list.forEach(item => {
        item.classList.remove('settings__list--active');
        item.style.maxHeight = 0;
      });
      button.forEach(btn => {
        btn.classList.remove('settings-btn--active');
      });
    }
  });
}

accountItemsList?.forEach(list => {
  showAccountItemsPlaceholder(list);
});

if (emailForm) {
  setEmailLabelWidth();
  addEmailValueToText();
  setEmailInputWidth();
}

emailForm?.addEventListener('submit', controlEmailSubmit);
emailFormButton?.addEventListener('click', chengeEmail);
emailFormInput?.addEventListener('input', changeEmailInputWidth);


if (statisticTableWrapper) {
  const tableScroll = new SimpleBar(statisticTableWrapper, {
    autoHide: false,
  });

  tableScroll.getScrollElement().addEventListener('scroll', showHideTableShadow);
  showEndShadow();
}


// functions
function showHideTableShadow(event) {
  const {target} = event;
  const distanceToLeft = target.scrollLeft;
  const distanceToRight = statisticTable.scrollWidth - statisticTableWrapper.clientWidth - distanceToLeft;

  if (distanceToLeft < 10) {
    statisticTableWrapper.classList.remove('table-left-shadow');
  } else {
    statisticTableWrapper.classList.add('table-left-shadow');
  }
  
  if (distanceToRight < 10) {
    statisticTableWrapper.classList.remove('table-right-shadow');
  } else {
    statisticTableWrapper.classList.add('table-right-shadow');
  }
}

function showEndShadow() {
  const scrollbar = statisticTableWrapper.querySelector('.simplebar-track.simplebar-horizontal');
  if (scrollbar.style.visibility === 'visible') {
    statisticTableWrapper.classList.add('table-right-shadow');
  }
}

function addItem(event, item) {
  const {target} = event;
  const addButton = item.querySelector('.item__add-button');
  if (addButton) {
    const isAddButton = target.classList.contains('item__add-button');
    const isOverlay = target.classList.contains('item__overlay');
    if (isOverlay || isAddButton) item.classList.toggle('item--added');
  }
}

function choseItem(event, item) {
  const {target} = event;
  const isFavouriteButton = target.classList.contains('item__favourite-button');
  if (isFavouriteButton) item.classList.toggle('item--chosen');
}

function deleteButton(event, item) {
  const {target} = event;
  const deleteButton = item.querySelector('.item__remove-button');
  if (deleteButton) {
    const isDeleteButton = target.classList.contains('item__remove-button');
    const isOverlay = target.classList.contains('item__overlay');
    if (isOverlay || isDeleteButton) {
      const itemWidth = item.getBoundingClientRect().width;
      item.style.marginRight = `-${itemWidth}px`;
      item.style.transform = `perspective(700px) rotateY(90deg)`;
      const parentList = item.closest('.account__items-list');
      setTimeout(() => {
        item.remove();
      }, 500);
      setTimeout(() => {
        showAccountItemsPlaceholder(parentList);
      }, 501);
    }
  }
}

function toggleFilterSection(event) {
  const {target} = event;
  const title = target.closest('.filter__section-title');

  if (!title) return;

  const parentSection = target.closest('.filter__form-section');
  const wrapper = parentSection.querySelector('.filter__checkbox-wrapper');
  const list = wrapper.querySelector('.filter__checkbox-list');
  const wrapperHeight = wrapper.getBoundingClientRect().height;
  const listHeight = list.getBoundingClientRect().height;

  if (wrapperHeight === 0) {
    wrapper.style.height = `${listHeight}px`;
    title.classList.add('filter__section-title--active');
  } else {
    wrapper.style.height = 0;
    title.classList.remove('filter__section-title--active');
  }
}

function countCheckedFilterItems(event) {
  const {target} = event;
  const label = target.closest('.filter__checkbox-label');
  const isTopLabel = target.closest('.filter__checkbox-label-top');

  if (!label || isTopLabel) return;
  
  const parentSection = label.closest('.filter__form-section');
  const countElement = parentSection.querySelector('.filter__count');
  const allItems = parentSection.querySelectorAll('.filter__checkbox-label');
  const allInputs = parentSection.querySelectorAll('.filter__checkbox-label input[type="checkbox"]');

  let checkedAmount = 0;
  allInputs.forEach(input => {
    if (input.checked === true) checkedAmount++;
  });

  if (checkedAmount > 0) {
    countElement.classList.add('filter__count--active');
  } else {
    countElement.classList.remove('filter__count--active');
  }

  countElement.textContent = `(${checkedAmount}/${allItems.length})`;
}

function declineFilterForm(event) {
  const {target} = event;
  const declineButton = target.closest('.filter__decline-btn');
  if (!declineButton) return;

  const filterSections = filter.querySelectorAll('.filter__form-section');
  filterSections.forEach(section => {
    const title = section.querySelector('.filter__section-title');
    const listWrapper = section.querySelector('.filter__checkbox-wrapper');
    const count = section.querySelector('.filter__count');

    listWrapper.style.height = 0;
    count.classList.remove('filter__count--active');
    title.classList.remove('filter__section-title--active');
  });

  rangeSlider.noUiSlider.reset();
}

function openMobileFilter() {
  filter.classList.toggle('filter--active');
}

function closeMobileFilter(event) {
  const {target} = event;
  const closeButton = target.closest('.filter__close-btn');
  if (!closeButton) return;
  filter.classList.remove('filter--active');
}

function openMainMenu() {
  menuListWrapper.classList.add('menu__list-wrapper--active');
}

function closeMainMenu() {
  menuListWrapper.classList.remove('menu__list-wrapper--active');
}

function hideSearchField(event) {
  const {target} = event;
  const searchField = target.closest('.search');
  if (!searchField) {
    searchForms.forEach(form => {
      form.classList.remove('search__form--active');
    });
  }
}

function toggleSettings(button, list) {
  button.classList.add('settings-btn--active');
  if(list.classList.contains('settings__list--active')) {
    closeSettings(list, button);
  } else {
    list.classList.add('settings__list--active');
    list.style.maxHeight = list.scrollHeight + 20 + 'px';
  };
}

function closeSettings(list, button) {
  list.classList.remove('settings__list--active');
  button.classList.remove('settings-btn--active');
  list.style.maxHeight = 0;
}

tabsButtons.forEach(button => {
  button.addEventListener('click', switchTabs);
});

function switchTabs() {
  tabsButtons.forEach(button => {
    button.classList.remove('deal__items-header--active');
  });
  this.classList.add('deal__items-header--active');

  tabsContent.forEach(content => {
    content.classList.remove('deal__side--active');
    if (this.dataset.btn === content.dataset.tab) {
      content.classList.add('deal__side--active');
    }
  });
}

function showAccountItemsPlaceholder(list) {
  const listBlock = list.closest('.account__page-block');
  const listItems = list.querySelectorAll('.item');
  if (listItems.length === 0) {
    listBlock.classList.add('no-items');
  } else {
    listBlock.classList.remove('no-items');
  }
}

function chengeEmail() {
  const valueIsValid = emailInputValidation();
  
  if (!valueIsValid) {
    addErrorAnimationToInput();
    return;

  } else {
    emailForm.classList.toggle('user__email-form--active');
    const isActive = emailForm.classList.contains('user__email-form--active');

    if (isActive) {
      emailFormInput.disabled = false;
      emailFormLabel.style.width = 0;
      emailFormInput.style.transition = 'all 0.3s';
      setTimeout(() => {
        emailFormInput.style.transition = 'none';
      }, 300);
    } else {
      emailFormInput.style.transition = 'all 0.3s';
      emailFormInput.disabled = true;
      setEmailLabelWidth();
      addEmailValueToText();
      setEmailInputWidth();
    }
  }
}

function setEmailLabelWidth() {
  const labelWidth = emailFormLabel.scrollWidth;  
  emailFormLabel.style.width = `${labelWidth}px`;
}

function setEmailInputWidth() {
  const hiddenTextWidth = emailFormHiddenText.scrollWidth;
  emailFormInput.style.width = `${hiddenTextWidth + 10}px`;
}

function addEmailValueToText() {
  const value = emailFormInput.value;
  emailFormHiddenText.textContent = value;
}

function changeEmailInputWidth() {
  const value = this.value;
  emailFormHiddenText.textContent = value;
  this.style.width = `${emailFormHiddenText.scrollWidth}px`
}

function emailInputValidation() {
  const value = emailFormInput.value;
  var regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regexp.test(String(value).toLowerCase());
}

function controlEmailSubmit(event) {
  const valueIsValid = emailInputValidation();
  if (!valueIsValid) {
    event.preventDefault();
    addErrorAnimationToInput();
  }
}

function addErrorAnimationToInput() {
  emailForm.classList.add('user__email-form--error');
  setTimeout(() => {
    emailForm.classList.remove('user__email-form--error');
  }, 600);
}

// // item
// const item = document.querySelectorAll('.item'),
//       modalOverlay = document.querySelector('.modal-overlay');

// item.forEach((oneItem) => {

//   const overlay = oneItem.querySelector('.item__overlay'),
//         icons = oneItem.querySelector('.item__icons'),
//         openModalBtn = oneItem.querySelector('.item__details'),
//         modalItem = oneItem.querySelector('.modal-item'),
//         favouriteBtn = oneItem.querySelector('.item__star'),
//         floatSlider = modalItem.querySelector('.float-scale__base'),
//         floatValue = modalItem.querySelector('.float-value');

//   /*
//   разноцветная полоска в модальном окне
//   */
//   noUiSlider.create(floatSlider, {
//     /*
//     ползунок над полоской показывает то число,
//     которое записано в float-value
//     */
//     start: floatValue.innerText,
//     step: 0.00000001,
//     range: {
//       'min': 0,
//       'max': 1
//     }
//   });

//   /*
//   при клике на item__details открывается модальное окно
//   */
//   openModalBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     modalItem.classList.add('modal-item--active');
//     modalOverlay.classList.add('modal-overlay--active');
//   });
//   /*
//   при клике на оверлей, модальное окно закрывается
//   */
//   modalOverlay.addEventListener('click', () => {
//     modalItem.classList.remove('modal-item--active');
//     modalOverlay.classList.remove('modal-overlay--active');
//   });
// });

// // слайдер в модальном окне 
// const modalSwiper = new Swiper('.modal-item__slider', {
//   grabCursor: true,
//   slidesPerView: 4.5,
//   spaceBetween: 3,
// });

// // закрытие модального окна
// const closeModalBtn = document.querySelectorAll('.modal-item__close'),
//       modalItem = document.querySelectorAll('.modal-item');

// closeModalBtn.forEach((closeBtn) => {
//   /*
//   при клике на крестик, модальное окно закрывается
//   */
//   closeBtn.addEventListener('click', () => {
//     modalOverlay.classList.remove('modal-overlay--active');
//     modalItem.forEach((modal) => {
//       modal.classList.remove('modal-item--active');
//     });
//   });
// });