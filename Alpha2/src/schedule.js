import { AppData, UserData, ListData, ScheduleData } from "./data.js";
import { debounce } from "./eventOptimization.js";
import { getToday, formattedDateDDMM, restructureDateDDMM, timeToMinutes, minutesToTime, sleep } from "./date.js";


// ===== 


// ===== create data object =====



// ===== list interaction =====

function saveData() {
    localStorage.setItem('appdata', JSON.stringify(AppData));
}

let currentListIndex;

function getCurrentList() { return AppData.getList(currentListIndex); }

function checkList(date){
  if(AppData.getListIndex(date) === -1){
    currentListIndex = AppData.getListLength();
    document.getElementById('list__container').innerHTML = ``;
    AppData.setList(ListData, AppData.getListLength(), date);
    saveData();
    (async () => {for(let i = 0; i < 16; i++){await sleep(1); createScheduleRow();}})();
  } else {
    currentListIndex = AppData.getListIndex(date);
    document.getElementById('list__container').innerHTML = ``;
    restoreScheduleRow(); 
    return AppData.getList(AppData.getListIndex(date));
  };
}

document.getElementById('list__date').value = formattedDateDDMM(getToday());
checkList(restructureDateDDMM(document.getElementById('list__date').value));

document.getElementById('list__date').addEventListener('focus', x => {
  x.target.value = restructureDateDDMM(x.target.value);
  x.target.type = 'date';
});
document.getElementById('list__date').addEventListener('blur', function(event){
  event.target.type = 'text';
  checkList(event.target.value);
  event.target.value =  formattedDateDDMM(event.target.value);
});
document.getElementById('list__date').addEventListener('input', x => checkList(x.target.value));
// ===== schedule interaction =====

// ===== create row =====

function restoreScheduleRow(data){
  getCurrentList().getSchedule().forEach(x => {
    const template = document.getElementById('schedule__row--template');
    const newRow = template.content.cloneNode(true);

    newRow.querySelector('.schedule__row').dataset.id = x.getId();
    newRow.querySelector('.row__time').value = x.getTime();
    newRow.querySelector('.row__content').value = x.getContent();
    newRow.querySelector('.row__date').value = x.getDate();
    newRow.querySelector('.color__button').style.backgroundColor = x.getColor();
    newRow.querySelector('.menu__dropdown').style.backgroundColor = x.getColor();
    newRow.querySelector('.schedule__row').style.backgroundColor = x.getColor();
    
    const notifyBtn = newRow.querySelector('.row__notify');
    notifyBtn.dataset.notify = x.getNotify();
    if (String(x.getNotify()) === 'true') {
        notifyBtn.innerHTML = `<svg class="icon-bell" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1-1.5-1s-1.5.17-1.5 1v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`;
    } else {
        notifyBtn.innerHTML = `<svg class="icon-bell" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1-1.5-1s-1.5.17-1.5 1v.68C9.72 5.3 8.64 6.42 8 7.84v.02l9.9 9.9M2.27 2.27L1 3.54l4.25 4.25C5.1 8.84 5 9.9 5 11v5l-2 2v1h13.73l4.25 4.25 1.27-1.27L2.27 2.27z"/></svg>`;
    }

    document.getElementById('list__container').appendChild(newRow);
  });
}

function createScheduleRow(){
  const template = document.getElementById('schedule__row--template');
  const newRow = template.content.cloneNode(true);
  const index = getCurrentList().getListLength();
  const newId = Date.now();
  const time = timeSetter();
  const date = formattedDateDDMM(getToday());

  newRow.querySelector('.schedule__row').dataset.id = newId;
  newRow.querySelector('.row__date').value = date;
  newRow.querySelector('.row__time').value = time;
  getCurrentList().setSchedule(ScheduleData, index, newId);
  getCurrentList().setScheduleTime(time, index);
  getCurrentList().setScheduleDate(date, index);
  getCurrentList().setScheduleNotify(true, index);
  document.getElementById('list__container').appendChild(newRow);
  saveData();
}

//AppData.setList(ListData, AppData.getListLength(), '2026-07-15');


// ===== time setter =====

function timeSetter() {
  const times = Array.from(document.querySelectorAll('.row__time')).map(x => timeToMinutes(x.value));

  if(times.length !== 0){
    const maxMinutes = Math.max(...times) + 60;
    return minutesToTime(maxMinutes);
  } else {
    return '07:00';
  }
}

// ===== content taker =====

const contentTakerDebounced = debounce(function(value, index){
  getCurrentList().setScheduleContent(value, index);
  saveData();
}, 1000);

function contentTaker(event){
  if(event.target.classList.contains('row__content')){
    const index = getCurrentList().getScheduleIndex(getRowId(event));
    contentTakerDebounced(event.target.value, index);
  }
}

// ===== menu dropdown =====

function openMenuDropdown(event){
  if(event.target.classList.contains('menu__button')){
    document.querySelectorAll('.menu__dropdown--open')
    .forEach(x => x.classList.toggle('menu__dropdown--open', false));
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

const saveColorDebounced = debounce(function(color, index){
  getCurrentList().setScheduleColor(color, index);
  saveData();
}, 500);

function colorTaker(event){
  if(event.target.classList.contains('color__taker')){
    const color = event.target.dataset.color;
    const index = getCurrentList().getScheduleIndex(getRowId(event));
    
    event.target.closest('.row__color').querySelector('.color__button')
    .style.backgroundColor = color;
    event.target.closest('.menu__dropdown')
    .style.backgroundColor = color;
    event.target.closest('.schedule__row')
    .style.backgroundColor = color;

    saveColorDebounced(color, index);
  }
}

// ===== row notify =====

const notifyTakerDebounced = debounce(function(notify, index){
  getCurrentList().setScheduleNotify(notify, index);
  saveData();
}, 500);

function checkNotify(){

}

function notifyTaker(event){
  const button = event.target.closest('.row__notify');
  if(button){
    const index = getCurrentList().getScheduleIndex(getRowId(event));
    if (button.dataset.notify === 'true'){ 
      notifyTakerDebounced(false, index);
      button.dataset.notify = 'false';  
      button.innerHTML = `
      <svg class="icon-bell" viewBox="0 0 24 24">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1-1.5-1s-1.5.17-1.5 1v.68C9.72 5.3 8.64 6.42 8 7.84v.02l9.9 9.9M2.27 2.27L1 3.54l4.25 4.25C5.1 8.84 5 9.9 5 11v5l-2 2v1h13.73l4.25 4.25 1.27-1.27L2.27 2.27z"/>
      </svg>
      `;
    } else {
      notifyTakerDebounced(true, index);
      button.dataset.notify = 'true';
      button.innerHTML = `
      <svg class="icon-bell" viewBox="0 0 24 24">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1-1.5-1s-1.5.17-1.5 1v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
      `;
    }
  }
}

// ===== row delete =====

function deleteRow(event){
  if(event.target.classList.contains('row__delete')){
    const index = getCurrentList().getScheduleIndex(getRowId(event));
    getCurrentList().deleteSchedule(index);
    event.target.closest('.schedule__row').remove();
    saveData();
  }
}

// ===== list click group ====

function handleListClick(event){
  openMenuDropdown(event);
  openColorDropdown(event);
  colorTaker(event);
  notifyTaker(event);
  deleteRow(event);
}

// ===== focus in =====

function focusin(event){
  if(event.target.classList.contains('row__time')){
    event.target.type = 'time';
    event.target.classList.add('row__time--onfocus');
  }
  if(event.target.classList.contains('row__date')){
    event.target.value = restructureDateDDMM(event.target.value);
    event.target.type = 'date';
    event.target.classList.add('row__date--onfocus');
  }  
}

// ===== focus out =====

function focusout(event){
  const index = getCurrentList().getScheduleIndex(getRowId(event));

  if(event.target.classList.contains('row__time')){
    event.target.type = 'text';
    event.target.classList.remove('row__time--onfocus');
    getCurrentList().setScheduleTime(event.target.value, index);
  }
  if(event.target.classList.contains('row__date')){
    event.target.type = 'text';
    event.target.value = formattedDateDDMM(event.target.value);
    event.target.classList.remove('row__date--onfocus');
    getCurrentList().setScheduleDate(event.target.value, index);
  }
  saveData();
}

// ===== schedule list =====

function getRowId(event) {return parseInt(event.target.closest('.schedule__row').dataset.id);}

const listContainer = document.getElementById('list__container');
listContainer.addEventListener('click', handleListClick);
listContainer.addEventListener('focusin', focusin);
listContainer.addEventListener('focusout', focusout);
listContainer.addEventListener('input', contentTaker);

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
