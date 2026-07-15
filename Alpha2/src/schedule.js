function createScheduleRow(){
  const template = document.getElementById('schedule__row--template');
  const newRow = template.content.cloneNode(true);

  document.getElementById('list__container').appendChild(newRow);

}

// ===== focus in =====

function focusin(event){
  if(event.target.classList.contains('row__time')){
    event.target.type = 'time';
    event.target.classList.add('row__time--onfocus');
  }
  if(event.target.classList.contains('row__date')){
    event.target.type = 'date';
    event.target.classList.add('row__date--onfocus');
  }  
}

// ===== focus out =====

function focusout(event){
  if(event.target.classList.contains('row__time')){
    event.target.type = 'text';
    event.target.classList.remove('row__time--onfocus');
  }
  if(event.target.classList.contains('row__date')){
    event.target.type = 'text';
    event.target.classList.remove('row__date--onfocus');
  }
}

// ===== menu dropdown =====

function openMenuDropdown(event){
  if(event.target.classList.contains('menu__button')){
    event.target.closest('.row__menu').querySelector('.menu__dropdown').classList.toggle('menu__dropdown--open');
  }
}

// ===== color dropdown =====

function openColorDropdown(event){
  if(event.target.classList.contains('color__button')){
    event.target.closest('.row__color').querySelector('.color__dropdown').classList.toggle('color__dropdown--open')
  }
}

// ===== color taker =====

function colorTaker(event){
  if(event.target.classList.contains('color__taker')){
    event.target.closest('.row__color').querySelector('.color__button')
    .style.backgroundColor = event.target.dataset.color;
    event.target.closest('.menu__dropdown')
    .style.backgroundColor = event.target.dataset.color;
    event.target.closest('.schedule__row')
    .style.backgroundColor = event.target.dataset.color;
  }
}

// ===== row delete =====

function deleteRow(event){
  if(event.target.classList.contains('row__delete')){
    event.target.closest('.schedule__row').remove();
  }
}

// ===== list click group ====

function handleListClick(event){
  openMenuDropdown(event);
  openColorDropdown(event);
  deleteRow(event);
  colorTaker(event);
}

// ===== schedule list =====

const listContainer = document.getElementById('list__container');
listContainer.addEventListener('click', handleListClick);
listContainer.addEventListener('focusin', focusin);
listContainer.addEventListener('focusout', focusout);

// ===== add row =====

const addNewScheduleRow = document.getElementById('add-schedule-row');
addNewScheduleRow.addEventListener('click', createScheduleRow);

// ===== document event =====

document.addEventListener('click', function(event){
  if(!event.target.closest('.row__menu')){
    document.querySelectorAll('.menu__dropdown')
    .forEach(dropdown => dropdown.classList.remove('menu__dropdown--open'));
  }

  if(!event.target.closest('.row__color')){
    document.querySelectorAll('.color__dropdown')
    .forEach(dropdown => dropdown.classList.remove('color__dropdown--open'));
  }
})


