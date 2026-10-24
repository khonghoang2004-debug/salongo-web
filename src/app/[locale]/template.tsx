// Bọc mỗi trang để nội dung hiện dần khi chuyển trang (header đứng yên)
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="sg-page-enter">
      {/* Mốc 0px để khi chuyển trang luôn cuộn về đúng đầu trang (header sticky bị Next bỏ qua) */}
      <span aria-hidden className="block h-0" />
      {children}
    </div>
  );
}
