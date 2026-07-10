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

function createScheduleRowColor(rowCounter){
  const scheduleRowColor = document.createElement('div');
  const rowColor = [{name: 'WHITE', color: '#FAFAFA'}, {name: 'YELLOW', color: '#ffff62'}, {name: 'RED', color: '#FF1744'}];
  scheduleRowColor.classList.add('schedule-row__color');
  let html = `
    <label><input type="radio" name="choose-color-${rowCounter}" value="${rowColor[0].color}" class="schedule-row__color-input">${rowColor[0].name}</label>
    <br>
    <label><input type="radio" name="choose-color-${rowCounter}" value="${rowColor[1].color}" class="schedule-row__color-input">${rowColor[1].name}</label>
    <br>
    <label><input type="radio" name="choose-color-${rowCounter}" value="${rowColor[2].color}" class="schedule-row__color-input">${rowColor[2].name}</label>
  `;
  scheduleRowColor.innerHTML = html;
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