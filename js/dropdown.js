class Dropdown {
  constructor(targetID) {
    this.selector = targetID;
    this.target = document.querySelector(this.selector);

    this.button = this.target.querySelector('.dropdown__button');
    this.buttonText = this.target.querySelector('.dropdown__text');
    this.textWrapper = this.target.querySelector('.dropdown__text-wrapper');
    this.listWrapper = this.target.querySelector('.dropdown__list-wrapper');
    this.list = this.target.querySelector('.dropdown__list');
    this.listButton = this.target.querySelectorAll('.dropdown__list-button');
    this.input = this.target.querySelector('.dropdown__input');
  }

  start() {
    const activeItem = this.target.querySelector('.dropdown__list-button--active');
    if (activeItem) {
      this.activateItem();
    } else {
      this.listButton[0].classList.add('dropdown__list-button--active');
      this.activateItem();
    }

    this.button.addEventListener('click', () => {
      this.toggleList();
      this.arrowToggle();
    });

    this.list.addEventListener('click', event => {
      const { target } = event;
      if (target.classList.contains('dropdown__list-button')) {
        this.arrowToggle();
      }
      this.selectActiveItem(event);
    });

    document.addEventListener('click', event => {
      const { target } = event;
      const isDropdown = Boolean(target.closest(this.selector));
      if (!isDropdown) {
        this.removeActiveStateOfList();
        this.arrowToggle();
      }
    });
  }

  toggleList() {
    if (this.listButton.length < 2) return;

    const listWrapperHeight = this.listWrapper.getBoundingClientRect().height;
    const listHeight = this.list.getBoundingClientRect().height;

    this.removeActiveStateOfList();

    if (listWrapperHeight === 0) {
      this.setOpenListPosition();
      this.listWrapper.style.height = `${listHeight}px`;
      this.listAndButtonGrowWidth();
    }
  }

  arrowToggle() {
    const isOpened = this.target.classList.contains('dropdown--open-top') ||
                     this.target.classList.contains('dropdown--open-bottom');

    if (isOpened) {
      this.target.classList.add('dropdown--open');
    } else {
      this.target.classList.remove('dropdown--open');
    }
  }

  listAndButtonGrowWidth() {
    const arrayOfListElementsWidth = [];
    this.listButton.forEach(item => arrayOfListElementsWidth.push(item.getBoundingClientRect().width));
    const maxListElementWidth = Math.max(...arrayOfListElementsWidth);
    const buttonWidth = this.textWrapper.getBoundingClientRect().width;
    const maxWidth = Math.max(maxListElementWidth, buttonWidth);

    this.button.style.width = `${maxWidth}px`;
    this.list.style.width = `${maxWidth}px`;
  }

  listAndButtonShrinkWidth() {
    const buttonWidth = this.textWrapper.getBoundingClientRect().width;
    this.button.style.width = `${buttonWidth}px`;
    this.list.style.width = `${buttonWidth}px`;
  }

  setOpenListPosition() {
    const listDistanceToBottom = this.list.getBoundingClientRect().bottom;
    const windowHeight = document.documentElement.clientHeight;

    if (listDistanceToBottom > windowHeight - 10) {
      this.listWrapper.style.top = 'auto';
      this.listWrapper.style.bottom = '50%';
      this.target.classList.add('dropdown--open-top');

    } else {
      this.listWrapper.style.bottom = 'auto';
      this.listWrapper.style.top = '50%';
      this.target.classList.add('dropdown--open-bottom');
    }
  }

  selectActiveItem(event) {
    const { target } = event;
    const closestListButton = target.closest('.dropdown__list-button');
    if (!closestListButton) return;

    this.listButton.forEach(item => item.classList.remove('dropdown__list-button--active'));
    closestListButton.classList.add('dropdown__list-button--active');
    this.activateItem();
    this.removeActiveStateOfList();
    this.target.classList.remove('dropdown--open');
  }

  activateItem() {
    const activeListButton = this.target.querySelector('.dropdown__list-button--active');
    const activeButtonText = activeListButton.textContent.trim();

    this.buttonText.textContent = activeButtonText;
    if (this.input) this.addItemValueToInput(activeButtonText);
    this.removeActiveItemFromList();
  }

  addItemValueToInput(value) {
    this.input.value = value;
  }

  removeActiveItemFromList() {
    const textInButton = this.buttonText.textContent.trim();
    let activeButton = '';

    this.listButton.forEach(button => {
      const parentItem = button.closest('.dropdown__item');
      parentItem.hidden = false;

      if (button.textContent.trim() === textInButton) {
        activeButton = button;
      }
    });

    const activeButtonParent = activeButton.closest('.dropdown__item');
    activeButtonParent.hidden = true;
  }

  removeActiveStateOfList() {
    this.listAndButtonShrinkWidth();
    this.listWrapper.style.height = '0';
    this.target.classList.remove('dropdown--open-top');
    this.target.classList.remove('dropdown--open-bottom');
  }
}