// Video giới thiệu từng tính năng (quay từ app thật, lời đọc tiếng Việt, phụ đề tiếng Séc).
// Mỗi video có 2 bản: ngang 16:9 cho máy tính và dọc 4:5 cho điện thoại (H.264, faststart, ~4–6 MB).
export type VideoId = "booking" | "checkout" | "marketing" | "payroll" | "branches";

export type SalonVideo = {
  id: VideoId;
  /** tên file trong /public/videos (không đuôi) */
  file: string;
  /** độ dài, hiện trên nút xem */
  duration: string;
  /** độ dài dạng ISO 8601, cho dữ liệu có cấu trúc (VideoObject) */
  iso: string;
};

export const VIDEOS: SalonVideo[] = [
  { id: "booking", file: "salongo-lich-hen", duration: "0:59", iso: "PT59S" },
  { id: "checkout", file: "salongo-tinh-tien", duration: "1:00", iso: "PT1M" },
  { id: "marketing", file: "salongo-marketing", duration: "0:51", iso: "PT51S" },
  { id: "payroll", file: "salongo-tinh-luong", duration: "0:50", iso: "PT50S" },
  { id: "branches", file: "salongo-chi-nhanh", duration: "0:46", iso: "PT46S" },
];

export const videoById = (id: VideoId) => VIDEOS.find((v) => v.id === id)!;

const V = "/videos/";
export const videoSrc = (v: SalonVideo) => ({
  pc: `${V}${v.file}.mp4`,
  mobile: `${V}${v.file}-mobile.mp4`,
  posterPc: `${V}poster/${v.file}.jpg`,
  posterMobile: `${V}poster/${v.file}-mobile.jpg`,
});

/** màn hình hẹp hơn mức này dùng bản dọc 4:5 */
export const MOBILE_QUERY = "(max-width: 767px)";
