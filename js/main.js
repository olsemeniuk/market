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
const modalOverlay = document.querySelector('.modal-overlay');
const modalItems = document.querySelectorAll('.modal-item');


// function calls and events
if (gameItems.length > 0) {
  gameItems.forEach(item => {
    item.addEventListener('click', event => {
      addItem(event, item);
      choseItem(event, item);
      deleteButton(event, item)
      showGameItemModal(event, item);
      closeModal(event);
    });

    const floatSlider = item.querySelector('.float-scale__base');
    const floatValue = item.querySelector('#float-value');
    noUiSlider.create(floatSlider, {
      start: floatValue.innerText,
      step: 0.00000001,
      range: {
        'min': 0,
        'max': 1
      }
    });
  });

  modalItems.forEach(modal => {
    const modalScroll = new SimpleBar(modal, {
      autoHide: false,
    });
  });

  modalOverlay.addEventListener('click', closeModal);

  const modalSwiper = new Swiper('.modal-item__slider', {
    grabCursor: true,
    slidesPerView: 4.5,
    spaceBetween: 3,
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
    const { target } = event;
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
  const { target } = event;
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
  const { target } = event;
  const addButton = item.querySelector('.item__add-button');
  if (addButton) {
    const isAddButton = target.classList.contains('item__add-button');
    const isOverlay = target.classList.contains('item__overlay');
    if (isOverlay || isAddButton) item.classList.toggle('item--added');
  }
}

function choseItem(event, item) {
  const { target } = event;
  const isFavouriteButton = target.classList.contains('item__favourite-button');
  if (isFavouriteButton) item.classList.toggle('item--chosen');
}

function deleteButton(event, item) {
  const { target } = event;
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
  const { target } = event;
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
  const { target } = event;
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
  const { target } = event;
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
  const { target } = event;
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
  const { target } = event;
  const searchField = target.closest('.search');
  if (!searchField) {
    searchForms.forEach(form => {
      form.classList.remove('search__form--active');
    });
  }
}

function toggleSettings(button, list) {
  button.classList.add('settings-btn--active');
  if (list.classList.contains('settings__list--active')) {
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

function showGameItemModal(event, item) {
  const { target } = event;
  const isDetailsButton = target.closest('.item__details');
  if (!isDetailsButton) return;
  const modal = item.querySelector('.modal-item');
  modal.classList.add('modal-item--active');
  modalOverlay.classList.add('modal-overlay--active');

  renderChart(item);
}


function closeModal(event) {
  const { target } = event;
  const closeButton = target.closest('.modal-item__close');

  if (closeButton || target === modalOverlay) {
    const allModal = document.querySelectorAll('.modal-item');
    allModal.forEach(modal => modal.classList.remove('modal-item--active'));
    modalOverlay.classList.remove('modal-overlay--active');
    gameItems.forEach(item => {
      destroyChart(item);
    });
  }
}

function renderChart(item) {
  const chartContainer = item.querySelector('.chart-container');
  const chartContainerID = chartContainer.id;
  createChart(`#${chartContainerID}`, chartData);
}


function destroyChart(item) {
  const chart = item.querySelector('.chart-container svg');
  const tooltip = item.querySelector('.chart-container .tooltip');
  const tooltipCircle = item.querySelector('.chart-container .tooltip-circle')
  chart?.remove();
  tooltip?.remove();
  tooltipCircle?.remove();
}

// chart
const chartData = [
  { date: new Date('2021-12-01T14:22'), value: 10400.12 },
  { date: new Date('2021-12-15T14:22'), value: 10475.12 },
  { date: new Date('2022-01-01T14:22'), value: 10500.12 },
  { date: new Date('2022-01-15T14:22'), value: 10450.12 },
  { date: new Date('2022-02-01T14:22'), value: 10475.12 },
  { date: new Date('2022-02-15T14:22'), value: 10460.12 },
  { date: new Date('2022-03-01T14:22'), value: 10500.12 },
  { date: new Date('2022-03-15T14:22'), value: 10525.12 },
  { date: new Date('2022-04-01T14:22'), value: 10475.12 },
  { date: new Date('2022-04-15T14:22'), value: 10500.12 },
  { date: new Date('2022-05-01T14:22'), value: 10522.12 },
  { date: new Date('2022-05-15T14:22'), value: 10550.12 },
  { date: new Date('2022-06-01T14:22'), value: 10565.12 },
  { date: new Date('2022-06-15T14:22'), value: 10600.12 },
  { date: new Date('2022-07-01T14:22'), value: 10565.12 },
  { date: new Date('2022-07-01T14:22'), value: 10565.12 },
  { date: new Date('2022-07-15T14:22'), value: 10600.12 },
  { date: new Date('2022-08-01T14:22'), value: 10550.12 },
  { date: new Date('2022-08-15T14:22'), value: 10565.12 },
  { date: new Date('2022-09-01T14:22'), value: 10570.12 },
  { date: new Date('2022-09-15T14:22'), value: 10555.12 },
  { date: new Date('2022-10-01T14:22'), value: 10575.12 },
  { date: new Date('2022-10-15T14:22'), value: 10580.12 },
  { date: new Date('2022-11-01T14:22'), value: 10565.12 },
  { date: new Date('2022-11-15T14:22'), value: 10600.12 },
  { date: new Date('2022-12-01T14:22'), value: 10550.12 },
  { date: new Date('2022-12-15T14:22'), value: 10565.12 },
  { date: new Date('2023-01-01T14:22'), value: 10570.12 },
  { date: new Date('2023-01-15T14:22'), value: 10450.12 },
  { date: new Date('2023-02-01T14:22'), value: 10475.12 },
  { date: new Date('2023-02-15T14:22'), value: 10460.12 },
  { date: new Date('2023-03-01T14:22'), value: 10500.12 },
  { date: new Date('2023-03-15T14:22'), value: 10525.12 },
  { date: new Date('2023-04-01T14:22'), value: 10475.12 },
  { date: new Date('2023-04-15T14:22'), value: 10500.12 },
  { date: new Date('2023-05-01T14:22'), value: 10522.12 },
  { date: new Date('2023-05-15T14:22'), value: 10550.12 },
  { date: new Date('2023-06-01T14:22'), value: 10565.12 },
  { date: new Date('2023-06-15T14:22'), value: 10600.12 },
  { date: new Date('2023-07-01T14:22'), value: 10565.12 },
  { date: new Date('2023-07-01T14:22'), value: 10565.12 },
  { date: new Date('2023-07-15T14:22'), value: 10600.12 },
  { date: new Date('2023-08-01T14:22'), value: 10550.12 },
  { date: new Date('2023-08-15T14:22'), value: 10565.12 },
  { date: new Date('2023-09-01T14:22'), value: 10570.12 },
  { date: new Date('2023-09-15T14:22'), value: 10555.12 },
  { date: new Date('2023-10-01T14:22'), value: 10575.12 },
  { date: new Date('2023-10-15T14:22'), value: 10580.12 },
  { date: new Date('2023-11-01T14:22'), value: 10565.12 },
  { date: new Date('2023-11-15T14:22'), value: 10600.12 },
  { date: new Date('2023-12-01T14:22'), value: 10550.12 },
  { date: new Date('2023-12-15T14:22'), value: 10565.12 },
  { date: new Date('2024-01-01T14:22'), value: 10500.12 },
  { date: new Date('2024-01-15T14:22'), value: 10450.12 },
  { date: new Date('2024-02-01T14:22'), value: 10475.12 },
  { date: new Date('2024-02-15T14:22'), value: 10460.12 },
  { date: new Date('2024-03-01T14:22'), value: 10500.12 },
  { date: new Date('2024-03-15T14:22'), value: 10525.12 },
  { date: new Date('2024-04-01T14:22'), value: 10475.12 },
  { date: new Date('2024-04-15T14:22'), value: 10500.12 },
  { date: new Date('2024-05-01T14:22'), value: 10522.12 },
  { date: new Date('2024-05-15T14:22'), value: 10550.12 },
  { date: new Date('2024-06-01T14:22'), value: 10565.12 },
  { date: new Date('2024-06-15T14:22'), value: 10600.12 },
  { date: new Date('2024-07-01T14:22'), value: 10565.12 },
  { date: new Date('2024-07-01T14:22'), value: 10565.12 },
  { date: new Date('2024-07-15T14:22'), value: 10600.12 },
  { date: new Date('2024-08-01T14:22'), value: 10550.12 },
  { date: new Date('2024-08-15T14:22'), value: 10565.12 },
  { date: new Date('2024-09-01T14:22'), value: 10570.12 },
  { date: new Date('2024-09-15T14:22'), value: 10555.12 },
  { date: new Date('2024-10-01T14:22'), value: 10575.12 },
  { date: new Date('2024-10-15T14:22'), value: 10580.12 },
  { date: new Date('2024-11-01T14:22'), value: 10565.12 },
  { date: new Date('2024-11-15T14:22'), value: 10600.12 },
  { date: new Date('2024-12-01T14:22'), value: 10550.12 },
  { date: new Date('2025-01-01T14:22'), value: 10500.12 },
  { date: new Date('2025-01-15T14:22'), value: 10450.12 },
  { date: new Date('2025-02-01T14:22'), value: 10475.12 },
  { date: new Date('2025-02-15T14:22'), value: 10460.12 },
  { date: new Date('2025-03-01T14:22'), value: 10500.12 },
  { date: new Date('2025-03-15T14:22'), value: 10525.12 },
  { date: new Date('2025-04-01T14:22'), value: 10475.12 },
  { date: new Date('2025-04-15T14:22'), value: 10500.12 },
  { date: new Date('2025-05-01T14:22'), value: 10522.12 },
  { date: new Date('2025-05-15T14:22'), value: 10550.12 },
  { date: new Date('2025-06-01T14:22'), value: 10565.12 },
  { date: new Date('2025-06-15T14:22'), value: 10600.12 },
  { date: new Date('2025-07-01T14:22'), value: 10565.12 },
  { date: new Date('2025-07-01T14:22'), value: 10565.12 },
  { date: new Date('2025-07-15T14:22'), value: 10600.12 },
  { date: new Date('2025-08-01T14:22'), value: 10550.12 },
  { date: new Date('2025-08-15T14:22'), value: 10565.12 },
  { date: new Date('2025-09-01T14:22'), value: 10570.12 },
  { date: new Date('2025-09-15T14:22'), value: 10555.12 },
  { date: new Date('2025-10-01T14:22'), value: 10575.12 },
  { date: new Date('2025-10-15T14:22'), value: 10580.12 },
  { date: new Date('2025-11-01T14:22'), value: 10565.12 },
  { date: new Date('2025-11-15T14:22'), value: 10600.12 },
  { date: new Date('2025-12-01T14:22'), value: 10550.12 },
  { date: new Date('2025-12-15T14:22'), value: 10565.12 },
];



const chartContainer = document.querySelectorAll('.chart-container');

chartContainer?.forEach(item => {
  window.addEventListener('resize', () => {
    resizeCharts(item)
  });
})


function resizeCharts(container) {
  const chart = container.querySelector('svg')
  const tooltip = container.querySelector('.tooltip')
  const tooltipCircle = container.querySelector('.tooltip-circle')

  if (chart) {
    chart.remove();
    tooltip.remove();
    tooltipCircle.remove();
    createChart(`#${container.id}`, chartData);
  }
}

function createChart(id, dataset) {
  const months = {
    0: 'jan',
    1: 'feb',
    2: 'mar',
    3: 'apr',
    4: 'may',
    5: 'jun',
    6: 'jul',
    7: 'aug',
    8: 'sep',
    9: 'oct',
    10: 'nov',
    11: 'dec'
  }

  const container = document.querySelector(id)
  const containerWidth = container.getBoundingClientRect().width;
  const containerHeight = container.getBoundingClientRect().height;

  const margin = { top: 30, right: 12, bottom: 70, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .range([20, width - margin.right]);

  const y = d3.scaleLinear()
    .range([height - 20, 0]);

  const svg = d3.select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const tooltip = d3.select(id)
    .append('div')
    .attr('class', 'tooltip');

  x.domain(d3.extent(dataset, d => d.date));
  y.domain([d3.min(dataset, d => d.value), d3.max(dataset, d => d.value)]);

  svg
    .append('defs')
    .append('marker')
    .attr('id', 'lineCircle')
    .attr('viewBox', [0, 0, 20, 20])
    .attr('refX', 10)
    .attr('refY', 10)
    .attr('markerWidth', 9)
    .attr('markerHeight', 9)
    .attr('orient', 'auto-start-reverse')
    .append('circle')
    .attr('r', 4)
    .attr('stroke', '#5b3889')
    .attr('stroke-width', 2)
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('fill', '#25252b');

  d3.select(`${id} defs`)
    .append('marker')
    .attr('id', 'dashedBorder')
    .attr('viewBox', [0, 0, 20, 20])
    .attr('markerWidth', 20)
    .attr('markerHeight', 20)
    .attr('refX', 0)
    .attr('refY', 0.5)
    .attr('orient', 'auto-start-reverse')
    .append('line')
    .attr('fill', 'none')
    .attr('stroke', '#373740')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '2, 2')
    .attr('x1', 0)
    .attr('x2', 20)
    .attr('y1', 0)
    .attr('y2', 0);

  d3.select(`${id} defs`)
    .append('marker')
    .attr('id', 'arrowhead-right')
    .attr('viewBox', [0, 0, 25, 25])
    .attr('markerWidth', 25)
    .attr('markerHeight', 35)
    .attr('refX', 0)
    .attr('refY', 0)
    .append('line')
    .attr('fill', 'none')
    .attr('stroke', '#373740')
    .attr('stroke-width', 1)
    .attr('x1', 0)
    .attr('x2', 20)
    .attr('y1', 0)
    .attr('y2', 0);


  const xAxisArrow = d3.select(`${id} #arrowhead-right`)
    .append('path')
    .attr('d', 'M2.222,4.809 C3.859,4.074 6.995,3.011 6.1000,2.539 C6.857,2.198 6.395,2.107 6.005,1.926 C5.164,1.537 4.324,1.149 3.483,0.761 C3.117,0.592 2.676,0.413 2.222,0.239 C1.074,-0.224 0.035,0.062 0.072,0.454 C0.108,0.820 0.598,0.912 1.001,1.098 C1.687,1.415 2.354,1.740 3.058,2.049 C3.412,2.204 3.833,2.307 3.987,2.478 C3.802,2.715 3.157,2.892 2.793,3.061 C1.863,3.490 0.411,4.030 0.072,4.379 C-0.355,4.949 1.346,5.187 2.222,4.809 Z')
    .attr('fill', '#373740')
    .attr('fill-rule', 'evenodd')
    .style('transform', 'translate(15px, -2.5px)');


  d3.select(`${id} defs`)
    .append('marker')
    .attr('id', 'arrowhead-top')
    .attr('viewBox', [0, 0, 25, 25])
    .attr('markerWidth', 35)
    .attr('markerHeight', 25)
    .attr('refX', 0)
    .attr('refY', 20)
    .append('line')
    .attr('fill', 'none')
    .attr('stroke', '#373740')
    .attr('stroke-width', 1)
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 20);

  const yAxisArrow = d3.select(`${id} #arrowhead-top`)
    .append('path')
    .attr('d', 'M4.809,4.778 C4.074,3.141 3.011,0.004 2.539,-0.000 C2.198,0.143 2.107,0.605 1.926,0.995 C1.538,1.836 1.149,2.676 0.761,3.517 C0.592,3.882 0.413,4.324 0.239,4.778 C-0.224,5.926 0.062,6.964 0.454,6.928 C0.820,6.892 0.912,6.402 1.098,5.999 C1.415,5.313 1.740,4.646 2.049,3.942 C2.204,3.588 2.307,3.167 2.478,3.013 C2.715,3.198 2.892,3.843 3.061,4.207 C3.490,5.137 4.030,6.588 4.379,6.928 C4.949,7.355 5.187,5.654 4.809,4.778 Z')
    .attr('fill', '#373740')
    .attr('fill-rule', 'evenodd')
    .attr('fill', '#373740')
    .style('transform', 'translate(-2.5px, -0.2px)');

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr('class', 'date-axis')
    .style('text-anchor', 'start')
    .call(d3.axisBottom(x)
      .tickSizeOuter(0)
      .ticks(width < 600 ? 6 : 12)
      .tickFormat((d, index, array) => {
        const year = d.getFullYear();
        let month = d.getMonth();
        month = months[month];
        const day = d.getDate();
        if (day === 1 && month === 'jan') {
          return year;
        } else {
          return `${day}, ${month}`;
        }
      }));

  svg.append("g")
    .call(d3.axisLeft(y)
      .ticks(dataset.forEach(d => d.value))
      .tickSizeOuter(0)
      .ticks(
        ((d3.max(dataset, d => d.value) - d3.min(dataset, d => d.value)) <= 3 ? 2 : 4)
      )
      .tickFormat((d, index) => {
        return `$${Number(d.toFixed(0)).toLocaleString('ru-RU')}`;
      }))
    .attr('class', 'price-axis');

  const dateDomain = d3.select(`${id} .date-axis path.domain`)
    .attr('marker-start', 'url(#dashedBorder)')
    .attr('marker-end', 'url(#arrowhead-right)');

  const priceDomain = d3.select(`${id} .price-axis path.domain`)
    .attr('marker-start', 'url(#dashedBorder)')
    .attr('marker-end', 'url(#arrowhead-top)');

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  svg.append('path')
    .datum(dataset)
    .attr('fill', 'none')
    .attr('stroke', '#5b3889')
    .attr('stroke-width', 2)
    .attr('marker-start', 'url(#lineCircle)')
    .attr('marker-end', 'url(#lineCircle)')
    .attr('d', line)
    .attr('class', 'line');

  const circle = d3.select(id)
    .append('span')
    .attr('class', 'tooltip-circle');

  const listeningRect = svg.append('rect')
    .attr('width', width)
    .attr('height', height);

  listeningRect.on("mousemove", function (event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(dataset, x0, 1);
    const d0 = dataset[i - 1];
    const d1 = dataset[i];
    if (!d1) return;
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    const xPos = x(d.date);
    const yPos = y(d.value);

    circle
      .style('display', 'block')
      .style('transform', `translate(${xPos + 55}px, ${yPos + 26}px)`);

    tooltip
      .style("display", "block")
      .style('transform', `translate(${xPos + 75}px, ${yPos + 12}px)`)
      .html(`<span>$${d.value !== undefined ? d.value.toFixed(2) : 'N/A'}</span>
             <span>${addZero(d.date.getHours())}:${addZero(d.date.getMinutes())},${months[d.date.getMonth()]},${d.date.getFullYear()}</span>`);

    if (width - xPos < 120) {
      tooltip.style('transform', `translate(${xPos - 40}px, ${yPos + 16}px)`);
    }

  });

  listeningRect.on("mouseleave", function () {
    circle.style('display', 'none');
    tooltip.style("display", "none");
  });

  function addZero(value) {
    value = String(value);
    if (value.length < 2) {
      return `0${value}`;
    } else {
      return value;
    }
  }
}