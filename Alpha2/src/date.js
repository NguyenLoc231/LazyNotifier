const today = new Date();

const dd = today.getDate();
const mm = today.getMonth() + 1; // Tháng tính từ 0 nên phải +1
const yyyy = today.getFullYear(); // Lấy năm đầy đủ dạng 4 chữ số
const hh = today.getHours();
const mn = today.getMinutes();
const ss = today.getSeconds();

// Ghép chuỗi theo định dạng DD/MM/YYYY
const formattedDate = `${dd}${mm}${yyyy}`;
console.log(formattedDate); 

const formattedTime = `${ss}${mn}${hh}`

