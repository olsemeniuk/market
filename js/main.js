const gameItems = document.querySelectorAll('.item');
const filter = document.querySelector('.filter');
const rangeSlider = filter?.querySelector('.range-slider__base');
const rangeSliderLowNums = filter?.querySelector('.range-slider__nums--low');
const rangeSliderHighNums = filter?.querySelector('.range-slider__nums--high');
const openFilterButton = document.querySelectorAll('.filter-btn');
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
const modalWindow = document.querySelectorAll('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseButton = document.querySelectorAll('.modal__close');
const infoContent = document.querySelector('.info__content');
const deal = document.querySelector('.deal');
const productsHeader = document.querySelector('.products__content-header');
const depositOpenButtons = document.querySelectorAll('.deposit-modal-open');
const withdrawOpenButtons = document.querySelectorAll('.withdraw-modal-open');
const infoBlocks = document.querySelectorAll('.info-block');
const numberInputs = document.querySelectorAll('.input--number');
const depositModal = document.querySelector('.deposit-modal');
const withdrawModal = document.querySelector('.withdraw-modal');
const paymentModals = document.querySelectorAll('.payment-modal');
const flipBlocks = document.querySelectorAll('.flip');
const openAuthButtons = document.querySelectorAll('.open-auth-button');
const authModal = document.querySelector('.auth');

const isSellPage = document.body.classList.contains('sell-page');
const isAccountPage = document.body.classList.contains('account-page');

if (gameItems.length > 0) {
  gameItems.forEach(item => {
    item.addEventListener('click', event => {
      deleteButton(event, item);
      showGameItemModal(event, item);
      choseItem(event, item);
      addItemsToCart(event, item);
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
}

if (openAuthButtons.length > 0) {
  openAuthButtons.forEach(button => {
    button.addEventListener('click', openAuthorization);
  });
}

if (modalWindow.length > 0) {
  modalCloseButton.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  modalOverlay.addEventListener('click', closeModal);
  showAddedItems();
  const modalShadow = document.querySelectorAll('.modal-shadow');
  modalShadow.forEach(shadow => {
    const modalScroll = new SimpleBar(shadow, {
      autoHide: false,
    });

    modalScroll.getScrollElement().addEventListener('scroll', event => {
      toggleModalShadow(event, shadow);
    });
    showEndModalShadow(shadow);
    window.addEventListener('resize', () => {
      showEndModalShadow(shadow);
    });
  });

  modalWindow.forEach(modal => {
    modal.addEventListener('click', event => {
      event.stopPropagation();
    });
  });

  document.addEventListener('keydown', event => {
    const { code } = event;
    if (code === 'Escape') {
      modalWindow.forEach(modal => {
        modal.classList.remove('modal--active');
        destroyChart(modal);

        const flip = modal.querySelector('.flip');
        if (flip) {
          flip.classList.remove('flip--rotate');
        }
      });
      modalOverlay.classList.remove('modal-overlay--active');
    }
  });
}

if (numberInputs.length > 0) {
  numberInputValidation();
}

if (infoBlocks.length > 0) {
  infoBlocks.forEach(info => {
    info.addEventListener('click', () => {
      openInfoModal(info)
    });
  })
}

if (paymentModals.length > 0) {
  if (depositOpenButtons.length > 0) {
    depositOpenButtons.forEach(button => {
      button.addEventListener('click', openDepositModal);
    });
  }

  if (withdrawOpenButtons.length > 0) {
    withdrawOpenButtons.forEach(button => {
      button.addEventListener('click', openWithdrawModal);
    });
  }

  paymentModals.forEach(modal => {
    handlePaymentProceedButton(modal);


    const form = modal.querySelector('.payment-form');
    const frontAmountInput = modal.querySelector('.payment-form__front-amount-input')

    frontAmountInput.addEventListener('input', () => {
      frontAmountInput.classList.remove('input--error');
      const inputAmountBack = modal.querySelector('.payment-form__back-amount-input');
      if (inputAmountBack) {
        inputAmountBack.value = frontAmountInput.value;
      }
    });

    frontAmountInput.addEventListener('change', () => {
      if (frontAmountInput.value === '' && modal.classList.contains('withdraw-modal')) {
        frontAmountInput.classList.add('input--error');
      }
    });

    form.addEventListener('input', () => {
      handlePaymentProceedButton(modal);
    });
  });
}


filter?.addEventListener('click', event => {
  toggleFilterSection(event);
  countCheckedFilterItemsOnClick(event);
  declineFilterForm(event);
  closeMobileFilter(event);
  cancelAllFilterButton(event);

  const filterSections = document.querySelectorAll('.filter__form-section');
  filterSections.forEach(section => {
    section.addEventListener('mousemove', selectAllFilterButton);
    section.addEventListener('mouseleave', () => {
      const labels = document.querySelectorAll('.filter__checkbox-label');
      labels.forEach(element => element.classList.remove('filter__checkbox-label--active'));
      const selectAllButton = section.querySelector('.filter__select-all');
      selectAllButton.style.opacity = 0;
    });
  });
});

if (openFilterButton.length > 0) {
  openFilterButton.forEach(button => {
    button.addEventListener('click', openMobileFilter);
  });
}

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

const dropdowns = document.querySelectorAll('.dropdown');
if (dropdowns.length > 0) {
  dropdowns.forEach(dropdown => {
    new Dropdown(dropdown).start();
  });
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

if (settings.length > 0) {
  settings.forEach(setting => {
    const settingsBtn = setting.querySelector('.settings-btn');
    const settingsListWrapper = setting.querySelector('.settings__list-wrapper');
    const settingsList = setting.querySelector('.settings__list');

    settingsBtn.addEventListener('click', () => {
      toggleSettings(settingsBtn, settingsListWrapper, settingsList);
    });
  });

  document.addEventListener('click', event => {
    const { target } = event;
    const isSettings = target.closest('.settings');
    if (!isSettings) {
      const wrapper = document.querySelectorAll('.settings__list-wrapper');
      const button = document.querySelectorAll('.settings-btn');
      wrapper.forEach(item => {
        item.classList.remove('settings__list-wrapper--active');
        item.style.height = 0;
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
  showEndTableShadow();
  window.addEventListener('resize', showEndTableShadow);
}

manageSmoothScrolling();

let lastScroll = 0;
if (infoContent) {
  createActiveLinkDot();
  document.addEventListener('scroll', showCurrentTitle);
  showCurrentTitle();
}

if (deal) {
  stickyHeader();
  dealHeaderChangeAt800();
  toggleDealHeaderPlaceholder();
  document.addEventListener('scroll', () => {
    stickyHeader();
  });

  window.addEventListener('resize', () => {
    dealHeaderChangeAt800();
    stickyHeader();
  })

  tabsButtons.forEach(button => {
    button.addEventListener('click', () => {
      switchTabs(button);
    });
  });
}

if (productsHeader) {
  window.addEventListener('resize', () => {
    productsHeaderChangeAt1100();
  })
  productsHeaderChangeAt1100();
}

const grabBlock = document.querySelectorAll('.grab-block')
let grabBlockPosition = { left: 0, x: 0 };

if (grabBlock.length > 0) {
  grabBlock.forEach(element => {
    element.addEventListener('mousedown', event => {
      grabScroll(event, element);
    });

    element.addEventListener('wheel', event => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY) * 15;
      element.scrollLeft += delta;
    });
  });

  const grabBlockWrapper = document.querySelectorAll('.grab-wrapper');
  grabBlockWrapper.forEach(wrapper => {
    const inner = wrapper.querySelector('.grab-block');
    addHorizontalShadows(wrapper, inner);

    inner.addEventListener('scroll', () => {
      addHorizontalShadows(wrapper, inner);
    });

    window.addEventListener('resize', () => {
      addHorizontalShadows(wrapper, inner);
    });
  });
}



function choseItem(event, item) {
  const { target } = event;
  const isFavouriteButton = target.classList.contains('item__favourite-button');
  if (!isFavouriteButton) return;
  if (item.classList.contains('item--chosen')) {
    item.classList.remove('item--chosen');
    removeItemFromLocalStorage(item, 'favouriteItems')
  } else {
    item.classList.add('item--chosen');
    saveItemToLocalStorage(item, 'favouriteItems');
  }
}

showFavouriteItems()

function showFavouriteItems() {
  if (isSellPage) return;
  const items = document.querySelectorAll('.item');
  const itemsFromStorage = JSON.parse(localStorage.getItem('favouriteItems'));
  if (!itemsFromStorage) return;

  itemsFromStorage.forEach(storageItem => {
    items.forEach(item => {
      if (storageItem.id === item.id) {
        item.classList.add('item--chosen');
      }
    });
  });
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
  const cancelAllButton = target.closest('.filter__cancel-all');

  if (!title || cancelAllButton) return;

  const parentSection = target.closest('.filter__form-section');
  const wrapper = parentSection.querySelector('.filter__checkbox-wrapper');
  const list = wrapper.querySelector('.filter__checkbox-list');
  const wrapperHeight = wrapper.getBoundingClientRect().height;
  const listHeight = list.getBoundingClientRect().height;
  const selectAllButton = parentSection.querySelector('.filter__select-all');
  const allCheckbox = parentSection.querySelectorAll('input[type="checkbox"]');
  let containsChecked = false;
  allCheckbox.forEach(checkbox => {
    if (checkbox.checked === true) containsChecked = true;
  })

  if (wrapperHeight === 0) {
    wrapper.style.height = `${listHeight}px`;
    title.classList.add('filter__section-title--active');
    if (!containsChecked) selectAllButton.style.display = 'block';
  } else {
    wrapper.style.height = 0;
    title.classList.remove('filter__section-title--active');
    selectAllButton.style.display = 'none';
  }
}

function countCheckedFilterItemsOnClick(event) {
  const { target } = event;
  const label = target.closest('.filter__checkbox-label');
  const isTopLabel = target.closest('.filter__checkbox-label-top');

  if (!label || isTopLabel) return;
  const parentSection = label.closest('.filter__form-section');

  countCheckedFilterItems(parentSection);
}

function countCheckedFilterItems(parentSection) {
  const countElement = parentSection.querySelector('.filter__count');
  const allItems = parentSection.querySelectorAll('.filter__checkbox-label');
  const allInputs = parentSection.querySelectorAll('.filter__checkbox-label input[type="checkbox"]');

  const selectAllButton = parentSection.querySelector('.filter__select-all');
  const cancelAllButton = parentSection.querySelector('.filter__cancel-all');

  let checkedAmount = 0;
  allInputs.forEach(input => {
    if (input.checked === true) checkedAmount++;
  });

  if (checkedAmount > 0) {
    countElement.classList.add('filter__count--active');
    selectAllButton.style.display = 'none';
    cancelAllButton.classList.add('filter__cancel-all--active');
  } else {
    countElement.classList.remove('filter__count--active');
    selectAllButton.style.display = 'block';
    cancelAllButton.classList.remove('filter__cancel-all--active');
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
    const cancelAllButton = section.querySelector('.filter__cancel-all');

    listWrapper.style.height = 0;
    count.classList.remove('filter__count--active');
    title.classList.remove('filter__section-title--active');
    cancelAllButton.classList.remove('filter__cancel-all--active');
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

  const isCloseButton = target.closest('.search__form-close-btn');
  if (isCloseButton) {
    const parentForm = isCloseButton.closest('.search__form');
    parentForm.classList.remove('search__form--active');
  }
}

function toggleSettings(button, wrapper, list) {
  const listHeight = list.getBoundingClientRect().height;
  const isOpened = wrapper.classList.contains('settings__list-wrapper--active');

  if (isOpened) {
    wrapper.style.height = 0;
    wrapper.classList.remove('settings__list-wrapper--active');
    button.classList.remove('settings-btn--active');
  } else {
    wrapper.style.height = `${listHeight}px`;
    wrapper.classList.add('settings__list-wrapper--active');
    button.classList.add('settings-btn--active');
  }
}

function openInfoModal(parentBlock) {
  const modal = parentBlock.querySelector('.info-block__modal');
  modal.classList.add('modal--active');
  modalOverlay.classList.add('modal-overlay--active');

  const isInGameItemModal = parentBlock.closest('.modal-item');
  if (isInGameItemModal) {
    modal.classList.add('info-block__modal--with-shadow');
  }
}

function showHideTableShadow(event) {
  const { target } = event;
  const distanceToLeft = target.scrollLeft;
  const distanceToRight = statisticTable.scrollWidth - statisticTableWrapper.clientWidth - distanceToLeft;

  if (distanceToLeft < 10) {
    statisticTableWrapper.classList.remove('horizontal-shadow--left');
  } else {
    statisticTableWrapper.classList.add('horizontal-shadow--left');
  }

  if (distanceToRight < 10) {
    statisticTableWrapper.classList.remove('horizontal-shadow--right');
  } else {
    statisticTableWrapper.classList.add('horizontal-shadow--right');
  }
}

function showEndTableShadow() {
  const scrollbar = statisticTableWrapper.querySelector('.simplebar-track.simplebar-horizontal');
  if (scrollbar.style.visibility === 'visible') {
    statisticTableWrapper.classList.add('horizontal-shadow--right');
  } else {
    statisticTableWrapper.classList.remove('horizontal-shadow--right');
  }
}

function switchTabs(btn) {
  tabsButtons.forEach(button => {
    button.classList.remove('deal__items-header--active');
  });
  btn.classList.add('deal__items-header--active');

  tabsContent.forEach(content => {
    content.classList.remove('deal__side--active');
    if (btn.dataset.btn === content.dataset.tab) {
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
  const valueIsValid = emailInputValidation(emailFormInput);

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

function emailInputValidation(input) {
  const value = input.value;
  var regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regexp.test(String(value).toLowerCase());
}

function controlEmailSubmit(event) {
  const valueIsValid = emailInputValidation(emailFormInput);
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
  const isOverlay = target.closest('.item__overlay');
  const isSellButton = target.closest('.item__sell-button');
  const isStashItem = item.classList.contains('stash__item');

  if (isStashItem) {
    if (!isOverlay && !isSellButton) return;
  } else {
    if (!isDetailsButton) return;
  }

  const modal = item.querySelector('.modal-item');
  modal.classList.add('modal--active');
  modalOverlay.classList.add('modal-overlay--active');

  renderChart(item);
}


function closeModal(event) {
  const { target } = event;
  const closeButton = target.closest('.modal__close');
  const isInInfoModal = target.closest('.info-block__modal')

  if ((closeButton || target === modalOverlay) && !isInInfoModal) {
    manageModalClose();
  }
}


function manageModalClose() {
  const allModal = document.querySelectorAll('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  allModal.forEach(modal => {
    modal.classList.remove('modal--active');
    const flip = modal.querySelector('.flip');
    if (flip) {
      flip.classList.remove('flip--rotate');
    }
  });
  modalOverlay.classList.remove('modal-overlay--active');
  gameItems.forEach(item => {
    destroyChart(item);
  });
}

const infoModalCloseButtons = document.querySelectorAll('.info-block__modal .modal__close');
infoModalCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeInfoModal(button);
  });
});

function closeInfoModal(button) {
  const isInGameItemModal = button.closest('.modal-item');
  const parentModal = button.closest('.info-block__modal');
  if (!isInGameItemModal) {
    modalOverlay.classList.remove('modal-overlay--active');
  }
  parentModal.classList.remove('modal--active');
}

function openDepositModal() {
  depositModal.classList.add('modal--active');
  modalOverlay.classList.add('modal-overlay--active');
  handleFilpHeight(depositModal)
}

function openWithdrawModal() {
  withdrawModal.classList.add('modal--active');
  modalOverlay.classList.add('modal-overlay--active');
  handleFilpHeight(withdrawModal)
}

function openAuthorization(event) {
  event.preventDefault();
  authModal.classList.add('modal--active');
  modalOverlay.classList.add('modal-overlay--active');
  handleFilpHeight(authModal);
}

function handleFilpHeight(parentBlock) {
  const flip = parentBlock.querySelector('.flip');
  const front = flip.querySelector('.flip__front');
  const frontInner = front.querySelector('.flip__inner');
  setHeight();
  setTimeout(setHeight, 10);

  function setHeight() {
    const frontInnerHeight = frontInner.getBoundingClientRect().height;
    front.style.height = `${frontInnerHeight}px`;
    flip.style.height = `${frontInnerHeight}px`;
  }
}

function renderChart(item) {
  const chartContainer = item.querySelector('.chart-container');
  const chartContainerID = chartContainer.id;
  manageChartCreation(`#${chartContainerID}`, testChartData);
  window.addEventListener('resize', () => {
    manageChartResize(chartContainer, testChartData);
  });
}

function destroyChart(item) {
  const chartContainer = item.querySelector('.chart-container');
  window.removeEventListener('resize', () => {
    manageChartResize(chartContainer, testChartData);
  });

  const chart = item.querySelector('.chart-container svg');
  const tooltip = item.querySelector('.chart-container .tooltip');
  const tooltipCircle = item.querySelector('.chart-container .tooltip-circle')
  chart?.remove();
  tooltip?.remove();
  tooltipCircle?.remove();
}

function manageSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

function showCurrentTitle() {
  let scrollDirection = 'down';
  if (window.scrollY > lastScroll) {
    scrollDirection = 'down';
  } else {
    scrollDirection = 'up'
  }
  lastScroll = window.scrollY;

  const infoSections = document.querySelectorAll('.info__content-section');
  infoSections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const bottom = section.getBoundingClientRect().bottom;
    const sectionHeight = section.getBoundingClientRect().height;

    const id = section.id;
    const menuLinks = document.querySelectorAll('.info__menu-link');
    const menuLink = document.querySelector(`.info__menu-link[href="#${id}"]`);

    let isCurrentSection;
    if (scrollDirection === 'down') {
      isCurrentSection = bottom > 0 && top <= 20;
    } else if (scrollDirection === 'up') {
      isCurrentSection = bottom > sectionHeight / 2 && bottom < sectionHeight;
    }

    if (window.scrollY < infoContent.getBoundingClientRect().top) {
      menuLinks.forEach(link => link.classList.remove('info__menu-link--current'));
      menuLinks[0].classList.add('info__menu-link--current');
    }

    if (isCurrentSection) {
      menuLinks.forEach(link => link.classList.remove('info__menu-link--current'));
      menuLink.classList.add('info__menu-link--current');
    }

    moveActiveLinkDot(document.querySelector('.info__menu-link--current'));
  });
}

function createActiveLinkDot() {
  const infoAside = document.querySelector('.info__aside');
  const dot = document.createElement('span');
  dot.className = 'active-link-dot';
  infoAside.append(dot);
}

function moveActiveLinkDot(activeLink) {
  const dot = document.querySelector('.active-link-dot');
  if (activeLink) {
    setTimeout(() => {
      dot.style.opacity = 1;
    }, 300);
    const left = activeLink.offsetLeft;
    const top = activeLink.offsetTop;
    dot.style.transform = `translate(${left}px, calc(${top + 8}px))`;
  }
}

function stickyHeader() {
  const dealHeader = document.querySelector('.deal__header');
  const distanceToTop = dealHeader.getBoundingClientRect().top;
  const headerHeight = dealHeader.getBoundingClientRect().height;
  const currentWindowWidth = getWindowWidth();
  const dealSide = document.querySelectorAll('.deal__side');

  dealSide.forEach(side => {
    const dealSideHeader = side.querySelector('.deal__side-header');
    const dealItems = side.querySelector('.deal__items');
    const dealSideHeaderHeight = dealSideHeader.getBoundingClientRect().height;
    if (currentWindowWidth < 700) {
      if (distanceToTop <= 0) {
        dealSideHeader.style.position = 'fixed';
        dealSideHeader.style.top = `${headerHeight - 2}px`;
        dealItems.style.paddingTop = `${dealSideHeaderHeight}px`;
        if (currentWindowWidth <= 500) {
          dealSideHeader.style.left = '10px';
          dealSideHeader.style.right = '10px';
        } else {
          dealSideHeader.style.left = '15px';
          dealSideHeader.style.right = '15px';
        }
      } else {
        removeSticky(dealItems, dealSideHeader);
      }

      addDealHeaderShadow(dealHeader, dealSideHeader);
    } else {
      removeSticky(dealItems, dealSideHeader);
    }
  });

  function removeSticky(items, header) {
    items.style.paddingTop = 0;
    header.style.position = 'relative';
    header.style.top = 0;
    header.style.left = 0;
    header.style.right = 0;
  }
}

function getWindowWidth() {
  return window.innerWidth;
}

function addDealHeaderShadow(header, sideHeader) {
  const distanceToTop = header.getBoundingClientRect().top;
  if (distanceToTop === 0) {
    sideHeader.classList.add('deal__side-header--shadow');
  } else {
    sideHeader.classList.remove('deal__side-header--shadow');
  }
}


function productsHeaderChangeAt1100() {
  const currentWindowWidth = getWindowWidth();
  const productsSearch = document.querySelector('.products__search');
  const leftSide = document.querySelector('.products__content-header-left');
  const rightSide = document.querySelector('.products__content-header-right');
  const centerSide = document.querySelector('.products__content-header-center');
  const productsSettings = document.querySelector('.products__settings');

  if (currentWindowWidth <= 1100) {
    changeSides(productsSearch, 'left');
    changeSides(productsSettings, 'right');
  } else {
    changeSides(productsSearch, 'center');
    changeSides(productsSettings, 'left');
  }

  function changeSides(element, side) {
    switch (side) {
      case 'left':
        element.remove();
        leftSide.append(element);
        break;
      case 'right':
        element.remove();
        rightSide.prepend(element);
        break;
      case 'center':
        element.remove();
        centerSide.append(element);
        break;
    }
  }
}

function dealHeaderChangeAt800() {
  const dealSideHeader = document.querySelectorAll('.deal__side-header');

  dealSideHeader.forEach(header => {
    const dealSettings = header.querySelector('.deal__settings');
    const rightSide = header.querySelector('.deal__side-header-right');
    const leftSide = header.querySelector('.deal__side-header-left');

    const currentWindowWidth = getWindowWidth();
    if (currentWindowWidth <= 800) {
      changeSides(dealSettings, 'right');
    } else {
      changeSides(dealSettings, 'left');
    }

    function changeSides(element, side) {
      switch (side) {
        case 'left':
          element.remove();
          leftSide.append(element);
          break;
        case 'right':
          element.remove();
          rightSide.prepend(element);
          break;
      }
    }
  });
}

function grabScroll(event, element) {
  event.preventDefault();
  element.style.userSelect = 'none';

  grabBlockPosition = {
    left: element.scrollLeft,
    x: event.clientX,
  }

  function mouseMoveHandler(event) {
    const dx = event.clientX - grabBlockPosition.x;
    element.scrollLeft = grabBlockPosition.left - dx;
  };

  function mouseUpHandler() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
}

function addHorizontalShadows(wrapper, inner) {
  const distanceToStart = inner.scrollLeft;
  const distanceToEnd = inner.scrollWidth - distanceToStart - inner.offsetWidth;

  if (inner.scrollWidth > inner.offsetWidth) {
    wrapper.classList.add('horizontal-shadow--right');
  }

  if (distanceToEnd < 2) {
    wrapper.classList.remove('horizontal-shadow--right');
  }

  if (distanceToStart > 0) {
    wrapper.classList.add('horizontal-shadow--left');
  } else {
    wrapper.classList.remove('horizontal-shadow--left');
  }
}

function toggleDealHeaderPlaceholder() {
  const headers = document.querySelectorAll('.deal__items-header');
  headers.forEach(header => {
    const placeholder = header.querySelector('.deal__items-header-placeholder');
    const slides = header.querySelectorAll('.deal__slider-slide');
    const cart = header.querySelector('.deal__cart');
    if (slides.length === 0) {
      placeholder.style.display = 'block';
      cart.style.display = 'none';
    } else {
      placeholder.style.display = 'none';
      cart.style.display = 'flex';
    }
  });
}

function addItemsToCart(event, item) {
  let totalPrice = 0;
  let totalAmount = 0;

  const addButton = item.querySelector('.item__add-button');
  if (!addButton) return;

  const { target } = event;
  const isAddButton = target.classList.contains('item__add-button');
  const isOverlay = target.classList.contains('item__overlay');

  if (!isAddButton && !isOverlay) return;

  item.classList.toggle('item--added');

  const itemOrigin = item.dataset.origin;
  const header = document.querySelector(`[data-header="${itemOrigin}"]`);
  const slider = header.querySelector('.deal__items-slider');
  const sliderWrapper = header.querySelector('.grab-wrapper');
  const amount = header.querySelector('.items-amount');
  const itemsSum = header.querySelector('.items-price');
  const id = item.id;

  const itemPriceHTML = item.querySelector('.item__price');
  const price = getItemPrice(itemPriceHTML);

  if (getItemPrice(itemsSum) > 0) {
    totalPrice = getItemPrice(itemsSum);
  }

  if (Number(amount.textContent.trim()) > 0) {
    totalAmount = Number(amount.textContent.trim());
  }

  if (item.classList.contains('item--added')) {
    if (slider) {
      const imageSource = item.querySelector('.item__img').src;
      addImageToSlider(imageSource, id, slider);
    }
    totalPrice += price;
    totalAmount++;
    saveItemToLocalStorage(item, 'chosenItemsInfo');
  } else {
    totalPrice -= price;
    totalAmount--;
    if (slider) {
      const slideToRemove = slider.querySelector(`[data-id="${id}"]`);
      slideToRemove.remove();
    }
    removeItemFromLocalStorage(item, 'chosenItemsInfo');
  }

  if (totalPrice < 0 || totalPrice === 0) {
    totalPrice = 0;
    itemsSum.textContent = '$ 0';
  } else {
    totalPrice = managePriceFormat(totalPrice);
    totalPrice = totalPrice.slice(0, totalPrice.length - 1).trim();

    itemsSum.textContent = totalPrice;
  }

  amount.textContent = totalAmount;
  if (slider) {
    addHorizontalShadows(sliderWrapper, slider);
  }
  toggleDealHeaderPlaceholder();
}

function getItemPrice(priceHTML) {
  priceHTML = priceHTML.textContent;
  priceHTML = Number(priceHTML.slice(1).trim().split('').filter(num => /\s/g.test(num) ? false : true).join(''));
  return priceHTML;
}

function managePriceFormat(price) {
  return `$ ${Number(price).toLocaleString('ru-RU', { style: 'currency', currency: 'USD' }).replace(/\,/g, '.')}`;
}

function addImageToSlider(imageSource, itemID, slider) {
  const sliderItem = document.createElement('div');
  sliderItem.className = 'deal__slider-slide';
  sliderItem.innerHTML = `<img class="deal__slider-img" width="40" height="25" src="${imageSource}" sizes="40px" alt="">`;
  sliderItem.dataset.id = itemID;
  sliderItem.style.animation = 'appearing 0.3s ease';
  slider.prepend(sliderItem);
}

function saveItemToLocalStorage(item, storageName) {
  const itemsInStorage = localStorage.getItem(storageName);
  let array = [];

  if (itemsInStorage) {
    array = JSON.parse(itemsInStorage);
  }

  const id = item.id;
  const price = getItemPrice(item.querySelector('.item__price'));
  const imageSource = item.querySelector('.item__img').src;
  const origin = item.dataset.origin;
  let containsItem = false;

  array.forEach(element => {
    if (element.id === id) {
      containsItem = true;
    }
  });

  if (!containsItem) {
    array.push({
      id: id,
      price: price,
      src: imageSource,
      origin: origin
    });
  }

  localStorage.setItem(storageName, JSON.stringify(array));
}

function removeItemFromLocalStorage(item, storageName) {
  const itemsInStorage = localStorage.getItem(storageName);
  let array = JSON.parse(itemsInStorage);
  const id = item.id;
  let itemIndex;
  array.forEach((obj, index) => {
    if (obj.id === id) {
      itemIndex = index;
    }
  });

  array.splice(itemIndex, 1);
  localStorage.setItem(storageName, JSON.stringify(array));
}

function showAddedItems() {
  const itemsFromStorage = JSON.parse(localStorage.getItem('chosenItemsInfo'));
  if (!itemsFromStorage || isSellPage || isAccountPage) return;
  const allItems = document.querySelectorAll('.item');

  let marketItemsAmount = 0;
  let inventoryItemsAmount = 0;
  let marketItemsTotalCost = 0;
  let inventoryItemsTotalCost = 0;

  itemsFromStorage.forEach(storageItem => {
    allItems.forEach(item => {
      if (item.id === storageItem.id) {
        item.classList.add('item--added');
      }
    });

    const currentItem = document.querySelector(`#${storageItem.id}`);
    if (!currentItem) return;

    const header = document.querySelector(`[data-header="${storageItem.origin}"]`);
    const slider = header.querySelector('.deal__items-slider');

    if (slider) {
      addImageToSlider(storageItem.src, storageItem.id, slider);
    }

    switch (storageItem.origin) {
      case 'market':
        marketItemsAmount++;
        marketItemsTotalCost += storageItem.price;
        break;
      case 'inventory':
        inventoryItemsAmount++;
        inventoryItemsTotalCost += storageItem.price;
        break;
    }
  });

  const marketHeader = document.querySelector('[data-header="market"]');
  const inventoryHeader = document.querySelector('[data-header="inventory"]');
  const marketAmount = marketHeader?.querySelector('.items-amount');
  const marketCost = marketHeader?.querySelector('.items-price');
  const inventoryAmount = inventoryHeader?.querySelector('.items-amount');
  const inventoryCost = inventoryHeader?.querySelector('.items-price');

  if (marketHeader) {
    showData(marketAmount, marketItemsAmount, marketCost, marketItemsTotalCost);
  }

  if (inventoryHeader) {
    showData(inventoryAmount, inventoryItemsAmount, inventoryCost, inventoryItemsTotalCost);
  }

  toggleDealHeaderPlaceholder();

  function showData(amountHTML, amountNum, priceHTML, priceNum) {
    amountHTML.textContent = amountNum;
    if (priceNum === 0) {
      priceHTML.textContent = '$ 0';
    } else {
      priceNum = managePriceFormat(priceNum);
      priceNum = priceNum.slice(0, priceNum.length - 1).trim();
      priceHTML.textContent = priceNum;
    }
  }
}

function selectAllFilterButton(event) {
  const { target } = event;
  const label = target.closest('.filter__checkbox-label');
  const labels = document.querySelectorAll('.filter__checkbox-label');
  if (target.closest('.filter__section-title') ||
    target.classList.contains('filter__checkbox-list') ||
    target.classList.contains('filter__checkbox-wrapper')) {
    document.querySelectorAll('.filter__select-all').forEach(button => button.style.opacity = 0);
    labels.forEach(element => element.classList.remove('filter__checkbox-label--active'));
  }

  if (!label) return;

  labels.forEach(element => element.classList.remove('filter__checkbox-label--active'));
  label.classList.add('filter__checkbox-label--active');
  const parentSection = label.closest('.filter__form-section');
  const selectAllButton = parentSection.querySelector('.filter__select-all');

  const title = parentSection.querySelector('.filter__section-title');
  const titleHeight = title.getBoundingClientRect().height;
  let titleMargin = window.getComputedStyle(title).getPropertyValue('margin-bottom');
  titleMargin = Number(titleMargin.slice(0, titleMargin.indexOf('px')));
  const titleSize = titleHeight + titleMargin;

  selectAllButton.style.transform = `translateY(${label.offsetTop + 5 - titleSize}px)`;
  selectAllButton.style.opacity = 1;

  selectAllButton.addEventListener('click', () => {
    const currentCheckbox = label.querySelector('input[type="checkbox"]');
    const allSectionCheckbox = parentSection.querySelectorAll('input[type="checkbox"]');
    allSectionCheckbox.forEach(checkbox => checkbox.checked = true);
    currentCheckbox.checked = false;
    selectAllButton.style.display = 'none';
    countCheckedFilterItems(parentSection);
  });
}

function cancelAllFilterButton(event) {
  const { target } = event;
  const cancelButton = target.closest('.filter__cancel-all');
  if (!cancelButton) return;
  const parentSection = cancelButton.closest('.filter__form-section');
  const cancelAllButton = parentSection.querySelector('.filter__cancel-all');
  cancelAllButton.classList.remove('filter__cancel-all--active');
  const allCheckboxes = parentSection.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach(checkbox => checkbox.checked = false);
  countCheckedFilterItems(parentSection);
}

function toggleModalShadow(event, modal) {
  const { target } = event;
  const distanceToTop = target.scrollTop;
  const distanceToBottom = target.scrollHeight - target.offsetHeight - distanceToTop;

  if (distanceToBottom < 10) {
    modal.classList.remove('modal-shadow--bottom');
  } else {
    modal.classList.add('modal-shadow--bottom');
  }

  if (distanceToTop < 10) {
    modal.classList.remove('modal-shadow--top');
  } else {
    modal.classList.add('modal-shadow--top');
  }
}

function showEndModalShadow(modal) {
  const scrollbar = modal.querySelector('.simplebar-track.simplebar-vertical');
  if (scrollbar.style.visibility === 'visible') {
    modal.classList.add('modal-shadow--bottom');
  } else {
    modal.classList.remove('modal-shadow--bottom');
  }
}

function numberInputValidation() {
  numberInputs.forEach(input => {
    input.addEventListener('input', () => {
      let value = input.value;
      value = value.replace(/[^.\d]+|^00+|^\./g, '')
        .replace(/^([^\.]*\.)|\./g, '$1');
      input.value = value;
    });
  });
}

function handlePaymentProceedButton(modal) {
  const proceedButton = modal.querySelector('.payment-form__proceed');
  const paymentRadios = modal.querySelectorAll('.payment-form__payment-radio');
  const proceedButtonWrapper = modal.querySelector('.payment-form__proceed-wrapper');
  const paymentAmount = modal.querySelector('.payment-form__front-amount-input');

  const isWithdrawModal = modal.classList.contains('withdraw-modal');
  let amountIsEmpty = false;

  if (isWithdrawModal) {
    amountIsEmpty = paymentAmount.value === '';
  }
  let radiosAreNotChecked = true;
  paymentRadios.forEach(radio => {
    if (radio.disabled === false) {
      if (radio.checked) radiosAreNotChecked = false;
    }
  });
  if (amountIsEmpty || radiosAreNotChecked) {
    proceedButton.disabled = true;
    proceedButtonWrapper.classList.add('payment-form__proceed-wrapper--active');
  } else {
    proceedButton.disabled = false;
    proceedButtonWrapper.classList.remove('payment-form__proceed-wrapper--active');
  }
}







// =================
// flip blocks start
manageFlipBlockRotation();

function manageFlipBlockRotation() {
  const flipBlocks = document.querySelectorAll('.flip');
  if (flipBlocks.length === 0) return;

  flipBlocks.forEach(flip => {
    const parentModal = flip.closest('.modal');
    const front = flip.querySelector('.flip__front');
    const back = flip.querySelector('.flip__back');
    const frontInner = front.querySelector('.flip__inner');
    const backInner = back.querySelector('.flip__inner');

    const buttons = flip.querySelectorAll('.flip__button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        flip.classList.toggle('flip--rotate');
        parentModal.style.perspective = '1000px';
        setTimeout(() => {
          parentModal.style.perspective = 'none';
        }, 500);

        const isFlipped = flip.classList.contains('flip--rotate');
        if (isFlipped) {
          const backInnerHeight = backInner.getBoundingClientRect().height;
          back.style.height = `${backInnerHeight}px`;
          flip.style.height = `${backInnerHeight}px`;
        } else {
          const frontInnerHeight = frontInner.getBoundingClientRect().height;
          front.style.height = `${frontInnerHeight}px`;
          flip.style.height = `${frontInnerHeight}px`;
        }
      });
    });
  });
}

function manageFlipHeightOnResize() {
  const flip = document.querySelectorAll('.flip');
  flip.forEach(block => {
    const isRotated = block.classList.contains('flip--rotete');
    const front = block.querySelector('.flip__front');
    const back = block.querySelector('.flip__back');
    const frontInner = front.querySelector('.flip__inner');
    const backInner = back.querySelector('.flip__inner');

    if (isRotated) {
      const backInnerHeight = backInner.getBoundingClientRect().height;
      back.style.height = `${backInnerHeight}px`;
      block.style.height = `${backInnerHeight}px`;
    } else {
      const frontInnerHeight = frontInner.getBoundingClientRect().height;
      front.style.height = `${frontInnerHeight}px`;
      block.style.height = `${frontInnerHeight}px`;
    }
  });
}
// flip blocks end
// =================



// ==============================
// layout changes on resize start
manageChangesOnResize();

function manageChangesOnResize() {
  window.addEventListener('resize', () => {
    manageFlipHeightOnResize();
    manageNotificationWrapperHeight();
  });
}
// layout changes on resize end
// ==============================



// ====================
// error tooltip start
function manageErrorTooltipPosition(tooltip, parentModal, input) {
  const inputWidth = input.getBoundingClientRect().width;
  tooltip.style.left = `${input.offsetLeft + inputWidth / 2 - 18}px`;
  tooltip.style.right = 'auto';
  tooltip.classList.remove('input-tooltip--right-arrow');

  const leftDocumentField = (document.documentElement.clientWidth - parentModal.clientWidth) / 2;
  const tooltipOffsetRight = tooltip.getBoundingClientRect().right - leftDocumentField;
  if (tooltipOffsetRight > parentModal.clientWidth) {
    tooltip.style.left = 'auto';
    tooltip.style.right = `${inputWidth / 2}px`;
    tooltip.classList.add('input-tooltip--right-arrow');
  }
}

function manageErrorTooltipCreation() {
  const tooltip = document.createElement('span');
  tooltip.className = 'input-tooltip';
  tooltip.innerHTML = `<span class="input-tooltip__arrow"></span><span class="input-tooltip__text"></span>`;
  return tooltip;
}
// error tooltip end
// ====================



// ====================
// payment modal start
managePaymentModals();

function managePaymentModals() {
  manageCardInputValidation();
  managePaymentInputMinMax();

  const paymentModals = document.querySelectorAll('.payment-modal');
  if (paymentModals.length === 0) return;

  paymentModals.forEach(modal => {
    managePaymentMethodChoice(modal);
    managePaymentMethodsMinMax(modal);
    managePaymentSubmitButton(modal);
    manageDisabledProceedButton(modal);
  });
}

function managePaymentSubmitButton(modal) {
  const form = modal.querySelector('.payment-form');
  const submitButton = modal.querySelector('.payment-form__submit');
  const cardInput = modal.querySelector('.payment-form__input.input--card');
  const inputs = modal.querySelectorAll('.flip__back .payment-form__input');

  manageButton();
  form.addEventListener('input', manageButton);

  function manageButton() {
    const noCard = cardInput.value.length < 19;
    let emptyInputs = false;
    let errorInputs = false;

    inputs.forEach(input => {
      if (input.value === '') {
        emptyInputs = true;
      }

      if (input.classList.contains('input--error')) {
        errorInputs = true;
      }
    });

    if (noCard || emptyInputs || errorInputs) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }
}

function managePaymentMethodChoice(modal) {
  const form = modal.querySelector('.payment-form');
  form.addEventListener('change', paymentMethodChoise);

  function paymentMethodChoise() {
    const activePaymentMethod = modal.querySelector('.payment-form__payment-radio:checked');
    const changePaymentMethodLabel = activePaymentMethod?.closest('.payment-form__payment-label');

    if (!changePaymentMethodLabel) return;
    const paymentMethods = modal.querySelectorAll('.payment-form__payment-button');
    const errorTooltip = modal.querySelector('.input-tooltip');
    paymentMethods.forEach(method => {
      method.classList.remove('input--error');
      errorTooltip?.remove();
    });

    const min = activePaymentMethod.dataset.min
    const max = activePaymentMethod.dataset.max

    const imageSource = changePaymentMethodLabel.querySelector('.payment-form__payment-img').src;
    const imageHTML = `<img class="chosen-method__icon" width="25" height="25" sizes="25" src="${imageSource}" alt="">`;
    let paymentMethodName = changePaymentMethodLabel.querySelector('.payment-form__payment-radio').dataset.paymentMethod;
    paymentMethodName = paymentMethodName[0].toUpperCase() + paymentMethodName.slice(1).toLowerCase();

    const chosenMethodElement = modal.querySelector('.chosen-method');
    chosenMethodElement.innerHTML = `payment by ${paymentMethodName} ${imageHTML}`;

    const inputAmountBack = modal.querySelector('.payment-form__back-amount-input');
    inputAmountBack.dataset.min = min;
    inputAmountBack.dataset.max = max;
    inputAmountBack.setAttribute('placeholder', `up to ${max}`);
  }
}

function managePaymentMethodsMinMax(modal) {
  const frontAmountInput = modal.querySelector('.payment-form__front-amount-input');
  const paymentRadios = modal.querySelectorAll('.payment-form__payment-radio');

  frontAmountInput.addEventListener('input', paymentMethodsMinMax);

  function paymentMethodsMinMax() {
    const inputValue = Number(frontAmountInput.value);
    paymentRadios.forEach(radio => {
      const paymentMin = Number(radio.dataset.min);
      const paymentMax = Number(radio.dataset.max);
      const comission = radio.dataset.comission;
      const parentLabel = radio.closest('.payment-form__payment-label');
      const text = parentLabel.querySelector('.payment-form__payment-text');

      if (frontAmountInput.value === '') {
        radio.disabled = false;
        text.innerHTML = `comission: <b>${comission}%</b>`;
        text.classList.remove('payment-form__payment-text--warning');
      } else if (inputValue < paymentMin) {
        radio.disabled = true;
        text.innerHTML = `from: <b>${paymentMin}$</b>`;
        text.classList.add('payment-form__payment-text--warning');
      } else if (inputValue > paymentMax) {
        radio.disabled = true;
        text.innerHTML = `up to: <b>${paymentMax}$</b>`;
        text.classList.add('payment-form__payment-text--warning');
      } else {
        radio.disabled = false;
        text.innerHTML = `comission: <b>${comission}%</b>`;
        text.classList.remove('payment-form__payment-text--warning');
      }
    });
  }
}

function managePaymentInputMinMax() {
  const inputs = document.querySelectorAll('.payment-form__input');
  if (inputs.length === 0) return;

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const min = input.dataset.min;
      const max = input.dataset.max;
      if (!min || !max) return;

      const parentLabel = input.closest('.payment-form__label');
      const parentModal = input.closest('.modal');

      const inputValue = Number(input.value);
      if (isNaN(inputValue)) return;

      const tooltipHTML = parentLabel.querySelector('.input-tooltip');
      const tooltip = manageErrorTooltipCreation();

      if (input.value === '') {
        input.classList.remove('input--error');
        tooltipHTML?.remove();

      } else if (inputValue < min || inputValue > max) {
        input.classList.add('input--error');
        if (!tooltipHTML) parentLabel.append(tooltip);

        const tooltipText = tooltip.querySelector('.input-tooltip__text');
        tooltipText.textContent = `please, choose amount between $${min} and $${max}`;
        manageErrorTooltipPosition(tooltip, parentModal, input);

        setTimeout(() => {
          tooltip.remove();
        }, 2000);

      } else {
        input.classList.remove('input--error');
        tooltipHTML?.remove();
      }
    });
  });
}

function manageDisabledProceedButton(modal) {
  const paymentRadios = modal.querySelectorAll('.payment-form__payment-radio');
  const paymentMethodsBlock = modal.querySelector('.payment-form__section-methods');
  const paymentAmount = modal.querySelector('.payment-form__front-amount-input');
  const paymentAmountLabel = paymentAmount.closest('.payment-form__label');
  const paymentMethods = modal.querySelectorAll('.payment-form__payment-button');
  const isWithdrawModal = modal.classList.contains('withdraw-modal');
  const proceedButtonWrapper = modal.querySelector('.payment-form__proceed-wrapper');
  const button = proceedButtonWrapper.querySelector('.payment-form__proceed');

  proceedButtonWrapper.addEventListener('click', clickOnDisabledButton);

  function clickOnDisabledButton() {
    let radiosAreNotChecked = true;
    let amountIsEmpty = false;

    if (isWithdrawModal) {
      amountIsEmpty = paymentAmount.value === '';
    }

    paymentRadios.forEach(radio => {
      if (radio.disabled === false) {
        if (radio.checked) radiosAreNotChecked = false;
      }
    });

    if (button.disabled === true) {
      if (modal.classList.contains('deposit-modal')) {
        notFilledForm('please, choose payment method', paymentMethodsBlock)
      } else if (modal.classList.contains('withdraw-modal')) {

        if (radiosAreNotChecked && amountIsEmpty) {
          notFilledForm('please, choose payment method and amount', paymentMethodsBlock);
          paymentAmount.classList.add('input--error');
        } else if (radiosAreNotChecked) {
          notFilledForm('please, choose payment method', paymentMethodsBlock);
        } else if (amountIsEmpty) {
          const tooltip = notFilledForm('please, choose amount', paymentAmountLabel, false);
          paymentAmount.classList.add('input--error');
          manageErrorTooltipPosition(tooltip, modal, paymentAmount);
        }
      }

      function notFilledForm(text, tooltipParent, noMethod = true) {
        if (noMethod) {
          paymentMethods.forEach(method => {
            method.classList.add('input--error');
          });
        }
        const tooltipHTML = modal.querySelector('.input-tooltip');
        const tooltip = manageErrorTooltipCreation()
        if (!tooltipHTML) tooltipParent.append(tooltip);
        const tooltipText = tooltip.querySelector('.input-tooltip__text');
        tooltipText.textContent = text;
        setTimeout(() => {
          tooltip.remove();
        }, 2000)

        return tooltip;
      }
    }
  }
}

function manageCardInputValidation() {
  const cardInputs = document.querySelectorAll('.payment-form__input.input--card');
  if (cardInputs.length === 0) return;

  cardInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input--error');
      input.value = input.value.replaceAll(/\D/gi, '');

      let pattern = '**** **** **** ****';
      let value = input.value;
      value = getPatternedValue(value, pattern);
      input.value = value;

      function getPatternedValue(string, pattern) {
        let newString = '';
        let counter = 0;

        for (let i = 0; i < pattern.length; i++) {
          if (!string[counter]) continue;
          if (pattern[i] === '*') {
            newString += string[counter];
            counter++;
            continue;
          }
          newString += pattern[i];
        }

        return newString;
      }
    });
    input.addEventListener('change', () => {
      const value = input.value;
      if (value.length < 19) {
        input.classList.add('input--error');
      } else {
        input.classList.remove('input--error');
      }
    });
  });
}
// payment modal end
// ====================



// =================
// favicon change start
manageFavicon();

function manageFavicon() {
  const icoIcon = document.getElementById('favicon_ico');
  const svgIcon = document.getElementById('favicon_svg');
  const appleIcon = document.getElementById('favicon_apple');

  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

  changePath();
  isDarkTheme.addEventListener('change', changePath);
  isDarkTheme.addListener(changePath); // for safari

  function changePath() {
    if (isDarkTheme.matches) {
      icoIcon.href = '/favicon-dark-theme.ico';
      svgIcon.href = '/images/favicons/dark-theme/favicon.svg';
      appleIcon.href = '/images/favicons/dark-theme/favicon180.png'
    } else {
      icoIcon.href = '/favicon.ico';
      svgIcon.href = '/images/favicons/light-theme/favicon.svg';
      appleIcon.href = '/images/favicons/light-theme/favicon180.png';
    }
  }
}
// favicon change end
// =================



// ===================================
// authorization form validation start
manageAuthFormValidation();

function manageAuthFormValidation() {
  const authModal = document.querySelector('.auth');
  if (!authModal) return;
  manageAuthNameInputValidation();
  manageAuthPassInputValidation();
  manageRegNameInputValidation();
  manageRegEmailInputValidation();
  manageRegPassInputsValidation();
  manageClickOnDisabledSubmitButton();
  manageDisableAuthButtons();
  manageErrorBorderToInputs();
}

function manageErrorBorderToInputs() {
  const authForm = document.querySelectorAll('.auth__form');
  authForm.forEach(form => {
    const authInputs = form.querySelectorAll('.auth__input');
    authInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.classList.add('input--error');
        }
      });
    });
  });
}

function manageDisableAuthButtons() {
  const forms = document.querySelectorAll('.auth__form');
  forms.forEach(form => {
    disableButton(form)
    form.addEventListener('input', () => {
      disableButton(form);
    });
    form.addEventListener('change', () => {
      disableButton(form);
    });
  });

  function disableButton(form) {
    const authButton = form.querySelector('.auth__button[type="submit"]');
    const inputs = form.querySelectorAll('.auth__input');
    const submitWrapper = form.querySelector('.auth__submit-wrapper');

    let inputsFilled = true;
    let noErrorInputs = true;

    inputs.forEach(input => {
      if (input.value === '') {
        inputsFilled = false;
      }
      if (input.classList.contains('input--error')) {
        noErrorInputs = false;
      }
    });

    if (!inputsFilled || !noErrorInputs) {
      authButton.disabled = true;
      submitWrapper.classList.add('auth__submit-wrapper--active');
    } else {
      authButton.disabled = false;
      submitWrapper.classList.remove('auth__submit-wrapper--active');
    }
  }
}

function manageClickOnDisabledSubmitButton() {
  const form = document.querySelectorAll('.auth__form');
  form.forEach(item => {
    const submitWrapper = item.querySelector('.auth__submit-wrapper');
    const inputs = item.querySelectorAll('.auth__input');
    submitWrapper.addEventListener('click', () => {
      inputs.forEach(input => {
        if (input.value === '') {
          input.classList.add('input--error');
        }
      });
    });
  });
}

function manageAuthNameInputValidation() {
  const nameInput = document.getElementById('auth_name');
  nameInput.addEventListener('input', () => {
    if (nameInput.value !== '') {
      nameInput.classList.remove('input--error');
    }
  });
}

function manageAuthPassInputValidation() {
  const passInput = document.getElementById('auth_password');
  passInput.addEventListener('input', () => {
    if (passInput.value !== '') {
      passInput.classList.remove('input--error');
    }
  });
}

function manageRegNameInputValidation() {
  const nameInput = document.getElementById('reg_name');
  const parentLabel = nameInput.closest('.auth__input-label');

  const tooltipHTML = parentLabel.querySelector('.input-tooltip');
  const tooltip = manageErrorTooltipCreation();

  nameInput.addEventListener('change', () => {
    if (nameInput.value === '') {
      nameInput.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'name can\'t be empty'
      });
    } else if (nameInput.value.length < 2) {
      nameInput.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'name should be at least 2 characters long'
      });
    } else {
      nameInput.classList.remove('input--error');
      tooltip.remove();
    }
  });

  nameInput.addEventListener('input', () => {
    if (nameInput.value.length >= 2) {
      nameInput.classList.remove('input--error');
      tooltip.remove();
    }
  });
}

function manageRegEmailInputValidation() {
  const emailInput = document.getElementById('reg_email');
  const parentLabel = emailInput.closest('.auth__input-label');

  const tooltipHTML = parentLabel.querySelector('.input-tooltip');
  const tooltip = manageErrorTooltipCreation();

  emailInput.addEventListener('change', () => {
    const emailIsValid = emailInputValidation(emailInput);

    if (emailInput.value === '') {
      emailInput.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'email can\'t be empty'
      });
    } else if (!emailIsValid) {
      emailInput.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'write proper email'
      });
    } else {
      emailInput.classList.remove('input--error');
      tooltip.remove();
    }
  });

  emailInput.addEventListener('input', () => {
    const emailIsValid = emailInputValidation(emailInput);
    if (emailIsValid) {
      emailInput.classList.remove('input--error');
      tooltip.remove();
    }
  });
}

function manageRegPassInputsValidation() {
  const passInput = document.getElementById('reg_password');
  const repeatPassInput = document.getElementById('reg_password_repeat');
  const inputs = [passInput, repeatPassInput];

  inputs.forEach(input => {
    const tooltip = manageErrorTooltipCreation();
    const parentLabel = input.closest('.auth__input-label');
    const tooltipHTML = parentLabel.querySelector('.input-tooltip');

    input.addEventListener('change', () => {
      let onePassIsEmpty = false;

      inputs.forEach(item => {
        if (item.value === '') {
          onePassIsEmpty = true;
        }
      });

      if (!onePassIsEmpty) return;

      if (input.value === '') {
        input.classList.add('input--error');
        manageAddTooltip({
          tooltip: tooltip,
          tooltipHTML: tooltipHTML,
          parentLabel: parentLabel,
          text: 'password can\'t be empty'
        });
      } else if (input.value.length < 9 || input.value.length > 16) {
        input.classList.add('input--error');
        manageAddTooltip({
          tooltip: tooltip,
          tooltipHTML: tooltipHTML,
          parentLabel: parentLabel,
          text: 'password should contain 9 - 16 characters'
        });
      } else {
        input.classList.remove('input--error');
        tooltip.remove();
      }
    });

    input.addEventListener('input', () => {
      let onePassIsEmpty = false;

      inputs.forEach(item => {
        if (item.value === '') {
          onePassIsEmpty = true;
        }
      });

      if (!onePassIsEmpty) return;

      if (input.value.length > 9 && input.value.length < 16) {
        input.classList.remove('input--error');
        tooltip.remove();
      }
    });
  });

  passInput.addEventListener('change', () => {
    checkPasswordsSimilarity(passInput, repeatPassInput);
  });

  repeatPassInput.addEventListener('change', () => {
    checkPasswordsSimilarity(repeatPassInput, passInput);
  });

  passInput.addEventListener('input', checkPasswordsSimilarityOnInput);
  repeatPassInput.addEventListener('input', checkPasswordsSimilarityOnInput);

  function checkPasswordsSimilarity(passToCheck, anotherPass) {
    let onePassIsEmpty = false;

    inputs.forEach(item => {
      if (item.value === '') {
        onePassIsEmpty = true;
      }
    });

    if (onePassIsEmpty) return;

    const tooltip = manageErrorTooltipCreation();
    const parentLabel = passToCheck.closest('.auth__input-label');
    const tooltipHTML = parentLabel.querySelector('.input-tooltip');
    const valuesAreSimilar = passToCheck.value === anotherPass.value;

    if (passToCheck.value.length < 9 || passToCheck.value.length > 16) {
      passToCheck.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'password should contain 9 - 16 characters'
      });
    } else if (!valuesAreSimilar) {
      passToCheck.classList.add('input--error');
      manageAddTooltip({
        tooltip: tooltip,
        tooltipHTML: tooltipHTML,
        parentLabel: parentLabel,
        text: 'passwords should be similar'
      });
    } else {
      passToCheck.classList.remove('input--error');
      tooltip.remove();
    }
  }

  function checkPasswordsSimilarityOnInput() {
    let onePassIsEmpty = false;
    let somePassIsShortOfLogn = false;

    inputs.forEach(item => {
      if (item.value === '') {
        onePassIsEmpty = true;
      }

      if (item.value.length < 9 || item.value.length > 16) {
        somePassIsShortOfLogn = true;
      }
    });

    if (onePassIsEmpty || somePassIsShortOfLogn) return;

    const valuesAreSimilar = passInput.value === repeatPassInput.value;

    if (valuesAreSimilar) {
      inputs.forEach(item => {
        item.classList.remove('input--error');
      });
    } else {
      this.classList.add('input--error');
    }
  }
}

function manageAddTooltip(options) {
  if (!options.tooltipHTML) options.parentLabel.append(options.tooltip);
  const tooltipText = options.tooltip.querySelector('.input-tooltip__text');
  tooltipText.textContent = options.text;

  setTimeout(() => {
    options.tooltip.remove();
  }, 2000);
}
// authorization form validation end
// ===================================



// ================================
// notifications on sell page start
function manageSellNotifications(options) {
  let notificationsWrapper = document.querySelector('.notifications-wrapper');
  if (!notificationsWrapper) {
    notificationsWrapper = createWrapper();
    document.body.append(notificationsWrapper);
  }

  setWrapperHeight();
  const initialTime = options.timeInSeconds;

  const notificationBlock = createNotification();
  notificationsWrapper.prepend(notificationBlock);

  manageNotificationWrapperGrabScroll(notificationsWrapper);

  const timer = notificationBlock.querySelector('.notification__timer');
  const intervalID = updateCountdown(timer);

  const closeButton = notificationBlock.querySelector('.notification__close');
  closeButton.addEventListener('click', () => {
    removeNotification(notificationBlock, intervalID);
  });

  function createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'notifications-wrapper';
    return wrapper;
  }

  function createNotification() {
    const notification = document.createElement('section');
    notification.className = 'notification';
    notification.innerHTML = `<div class="notification__inner loader">
                                <div class="notification__header">
                                  <h2 class="notification__title">${options.title}</h2>
                                  <div class="notification__timer">${countdown(options.timeInSeconds)}</div>
                                  <button class="notification__close" type="button">
                                    <span class="visually-hidden">Close notification</span>
                                  </button>
                                </div>
                                <div class="notification__body">
                                  <div class="notification__image-wrapper">
                                    <img 
                                      class="notification__image" 
                                      width="47" 
                                      height="30" 
                                      src="${options.imagePath}"  
                                      srcset="${options.imagePath2x} 2x,
                                              ${options.imagePath3x} 3x"
                                      sizes="47px" 
                                      alt="">
                                  </div>
                                  <div class="notification__info">
                                    <p class="notification__text">${options.text}</p>
                                    <div class="notification__id">
                                      Trade ID:
                                      <span>${options.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
    return notification;
  }

  function countdown(time) {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = time % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  function updateCountdown(timerHTML) {
    countdownActions(timerHTML);
    const intervalID = setInterval(() => {
      countdownActions(timerHTML);
      if (options.timeInSeconds < 0) {
        removeNotification(notificationBlock, intervalID);
      }
    }, 1000);

    return intervalID;
  }

  function countdownActions(timerHTML) {
    timerHTML.innerHTML = countdown(options.timeInSeconds);

    const timeLeft = ((options.timeInSeconds - 1) * 100) / (initialTime - 1);
    notificationBlock.style.setProperty('--timer-line', `${timeLeft}%`);

    if (options.timeInSeconds <= initialTime / 2) {
      notificationBlock.classList.add('notification--half-time-left');
    } else {
      notificationBlock.classList.remove('notification--half-time-left');
    }

    options.timeInSeconds--;
  }

  function setWrapperHeight() {
    const browserHeight = document.documentElement.clientHeight;
    const wrapperHeight = notificationsWrapper.scrollHeight;

    if (wrapperHeight > browserHeight) {
      notificationsWrapper.classList.add('notifications-wrapper--full-height')
    } else {
      notificationsWrapper.classList.remove('notifications-wrapper--full-height')
    }
  }

  function removeNotification(notification, intervalID) {
    notification.classList.add('notification--removed');
    setTimeout(() => {
      notification.remove();

      const allNotifications = document.querySelectorAll('.notification');
      if (allNotifications.length === 0) {
        notificationsWrapper.remove();
      }
      clearInterval(intervalID);
      setWrapperHeight();
    }, 500);
  }
}

function manageNotificationWrapperGrabScroll(wrapper) {
  wrapper.addEventListener('mousedown', event => {
    event.preventDefault();
    wrapper.style.userSelect = 'none';

    wrapperPosition = {
      top: wrapper.scrollTop,
      y: event.clientY,
    }

    function mouseMoveHandler(event) {
      const dy = event.clientY - wrapperPosition.y;
      wrapper.scrollTop = wrapperPosition.top - dy;
    };

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
}

function manageNotificationWrapperHeight() {
  const wrapper = document.querySelector('.notifications-wrapper');

  if (!wrapper) return;

  const browserHeight = document.documentElement.clientHeight;
  const wrapperHeight = wrapper.scrollHeight;

  if (wrapperHeight > browserHeight) {
    wrapper.classList.add('notifications-wrapper--full-height')
  } else {
    wrapper.classList.remove('notifications-wrapper--full-height')
  }
}
// notifications on sell page end
// ================================



// ======================
// sell items start
manageItemsSell();

function manageItemsSell() {
  manageSellForm();
  manageSellItemsPriceAndAmount();
  manageSellItemsPlaceholder();
  manageItemMoveOnSell();
}

function manageSellForm() {
  const sellForm = document.querySelectorAll('.sell-form');
  if (sellForm.length === 0) return;

  sellForm.forEach(form => {
    const parentItem = form.closest('.item');
    const sellPriceInput = form.querySelector('.sell-form__price-input');
    const getInput = form.querySelector('.sell-form__get-input');
    const inputs = [sellPriceInput, getInput];
    const button = form.querySelector('.sell-form__button');

    const formParentRow = form.closest('.modal-item__info-row');
    const comission = formParentRow.querySelector('.comission').textContent.trim();
    const comissionPercent = Number(comission.slice(0, comission.indexOf('%'))) / 100;


    sellPriceInput.addEventListener('input', () => {
      const priceValue = Number(sellPriceInput.value.trim());
      let getValue = priceValue * (1 - comissionPercent);

      const getValueIsFloat = String(getValue).includes('.');
      if (getValueIsFloat) {
        getValue = getValue.toFixed(2);
      }

      getInput.value = getValue;
      if (sellPriceInput.value === '') {
        getInput.value = '';
      }
    });

    getInput.addEventListener('input', () => {
      const getValue = Number(getInput.value.trim());
      let priceValue = getValue / (1 - comissionPercent);

      const priceIsFloat = String(priceValue).includes('.');
      if (priceIsFloat) {
        priceValue = priceValue.toFixed(2);
      }

      sellPriceInput.value = priceValue;
      if (getInput.value === '') {
        sellPriceInput.value = '';
      }
    });

    if (parentItem.classList.contains('item--to-sell')) {
      button.disabled = true;
      button.textContent = 'save';
      let emptyInputs = false;

      const priceValue = sellPriceInput.value.trim();
      const getValue = getInput.value.trim();

      form.addEventListener('input', () => {
        inputs.forEach(input => {
          emptyInputs = input.value === '';
        });

        if (sellPriceInput.value === priceValue ||
          getInput.value === getValue ||
          emptyInputs) {
          button.disabled = true;
        } else {
          button.disabled = false;
        }
      });

      form.removeEventListener('input', disableButton);
    } else {
      disableButton();
      button.textContent = 'sell';
      form.addEventListener('input', disableButton);
    }

    function disableButton() {
      const priceIsEmpty = sellPriceInput.value === '';
      const getIsEmpty = getInput.value === '';
      if (priceIsEmpty || getIsEmpty) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
  });
}

function manageSellItemsPlaceholder() {
  const sections = document.querySelectorAll('.sell-page__section');
  if (sections.length === 0) return;
  sections.forEach(section => {
    const sectionBody = section.querySelector('.sell-page__section-body');
    const sectionList = section.querySelector('.sell-page__items');
    const sectionListHeight = sectionList.getBoundingClientRect().height;

    const placeholder = section.querySelector('.sell-page__section-placeholder');
    const items = section.querySelectorAll('.item');
    const itemsArray = Array.from(items);
    const notMovingItems = itemsArray.filter(item => !item.classList.contains('item--moving'));

    if (notMovingItems.length === 0) {
      placeholder.classList.add('sell-page__section-placeholder--active');
      sectionBody.style.minHeight = '200px';
    } else {
      placeholder.classList.remove('sell-page__section-placeholder--active');
      sectionBody.style.minHeight = `${sectionListHeight}px`;
      setTimeout(() => {
        sectionBody.style.minHeight = 'unset';
      }, 300);
    }
  });
}

function manageSellItemsPriceAndAmount() {
  let itemsPrice = 0;
  let itemsAmount = 0;

  const sellCart = document.querySelector('.sell-page__cart');
  if (!sellCart) return;

  const amountHTML = sellCart.querySelector('.items-amount');
  const sumHTML = sellCart.querySelector('.items-price');

  if (!isNaN(getItemPrice(sumHTML)) && getItemPrice(sumHTML) > 0) {
    itemsPrice = getItemPrice(sumHTML);
  }

  const amountInHTML = Number(amountHTML.textContent.trim());
  if (!isNaN(amountInHTML) && amountInHTML > 0) {
    itemsAmount = amountInHTML;
  }

  const itemsToSell = document.querySelectorAll('.item--to-sell');
  itemsAmount = itemsToSell.length;

  let sellItemsTotalPrice = 0
  itemsToSell.forEach(item => {
    let itemPriceValue = Number(item.querySelector('.sell-form__price-input').value.trim());
    if (itemPriceValue === 0 || isNaN(itemPriceValue)) {
      itemPriceValue = 0;
    }
    sellItemsTotalPrice += itemPriceValue;
  });

  itemsPrice = sellItemsTotalPrice;
  itemsPrice = managePriceFormat(itemsPrice);
  itemsPrice = itemsPrice.slice(0, itemsPrice.length - 1).trim();
  amountHTML.textContent = itemsAmount;

  if (sellItemsTotalPrice === 0) {
    sumHTML.textContent = '$ 0';
  } else {
    sumHTML.textContent = itemsPrice;
  }
}

function manageOnSellTime(itemID, timeSinceOnSell = new Date()) {
  const onSellTime = timeSinceOnSell.getTime();

  const item = document.getElementById(itemID);
  if (!item) return;

  const itemContent = item.querySelector('.item__content');
  let itemTimeHTML = item.querySelector('.item__on-sell-time');

  if (!itemTimeHTML) {
    itemTimeHTML = addOnSellTimeHTML();
    itemContent.prepend(itemTimeHTML);
  }

  let intervalID;
  countTime();

  function countTime() {
    showTime()
    intervalID = setInterval(showTime, 1000);

    function showTime() {
      const currentTime = Date.now();
      const diff = currentTime - onSellTime;

      const oneDay = 24 * 60 * 60 * 1000;
      const oneHour = 60 * 60 * 1000;
      const oneMin = 60 * 1000;

      const days = Math.floor(diff / oneDay);
      const hours = addZero(Math.floor((diff % oneDay) / oneHour));
      const minutes = addZero(Math.floor((diff % oneHour) / oneMin));

      let time = '';

      if (days === 0) {
        time = `${hours}:${minutes}`;
      } else {
        time = `${days}d ${hours}:${minutes}`;
      }

      itemTimeHTML.textContent = time;
    }
  }

  function addOnSellTimeHTML() {
    const timeHTML = document.createElement('span');
    timeHTML.className = 'item__on-sell-time';
    return timeHTML;
  }

  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  return intervalID;
}

function manageItemConfirmOverlay(options) {
  const item = document.querySelector(`#${options.itemID}`);
  if (!item) return;
  item.classList.add('item--confirm-sell');

  const itemInner = item.querySelector('.item__inner');
  const initialTime = options.timeInSeconds;
  let overlayHTML = item.querySelector('.confirm-sell');

  if (!overlayHTML) {
    overlayHTML = createConfirmOverlay();
    itemInner.prepend(overlayHTML);
  }

  const timerHTML = overlayHTML.querySelector('.confirm-sell__timer');
  updateCountdown(timerHTML);

  function createConfirmOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-sell loader';
    overlay.innerHTML = `<p class="confirm-sell__text">${options.text}</p>
                          <span class="confirm-sell__id">${options.tradeID}</span>
                          <span class="confirm-sell__timer">${options.timeInSeconds}</span>
                        </p>`;
    return overlay;
  }

  function countdown(time) {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = time % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  function updateCountdown(timerHTML) {
    countdownActions(timerHTML);

    const intervalID = setInterval(() => {
      countdownActions(timerHTML);
      if (options.timeInSeconds < 0) {
        removeOverlay(overlayHTML, intervalID);

        // for presentation
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
          item.classList.add('item--confirm-time-expred');
        } else {
          item.classList.add('item--confirm-success');
        }
        // ================

        return false;
      }
    }, 1000);
  }

  function countdownActions(timerHTML) {
    timerHTML.innerHTML = countdown(options.timeInSeconds);

    const timeLeft = ((options.timeInSeconds - 1) * 100) / (initialTime - 1);
    overlayHTML.style.setProperty('--timer-line', `${timeLeft}%`);

    if (options.timeInSeconds <= initialTime / 2) {
      overlayHTML.classList.add('confirm-sell--half-time');
    } else {
      overlayHTML.classList.remove('confirm-sell--half-time');
    }

    options.timeInSeconds--;
  }

  function removeOverlay(overlayHTML, intervalID) {
    item.classList.remove('item--confirm-sell');
    overlayHTML.remove();
    clearInterval(intervalID);
  }
}

function manageItemMoveOnSell() {
  const items = document.querySelectorAll('.stash__item');
  const sellSection = document.querySelector('.items-sell');
  const sellList = document.querySelector('.items-sell__items');
  const stash = document.querySelector('.stash');
  const stashList = document.querySelector('.stash__items');

  if (items.length === 0) return;
  let intervalID;

  items.forEach((item, index) => {
    const sellButton = item.querySelector('.sell-form__button');
    const cancelButton = item.querySelector('.cancel-sell');

    sellButton.addEventListener('click', () => {
      if (item.classList.contains('item--to-sell')) return;

      const placeholder = sellSection.querySelector('.sell-page__section-placeholder');
      placeholder.classList.remove('sell-page__section-placeholder--active');
      item.classList.add('item--to-sell');

      const plusOneListRow = moveItem(item, sellList);
      manageSectionHeight(stashList);
      manageListHeight(sellList);
      intervalID = manageOnSellTime(item.id);
      manageSellForm();

      // =============================
      const isMobile = manageGetScreenWidth() <= 600;
      if (!isMobile) {
        const itemsMatrix = manageGetItemsMatrix(item, stashList);
        manageItemsChangeRow(itemsMatrix, item, stashList, plusOneListRow);
      }
      // =============================
    });

    cancelButton.addEventListener('click', () => {
      const placeholder = stash.querySelector('.sell-page__section-placeholder');
      placeholder.classList.remove('sell-page__section-placeholder--active');
      item.classList.remove('item--to-sell');

      const plusOneListRow = moveItem(item, stashList);
      manageSectionHeight(sellList);
      manageListHeight(stashList);
      manageSellForm();
      clearInterval(intervalID);

      // =============================
      const isMobile = manageGetScreenWidth() <= 600;
      if (!isMobile) {
        const itemsMatrix = manageGetItemsMatrix(item, sellList);
        manageItemsChangeRow(itemsMatrix, item, sellList, plusOneListRow);
      }
      // =============================

      const onSellTimeHTML = item.querySelector('.item__on-sell-time');
      onSellTimeHTML.remove();

      const itemForm = item.querySelector('.sell-form');
      const sellButton = itemForm.querySelector('.sell-form__button');
      const sellInputs = itemForm.querySelectorAll('.small-form__input');
      sellInputs.forEach(input => input.value = '');
      sellButton.disabled = true;
    });
  });

  function moveItem(item, list) {
    manageSellItemsPriceAndAmount();
    manageModalClose();

    const isMobile = manageGetScreenWidth() <= 600;
    if (isMobile) {
      item.remove();
      list.append(item);

    } else {
      const itemWidth = item.getBoundingClientRect().width;
      const itemHeight = item.getBoundingClientRect().height;
      let plusOneRow = false;

      let x = 0;
      let y = 0;

      const listHeight = list.getBoundingClientRect().height;
      const itemsInList = list.querySelectorAll('.item');
      const listRightSide = manageGetElementCoords(list).right;
      const listLeftSide = manageGetElementCoords(list).left;

      if (itemsInList.length === 0) {
        x = listLeftSide;
        y = manageGetElementCoords(list).top;
      } else {
        const lastItemOnSell = itemsInList[itemsInList.length - 1];
        const lastItemWidth = lastItemOnSell.getBoundingClientRect().width;
        x = manageGetElementCoords(lastItemOnSell).left + lastItemWidth + 10;
        y = manageGetElementCoords(lastItemOnSell).top;
      }

      if (x > listRightSide - itemWidth) {
        x = listLeftSide;
        y = y + itemHeight + 10;
        plusOneRow = true;
      }

      list.style.height = `${listHeight}px`;
      const currentX = manageGetElementCoords(item).left;
      const currentY = manageGetElementCoords(item).top;

      item.style.left = `${currentX}px`;
      item.style.top = `${currentY}px`;
      item.style.position = 'absolute';
      item.style.width = `${itemWidth}px`;

      const placeholder = manageItemPlaceholder(item);
      item.insertAdjacentElement('beforebegin', placeholder);

      const isStashList = list.classList.contains('stash__items');
      const sellListMatrix = manageGetItemsMatrix(item, sellList);

      if (isStashList && sellListMatrix.length > 1) {
        let oneItemLeftInLastRow = false;
        sellListMatrix.forEach((array, index) => {
          if (index === sellListMatrix.length - 1) {
            oneItemLeftInLastRow = array.length === 1;
          }
        });

        if (oneItemLeftInLastRow) {
          y = y - itemHeight - 10;
        }
      }

      setTimeout(() => {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.classList.add('item--moving');
        if (plusOneRow) {
          list.style.height = `${listHeight + itemHeight + 10}px`;
        }

        placeholder.style.width = '0';
        placeholder.style.height = '0';
        placeholder.style.margin = '0';
      }, 200);

      setTimeout(() => {
        item.remove();
        list.append(item);
        item.removeAttribute('style');
        list.removeAttribute('style');
        item.classList.remove('item--moving');
        placeholder.remove();
        manageSellItemsPlaceholder();
      }, 900);

      return plusOneRow;
    }
  }
}

// ================================
function manageGetItemsMatrix(item, list) {
  const itemWidth = Math.round(item.getBoundingClientRect().width + 10);
  const listWidth = Math.round(list.getBoundingClientRect().width);
  const itemsInRow = Math.round(listWidth / itemWidth);

  const itemsInList = list.querySelectorAll('.item');
  const itemsIndexes = [];
  const matrix = [];

  itemsInList.forEach((listItem, index) => {
    itemsIndexes.push(index);
  });

  for (let i = 0; i < Math.ceil(itemsIndexes.length / itemsInRow); i++) {
    matrix[i] = itemsIndexes.slice((i * itemsInRow), (i * itemsInRow) + itemsInRow);
  }

  return matrix;
}

function manageItemsChangeRow(matrix, item, list, plusOneListRow) {
  const isStashList = list.classList.contains('stash__items');
  const listItems = list.querySelectorAll('.item');
  const sellList = document.querySelector('.items-sell__items');
  const sellListItems = sellList.querySelectorAll('.item');

  let rowNum = '';
  let itemIndex = '';

  listItems.forEach((listItem, listItemIndex) => {
    if (item === listItem) {
      itemIndex = listItemIndex;
    }
  });

  matrix.forEach((array, arrayIndex) => {
    if (array.includes(itemIndex)) {
      rowNum = arrayIndex;
    }
  });

  const itemsWillMoveVertically = [];
  const itemsWillMoveHorizontally = [];

  matrix.forEach((array, arrayIndex) => {
    if ((arrayIndex >= rowNum) && (arrayIndex !== matrix.length - 1)) {
      itemsWillMoveHorizontally.push(array[array.length - 1]);
    }

    if (arrayIndex > rowNum) {
      itemsWillMoveVertically.push(array[0]);
    }
  });

  itemsWillMoveVertically.forEach((itemIndex, indexOfIndex) => {
    const verticalMovingItem = listItems[itemIndex];
    const horizontalMovingItem = listItems[itemsWillMoveHorizontally[indexOfIndex]];

    const verticalMovingItemWidth = verticalMovingItem.getBoundingClientRect().width;

    const currentX = manageGetElementCoords(verticalMovingItem).left;
    const currentY = manageGetElementCoords(verticalMovingItem).top;

    verticalMovingItem.style.left = `${currentX}px`;
    verticalMovingItem.style.top = `${currentY}px`;
    verticalMovingItem.style.position = 'absolute';
    verticalMovingItem.style.width = `${verticalMovingItemWidth}px`;

    const verticalPlaceholder = manageItemPlaceholder(verticalMovingItem);
    verticalMovingItem.insertAdjacentElement('beforebegin', verticalPlaceholder);

    let x = manageGetElementCoords(horizontalMovingItem).left;
    let y = manageGetElementCoords(horizontalMovingItem).top;

    if (plusOneListRow && isStashList) {
      y = y + verticalMovingItemWidth + 10;
    }

    const horizontalPlaceholder = manageItemPlaceholder(horizontalMovingItem);
    horizontalMovingItem.insertAdjacentElement('afterend', horizontalPlaceholder);

    horizontalPlaceholder.style.width = '0';
    horizontalPlaceholder.style.height = '0';
    horizontalPlaceholder.style.margin = '0';

    setTimeout(() => {
      verticalMovingItem.style.left = `${x}px`;
      verticalMovingItem.style.top = `${y}px`;
      verticalMovingItem.style.opacity = '0';
      verticalMovingItem.classList.add('item--moving');

      verticalPlaceholder.style.width = '0';
      verticalPlaceholder.style.height = '0';
      verticalPlaceholder.style.margin = '0';

      horizontalPlaceholder.style = '';
    }, 200);

    setTimeout(() => {
      if ((sellListItems.length === 0) && isStashList) {
        y = manageGetElementCoords(horizontalMovingItem).top;

        verticalMovingItem.style.top = `${y}px`;
      }
    }, 450);

    setTimeout(() => {
      verticalMovingItem.style.opacity = '1';
    }, 600);

    setTimeout(() => {
      verticalMovingItem.removeAttribute('style');
      verticalMovingItem.classList.remove('item--moving');
      verticalPlaceholder.remove();
      horizontalPlaceholder.remove();
    }, 900);
  });
}
// ================================

function manageGetScreenWidth() {
  const width = document.documentElement.clientWidth;
  return width;
}

function manageGetElementCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  }
}

function manageItemPlaceholder(item) {
  const block = document.createElement('li');
  block.className = 'item-placeholder';
  block.style.height = `${item.getBoundingClientRect().height}px`;
  return block;
}

function manageListHeight(list) {
  const listHeight = list.getBoundingClientRect().height;
  let itemsInOtherList = '';

  const stashList = document.querySelector('.stash__items');
  const sellList = document.querySelector('.items-sell__items');

  const isStashList = list.classList.contains('stash__items');
  const isSellList = list.classList.contains('items-sell__items');

  if (isStashList) {
    itemsInOtherList = sellList.querySelectorAll('.item');
  } else if (isSellList) {
    itemsInOtherList = stashList.querySelectorAll('.item');
  }

  let itemHeight = 0;
  itemsInOtherList.forEach(item => itemHeight = item.getBoundingClientRect().height + 10);

  if (listHeight < 100) {
    list.style.height = `${itemHeight}px`;
    setTimeout(() => {
      list.style.height = `auto`;
    }, 900);
  }
}

function manageSectionHeight(list) {
  const sectionBody = list.closest('.sell-page__section-body');
  const items = list.querySelectorAll('.item');
  const listHeight = list.getBoundingClientRect().height;

  if (items.length === 1) {
    sectionBody.style.minHeight = `${listHeight}px`;
    list.style.height = `${listHeight}px`;
    setTimeout(() => {
      list.style.height = `auto`;
    }, 900);
  }
}
// sell items end
// =====================



// =====================
// chart start
const testChartData = [
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
  { date: new Date('2025-06-01T14:22'), value: 10765.12 },
  { date: new Date('2025-06-15T14:22'), value: 10700.12 },
  { date: new Date('2025-07-01T14:22'), value: 10765.12 },
  { date: new Date('2025-07-01T14:22'), value: 10765.12 },
  { date: new Date('2025-07-15T14:22'), value: 10700.12 },
  { date: new Date('2025-08-01T14:22'), value: 10750.12 },
  { date: new Date('2025-08-15T14:22'), value: 10765.12 },
  { date: new Date('2025-09-01T14:22'), value: 10770.12 },
  { date: new Date('2025-09-15T14:22'), value: 10755.12 },
  { date: new Date('2025-10-01T14:22'), value: 10775.12 },
  { date: new Date('2025-10-15T14:22'), value: 10780.12 },
  { date: new Date('2025-11-01T14:22'), value: 10765.12 },
  { date: new Date('2025-11-15T14:22'), value: 10700.12 },
  { date: new Date('2025-12-01T14:22'), value: 10750.12 },
  { date: new Date('2025-12-15T14:22'), value: 10765.12 },
]

function manageChartResize(container, chartData) {
  const chart = container.querySelector('svg')
  const tooltip = container.querySelector('.tooltip')
  const tooltipCircle = container.querySelector('.tooltip-circle')

  if (chart) {
    chart.remove();
    tooltip.remove();
    tooltipCircle.remove();
    manageChartCreation(`#${container.id}`, chartData);
  }
}

function manageChartCreation(parentContainerID, chartData) {
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

  const container = document.querySelector(parentContainerID)
  const containerWidth = container.getBoundingClientRect().width;
  const containerHeight = container.getBoundingClientRect().height;

  const margin = { top: 30, right: 12, bottom: 70, left: 60 };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .range([20, width - margin.right]);

  const y = d3.scaleLinear()
    .range([height - 20, 0]);

  const svg = d3.select(parentContainerID)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = d3.select(parentContainerID)
    .append('div')
    .attr('class', 'tooltip');

  minX = d3.min(chartData, d => d.date);
  maxX = d3.max(chartData, d => d.date);

  minY = d3.min(chartData, d => d.value);
  maxY = d3.max(chartData, d => d.value);

  function addDate(min, max) {
    let diff = 0;
    const d1 = new Date(min.getFullYear(), min.getMonth(), (min.getDate() - diff));
    const d2 = new Date(max.getFullYear(), max.getMonth(), (max.getDate() + diff));

    const t1 = d1.getTime();
    const t2 = d2.getTime();

    diff = (t2 - t1) * 1000;
    if (diff > 30 * 24 * 3600) {
      d1.setDate(1);
      d2.setDate(1);
      d2.setMonth(d2.getMonth() + 1);
    }

    return [d1, d2];
  }

  function addPrice(s, e, percentage) {
    let diff = Math.ceil((e - s) * percentage / 100);
    if (diff < 8) {
      diff = 8;
    }
    const min = s - diff;
    const max = e + diff;

    return [min, max];
  }

  x.domain(addDate(minX, maxX));
  y.domain(addPrice(minY, maxY, 10));

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

  d3.select(`${parentContainerID} defs`)
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

  d3.select(`${parentContainerID} defs`)
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


  const xAxisArrow = d3.select(`${parentContainerID} #arrowhead-right`)
    .append('path')
    .attr('d', 'M2.222,4.809 C3.859,4.074 6.995,3.011 6.1000,2.539 C6.857,2.198 6.395,2.107 6.005,1.926 C5.164,1.537 4.324,1.149 3.483,0.761 C3.117,0.592 2.676,0.413 2.222,0.239 C1.074,-0.224 0.035,0.062 0.072,0.454 C0.108,0.820 0.598,0.912 1.001,1.098 C1.687,1.415 2.354,1.740 3.058,2.049 C3.412,2.204 3.833,2.307 3.987,2.478 C3.802,2.715 3.157,2.892 2.793,3.061 C1.863,3.490 0.411,4.030 0.072,4.379 C-0.355,4.949 1.346,5.187 2.222,4.809 Z')
    .attr('fill', '#373740')
    .attr('fill-rule', 'evenodd')
    .style('transform', 'translate(15px, -2.5px)');


  d3.select(`${parentContainerID} defs`)
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

  const yAxisArrow = d3.select(`${parentContainerID} #arrowhead-top`)
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
      .ticks(width < 600 ? 6 : 15)
      .tickFormat(d => {
        const year = d.getFullYear();
        let month = d.getMonth();
        month = months[month];
        const day = d.getDate();
        if (day === 1 && month === 'jan') {
          return year;
        } else {
          return `${day}, ${month} `;
        }
      }));

  svg.append("g")
    .call(d3.axisLeft(y)
      .ticks(chartData.forEach(d => d.value))
      .tickSizeOuter(0)
      .ticks(width < 600 ? 2 : 4)
      .tickFormat(d => {
        return `$${Number(d.toFixed(0)).toLocaleString('ru-RU')} `;
      }))
    .attr('class', 'price-axis');

  const dateDomain = d3.select(`${parentContainerID} .date-axis path.domain`)
    .attr('marker-start', 'url(#dashedBorder)')
    .attr('marker-end', 'url(#arrowhead-right)');

  const priceDomain = d3.select(`${parentContainerID} .price-axis path.domain`)
    .attr('marker-start', 'url(#dashedBorder)')
    .attr('marker-end', 'url(#arrowhead-top)');

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  svg.append('path')
    .datum(chartData)
    .attr('fill', 'none')
    .attr('stroke', '#5b3889')
    .attr('stroke-width', 2)
    .attr('marker-start', 'url(#lineCircle)')
    .attr('marker-end', 'url(#lineCircle)')
    .attr('d', line)
    .attr('class', 'line');

  const circle = d3.select(parentContainerID)
    .append('span')
    .attr('class', 'tooltip-circle');

  const listeningRect = svg.append('rect')
    .attr('width', width)
    .attr('height', height);

  listeningRect.on("mousemove", function (event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(chartData, x0, 1);
    const d0 = chartData[i - 1];
    const d1 = chartData[i];
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
      .html(`<span> $${d.value !== undefined ? d.value.toFixed(2) : 'N/A'}</span >
  <span>${addZero(d.date.getHours())}:${addZero(d.date.getMinutes())},${months[d.date.getMonth()]},${d.date.getFullYear()}</span>`);

    if (width - xPos < 120) {
      tooltip.style('transform', `translate(${xPos - 40}px, ${yPos + 16}px)`);
    }

  });

  listeningRect.on("mouseleave", function () {
    circle.style('display', 'none');
    tooltip.style('display', 'none');
  });

  function addZero(value) {
    value = String(value);
    if (value.length < 2) {
      return `0${value} `;
    } else {
      return value;
    }
  }
}
// chart end
// =====================