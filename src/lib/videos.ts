// Video gói Bàn (trang /goi-ban): quay từ app hiện tại, không tiếng, không chữ. Dùng chung file với CLIPS (src/lib/clips.ts).
// Mỗi video có 2 bản: ngang cho máy tính và dọc 4:5 cho điện thoại (H.264, faststart).
export type VideoFile = { file: string; duration: string; iso: string };

export const DESK_VIDEO: VideoFile = { file: "desk", duration: "0:15", iso: "PT15S" };

const V = "/media/clips/";
export const videoSrc = (v: VideoFile) => ({
  pc: `${V}${v.file}.mp4`,
  mobile: `${V}${v.file}-mobile.mp4`,
  posterPc: `${V}poster/${v.file}.jpg`,
  posterMobile: `${V}poster/${v.file}-mobile.jpg`,
});

/** màn hình hẹp hơn mức này dùng bản dọc 4:5 */
export const MOBILE_QUERY = "(max-width: 767px)";
