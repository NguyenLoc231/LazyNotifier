export function debounce(func, delay) {
    let timerId;

    return function (...args) {
        // Xóa timer cũ nếu hành động lặp lại trước khi delay kết thúc
        clearTimeout(timerId);

        // Thiết lập timer mới
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

