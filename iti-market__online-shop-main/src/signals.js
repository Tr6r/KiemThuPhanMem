import { signal } from "@preact/signals-react";

// Biến signal toàn cục
// signal toàn cục để lưu trạng thái login
export const authSignal = signal({
	isLoggedIn: false,
	user: null,
});
export const Cart = signal([]);
export const Product = signal([]);


// authSignal.value sẽ là trạng thái hiện tại
