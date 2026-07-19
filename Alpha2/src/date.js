function getToday(){
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // Tháng tính từ 0 nên phải +1
    function changeMonthType(mm){ 
        if ( mm > 9){
            return mm;
        } else {
            mm = `0` + `${mm}`;
            return mm;
        } 
    }
    const yyyy = today.getFullYear(); // Lấy năm đầy đủ dạng 4 chữ số
    const formattedDate = `${yyyy}-${changeMonthType(mm)}-${dd}`;
    return formattedDate;
}

function formattedDateDDMM(date) {
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

function restructureDateDDMM(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

// 1. Hàm chuyển chuỗi "HH:mm" thành tổng số phút
function timeToMinutes (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

// 2. Hàm chuyển tổng số phút ngược lại thành chuỗi "HH:mm"
function minutesToTime (totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // Dùng padStart để luôn đảm bảo có 2 chữ số (ví dụ: "02:05")
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

// 1. Tạo một hàm helper để dừng luồng chạy (delay)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 2. Định nghĩa hàm bất đồng bộ chứa vòng lặp
async function delayedLoop() {
//  console.log("Bắt đầu vòng lặp...");

  for (let i = 0; i < 5; i++) {
    console.log(`Bắt đầu vòng lặp thứ ${i}`);
    
    // Thực hiện công việc của bạn ở đây
    // Ví dụ: xử lý dữ liệu, render giao diện...

    // 3. Đợi 1 mili giây trước khi bước sang vòng lặp tiếp theo
    await sleep(1); 

    console.log(`Kết thúc vòng lặp thứ ${i}`);
  }

//  console.log("Hoàn thành tất cả vòng lặp!");
}

export { getToday, formattedDateDDMM, restructureDateDDMM, timeToMinutes, minutesToTime, sleep };
/*
const dd = today.getDate();
const mm = today.getMonth() + 1; // Tháng tính từ 0 nên phải +1
const yyyy = today.getFullYear(); // Lấy năm đầy đủ dạng 4 chữ số
const hh = today.getHours();
const mn = today.getMinutes();
const ss = today.getSeconds();

// Ghép chuỗi theo định dạng DD/MM/YYYY
const formattedDate = `${dd}${mm}${yyyy}`;
console.log(formattedDate); 

const formattedTime = `${ss}${mn}${hh}`;
console.log(Date.now());
*/

/* 
function formattedDateDDMM(date){
    const datestr = new Date(date).toLocaleDateString('vi-VN');
    return datestr; 
}
*/


