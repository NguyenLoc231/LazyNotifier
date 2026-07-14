const scheduleRowContainer = document.getElementById('schedule-row-container');

let rowCounter = 0;

function createScheduleRowColorDisplay(){
  const scheduleRowColorDisplay = document.createElement('button');
  scheduleRowColorDisplay.type = 'button';
  scheduleRowColorDisplay.classList.add('schedule-row__color-display');
  scheduleRowColorDisplay.addEventListener('click', openScheduleRowColorDropdown);

  return scheduleRowColorDisplay;
}

function createScheduleRowColorDropdown(){
  const scheduleRowColorDropdown = document.createElement('div');
  scheduleRowColorDropdown.classList.add('schedule-row__color-dropdown');
  const rowColor = [{name: 'WHITE', color: '#FAFAFA'}, {name: 'YELLOW', color: '#FFD700'}, {name: 'RED', color: '#FF1744'}];
  for (const item of rowColor){
    const scheduleRowColorButton = document.createElement('button');
    scheduleRowColorButton.type = 'button';
    scheduleRowColorButton.dataset.color = item.color;
    scheduleRowColorButton.textContent = item.name;
    scheduleRowColorButton.addEventListener('click', takeScheduleColor);
    scheduleRowColorDropdown.appendChild(scheduleRowColorButton);
  }

  return scheduleRowColorDropdown;
}

function openScheduleRowColorDropdown(event){
  const colorDropdown = event.target.closest('.schedule-row__color').querySelector('.schedule-row__color-dropdown');
  colorDropdown.classList.toggle('schedule-row__color-dropdown--open');
}

function takeScheduleColor(event){
  const scheduleRowColorDisplay = event.target.closest('.schedule-row__color').querySelector('.schedule-row__color-display')
  const color = event.target.dataset.color;
  scheduleRowColorDisplay.style.backgroundColor = color;
}

function createScheduleRowColor(){
  const scheduleRowColor = document.createElement('div');
  scheduleRowColor.classList.add('schedule-row__color');
  scheduleRowColor.appendChild(createScheduleRowColorDisplay());
  scheduleRowColor.appendChild(createScheduleRowColorDropdown());

  return scheduleRowColor;
}

function createScheduleRowContent(){
  const newRowContent = document.createElement('input');
  newRowContent.classList.add('schedule-row__content');
  newRowContent.setAttribute('type', 'text');
  newRowContent.placeholder = 'Nhập nội dung';
  return newRowContent;
}

function createScheduleRowTime(){
  const newScheduleRowTime = document.createElement('input');
  newScheduleRowTime.classList.add('schedule-row__time');
  newScheduleRowTime.type = 'text';
  newScheduleRowTime.placeholder = '10h37';
  newScheduleRowTime.addEventListener('focus', function() {
    this.type='time';
    this.classList.add('schedule-row__time-onfocus');
  });
  newScheduleRowTime.addEventListener('blur', function() {
    this.type='text';
    this.classList.remove('schedule-row__time-onfocus');
  });
  return newScheduleRowTime;
}

function createScheduleRowDate(){
  const newScheduleRowDate = document.createElement('input');
  newScheduleRowDate.classList.add('schedule-row__date');
  newScheduleRowDate.type = 'text';
  newScheduleRowDate.placeholder = '10/07/2026';
  newScheduleRowDate.addEventListener('focus', function() {
    this.type='date';
    this.classList.add('schedule-row__date-onfocus');
  });
  newScheduleRowDate.addEventListener('blur', function() {
    this.type='text';
    this.classList.remove('schedule-row__date-onfocus');
  });
  return newScheduleRowDate;
}

function createScheduleRowNotify(){
  const newScheduleRowNotify = document.createElement('button');
  newScheduleRowNotify.classList.add('schedule-row__notify');
  newScheduleRowNotify.type = 'button';
  newScheduleRowNotify.textContent = 'O';
  return newScheduleRowNotify;
}

function scheduleRowDelete(event){
  event.target.closest('.schedule-row').remove();
}

function createScheduleRowDelete(){
  const newScheduleRowDelete = document.createElement('button');
  newScheduleRowDelete.classList.add('schedule-row__delete');
  newScheduleRowDelete.type = 'button';
  newScheduleRowDelete.innerText = `X`;
  newScheduleRowDelete.addEventListener('click', scheduleRowDelete)
  return newScheduleRowDelete;
}

function createScheduleRowMenuButton(){
  const newScheduleRowMenuButton = document.createElement('button');
  newScheduleRowMenuButton.classList.add('schedule-row__menu-button');
  newScheduleRowMenuButton.type = 'button';
  newScheduleRowMenuButton.innerHTML = `O<br>O<br>O`;
  newScheduleRowMenuButton.addEventListener('click', openScheduleRowMenuDropdown);
  return newScheduleRowMenuButton;
}

function createScheduleRowMenuDropdown(){
  const newScheduleRowMenuDropdown = document.createElement('div');
  newScheduleRowMenuDropdown.classList.add('schedule-row__menu-dropdown');
  newScheduleRowMenuDropdown.appendChild(createScheduleRowMenuDropdownContainer());
  return newScheduleRowMenuDropdown;
}

function openScheduleRowMenuDropdown(event){
  const menuDropdown = event.target.closest('.schedule-row__menu').querySelector('.schedule-row__menu-dropdown');
  menuDropdown.classList.toggle('schedule-row__menu-dropdown--open');
}

function createScheduleRowMenuDropdownContainer(){
  const newScheduleRowMenuDropdownContainer = document.createElement('div');
  newScheduleRowMenuDropdownContainer.classList.add('schedule-row__menu-dropdown-container');
  newScheduleRowMenuDropdownContainer.appendChild(createScheduleRowColor());
  newScheduleRowMenuDropdownContainer.appendChild(createScheduleRowNotify());
  newScheduleRowMenuDropdownContainer.appendChild(createScheduleRowDelete());
  return newScheduleRowMenuDropdownContainer;
}

function createScheduleRowMenu(){
  const newScheduleRowMenu = document.createElement('div');
  newScheduleRowMenu.classList.add('schedule-row__menu');
  newScheduleRowMenu.appendChild(createScheduleRowMenuButton());
  newScheduleRowMenu.appendChild(createScheduleRowMenuDropdown());
  return newScheduleRowMenu;
}

function createScheduleRow(){
  rowCounter++;

  const newScheduleRow = document.createElement('div');
  newScheduleRow.classList.add('schedule-row');

  newScheduleRow.appendChild(createScheduleRowTime());
  newScheduleRow.appendChild(createScheduleRowContent());
  newScheduleRow.appendChild(createScheduleRowDate());
  newScheduleRow.appendChild(createScheduleRowMenu());

  scheduleRowContainer.appendChild(newScheduleRow);

  console.log('created schedule ' + rowCounter)
}

const addNewScheduleRow = document.getElementById('add-schedule-row');
addNewScheduleRow.addEventListener('click', createScheduleRow);

document.addEventListener('click', function(event) {
    // Nếu click KHÔNG nằm trong bất kỳ color nào → đóng tất cả dropdown
    if (!event.target.closest('.schedule-row__color')) {
      document.querySelectorAll('.schedule-row__color-dropdown--open')
        .forEach(dropdown => dropdown.classList.remove('schedule-row__color-dropdown--open'));
    }

    if (!event.target.closest('.schedule-row__menu')) {
      document.querySelectorAll('.schedule-row__menu-dropdown--open')
        .forEach(dropdown => dropdown.classList.remove('schedule-row__menu-dropdown--open'));
    }
});

export {createScheduleRow, addNewScheduleRow};
