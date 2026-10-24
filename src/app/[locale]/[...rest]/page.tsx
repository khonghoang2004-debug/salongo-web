import { notFound } from "next/navigation";

// Mọi đường dẫn không tồn tại trong một ngôn ngữ → trang 404 có giao diện
export default function CatchAll() {
  notFound();
}
