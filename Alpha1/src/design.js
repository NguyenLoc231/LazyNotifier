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