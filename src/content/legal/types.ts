import type { LegalDocKey } from "@/lib/legal";

export type LegalSection = {
  heading: string;
  /** Mỗi phần tử là một đoạn; dòng bắt đầu bằng "- " hiển thị thành gạch đầu dòng. */
  body: string[];
};

export type LegalDoc = {
  title: string;
  /** Mô tả ngắn cho SEO và thẻ chia sẻ */
  description: string;
  sections: LegalSection[];
};

export type LegalUi = {
  /** Nhãn khối người vận hành */
  operator: string;
  operatorName: string;
  /** Câu mô tả hình thức kinh doanh (OSVČ) */
  legalForm: string;
  ico: string;
  address: string;
  vatId: string;
  notVatPayer: string;
  email: string;
  phone: string;
  effective: string;
  otherDocs: string;
  /** Câu báo bản tiếng Séc là bản gốc (không hiện ở trang tiếng Séc) */
  prevailing: string;
  readCzech: string;
};

export type LegalPack = { ui: LegalUi; docs: Record<LegalDocKey, LegalDoc> };
