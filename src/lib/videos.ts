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
  { id: "checkout", file: "salongo-tinh-tien", duration: "0:59", iso: "PT59S" },
  { id: "marketing", file: "salongo-marketing", duration: "0:50", iso: "PT50S" },
  { id: "payroll", file: "salongo-tinh-luong", duration: "0:51", iso: "PT51S" },
  { id: "branches", file: "salongo-chi-nhanh", duration: "0:46", iso: "PT46S" },
];

/**
 * Video gói Bàn (trang /goi-ban): dựng từ ảnh app thật + chữ (không lời đọc), chữ tiếng Việt, phụ đề tiếng Séc.
 * Nguồn: docs/video-goi-ban-scene.html (ghi từng khung bằng Playwright, ghép bằng ffmpeg). Không nằm trong VIDEOS (tab video trang chủ).
 */
export const DESK_VIDEO: VideoFile = { file: "salongo-goi-ban", duration: "0:35", iso: "PT35S" };

export const videoById = (id: VideoId) => VIDEOS.find((v) => v.id === id)!;

const V = "/videos/";
/** Đủ để phát một video (file + độ dài), kể cả video ngoài danh sách VIDEOS */
export type VideoFile = Pick<SalonVideo, "file" | "duration" | "iso">;

export const videoSrc = (v: VideoFile) => ({
  pc: `${V}${v.file}.mp4`,
  mobile: `${V}${v.file}-mobile.mp4`,
  posterPc: `${V}poster/${v.file}.jpg`,
  posterMobile: `${V}poster/${v.file}-mobile.jpg`,
});

/** màn hình hẹp hơn mức này dùng bản dọc 4:5 */
export const MOBILE_QUERY = "(max-width: 767px)";
