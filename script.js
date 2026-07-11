/* === TOP NAV BAR === */

const topNavbar = document.getElementById("top-nav-bar");

const navbarHeight = topNavbar.offsetHeight;

console.log(navbarHeight);

document.body.style.marginTop = navbarHeight + "px";

/*
ResizeObserver vừa chôm được
ý kiến: tôi thấy nếu không chọn đúng điều kiện thì cái này nó sẽ tạo ra vòng lặp vô hạn

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    // Lấy kích thước mới của phần tử (đơn vị pixel)
    const { width, height } = entry.contentRect;
    
    console.log(`Phần tử thay đổi kích thước:`, entry.target);
    console.log(`Chiều rộng mới: ${width}px, Chiều cao mới: ${height}px`);
    
    // Bạn có thể thay đổi style, class hoặc logic giao diện tại đây
    if (width < 400) {
      entry.target.classList.add('mobile-view');
    } else {
      entry.target.classList.remove('mobile-view');
    }
  }
});

// 2. Chọn phần tử DOM cần theo dõi
const targetElement = document.querySelector('.my-box');

// 3. Bắt đầu theo dõi
observer.observe(targetElement);
*/




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
  const rowColor = [{name: 'WHITE', color: '#FAFAFA'}, {name: 'YELLOW', color: '#ffff62'}, {name: 'RED', color: '#FF1744'}];
  for (const item of rowColor){
    const scheduleRowColorButton = document.createElement('button');
    scheduleRowColorButton.type = 'button';
    scheduleRowColorButton.dataset.color = item.color;
    scheduleRowColorButton.textContent = item.name;
    scheduleRowColorButton.addEventListener('click', takeScheduleColor);
    scheduleRowColorDropdown.appendChild(scheduleRowColorButton);

  }
  /* let html = `                  
    <button type="button" class="take-schedule-color" data-color="#FAFAFA">⬜ White</button>
    <button type="button" class="take-schedule-color" data-color="#ffff62">🟨 Yellow</button>
    <button type="button" class="take-schedule-color" data-color="#FF1744">🟥 Red</button>
  `;
  scheduleRowColorDropdown.innerHTML = html; */
  return scheduleRowColorDropdown;
}

function openScheduleRowColorDropdown(event){
  const dropdown = event.target.closest('.schedule-row__color').querySelector('.schedule-row__color-dropdown');
  dropdown.classList.toggle('schedule-row__color-dropdown--open');
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
  newScheduleRowTime.type = 'time';
  return newScheduleRowTime;
}

function createScheduleRowDeadline(){
  const newScheduleRowDate = document.createElement('input');
  newScheduleRowDate.classList.add('schedule-row__deadline');
  newScheduleRowDate.type = 'date';
  return newScheduleRowDate;
}

function createScheduleRowNotify(){
  const newScheduleRowNotify = document.createElement('input');
  newScheduleRowNotify.classList.add('schedule-row__notify');
  newScheduleRowNotify.type = 'checkbox';
  newScheduleRowNotify.checked = true;
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

function createScheduleRow(){
  rowCounter++;

  const newScheduleRow = document.createElement('div');
  newScheduleRow.classList.add('schedule-row');

  newScheduleRow.appendChild(createScheduleRowColor(rowCounter));
  newScheduleRow.appendChild(createScheduleRowContent());
  newScheduleRow.appendChild(createScheduleRowTime());
  newScheduleRow.appendChild(createScheduleRowDeadline());
  newScheduleRow.appendChild(createScheduleRowNotify());
  newScheduleRow.appendChild(createScheduleRowDelete());

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
});
