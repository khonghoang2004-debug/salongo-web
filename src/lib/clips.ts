// Đoạn phim ngắn quay từ app hiện tại (không tiếng, không chữ; chú thích nằm trên trang, theo ngôn ngữ).
// Mỗi đoạn có bản ngang (máy tính) và bản dọc 4:5 (điện thoại), kèm ảnh bìa.
export type ClipId = "booking" | "checkout" | "thuchi" | "customers" | "online" | "desk";
export type Clip = { id: ClipId; pc: string; mobile: string; posterPc: string; posterMobile: string };

const c = (id: ClipId, base: string): Clip => ({
  id,
  pc: `/media/clips/${base}.mp4`,
  mobile: `/media/clips/${base}-mobile.mp4`,
  posterPc: `/media/clips/poster/${base}.jpg`,
  posterMobile: `/media/clips/poster/${base}-mobile.jpg`,
});

export const CLIPS: Clip[] = [
  c("booking", "booking"),
  c("checkout", "checkout"),
  c("thuchi", "thuchi"),
  c("customers", "customers"),
  c("online", "online-booking"),
  c("desk", "desk"),
];
