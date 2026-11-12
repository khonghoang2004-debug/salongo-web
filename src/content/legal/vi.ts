import type { LegalPack } from "./types";

/** Văn bản pháp lý SalonGo – bản tiếng Việt (bản dịch; bản tiếng Séc là bản có giá trị). */
export const vi: LegalPack = {
  ui: {
    operator: "Người vận hành",
    operatorName: "Họ tên",
    legalForm: "Cá nhân kinh doanh (podnikatel – fyzická osoba) đăng ký tại sổ đăng ký kinh doanh Séc (živnostenský rejstřík); cơ quan đăng ký kinh doanh: Městský úřad Černošice.",
    ico: "IČO",
    address: "Trụ sở (sídlo)",
    vatId: "DIČ",
    notVatPayer: "Không phải người nộp thuế DPH",
    email: "Email",
    phone: "Điện thoại",
    effective: "Có hiệu lực từ",
    otherDocs: "Văn bản khác",
    prevailing: "Đây là bản dịch. Khi có khác biệt, bản tiếng Séc có giá trị.",
    readCzech: "Xem bản tiếng Séc",
  },
  docs: {
    terms: {
      title: "Điều khoản dịch vụ",
      description:
        "Điều khoản dịch vụ SalonGo: dịch vụ dành cho ai, thời gian dùng thử, giá, thanh toán, gia hạn, huỷ, trách nhiệm và báo cáo nội dung vi phạm.",
      sections: [
        {
          heading: "1. Quy định chung",
          body: [
            "Điều khoản này (gọi là \"Điều khoản\") áp dụng cho việc sử dụng phần mềm SalonGo: ứng dụng web {app}, ứng dụng điện thoại, ứng dụng máy tính và website {site} (gọi chung là \"Dịch vụ\").",
            "Dịch vụ do {operator} vận hành, thông tin ở khung Người vận hành phía trên (gọi là \"Người vận hành\" hoặc \"SalonGo\").",
            "Hợp đồng còn bao gồm Thoả thuận xử lý dữ liệu (DPA), Chính sách bảo mật và bảng giá hiện hành trong app. Dịch vụ làm website có điều khoản riêng.",
            "Đầu mối liên hệ cho người dùng và cơ quan nhà nước theo Điều 11 và 12 Đạo luật Dịch vụ số EU (DSA) là email {email}. Chúng tôi trả lời bằng tiếng Séc, tiếng Việt và tiếng Anh.",
          ],
        },
        {
          heading: "2. Dịch vụ dành cho ai",
          body: [
            "Dịch vụ chỉ dành cho người kinh doanh: chủ salon (cá nhân kinh doanh hoặc công ty) dùng Dịch vụ cho hoạt động kinh doanh của mình (gọi là \"Salon\" hoặc \"Khách hàng\").",
            "Khi đăng ký, Khách hàng xác nhận mình hành động với tư cách người kinh doanh và có quyền đại diện cho Salon. Vì vậy các quy định bảo vệ người tiêu dùng, gồm quyền huỷ hợp đồng trong 14 ngày, không áp dụng cho hợp đồng với Salon.",
            "Chủ salon có thể tạo tài khoản cho nhân viên. Salon chịu trách nhiệm cho hành vi của nhân viên trong Dịch vụ.",
            "Khách của salon có thể dùng miễn phí chức năng đặt lịch online và tài khoản quản lý lịch hẹn; áp dụng Điều 17.",
          ],
        },
        {
          heading: "3. Ký kết hợp đồng",
          body: [
            "Hợp đồng được ký kết khi hoàn tất đăng ký trong app. Hợp đồng không thời hạn; mỗi kỳ trả phí là một tháng hoặc một năm.",
            "Hợp đồng được lập bằng tiếng Séc. Bản dịch sang ngôn ngữ khác chỉ để tham khảo; khi có khác biệt, bản tiếng Séc có giá trị.",
            "Điều khoản có hiệu lực vào ngày ký kết luôn có tại {site}/cs/terms, Khách hàng có thể lưu hoặc in ra.",
          ],
        },
        {
          heading: "4. Dịch vụ và việc phát triển",
          body: [
            "Dịch vụ gồm lịch hẹn và đặt lịch online, quản lý khách và dịch vụ, tính tiền và hoá đơn, tính lương và tiền tip, báo cáo doanh thu, quản lý chi nhánh, nhắc lịch cho khách. Phạm vi hiện tại được mô tả trên website và trong app.",
            "Dịch vụ được cung cấp theo hiện trạng (\"as is\") và theo khả năng sẵn có. SalonGo liên tục phát triển Dịch vụ và có thể thay đổi, thay thế hoặc bỏ tính năng, miễn là không làm giảm đáng kể các chức năng chính mà Khách hàng trả tiền.",
            "Tính năng ghi beta hoặc thử nghiệm có thể thay đổi hoặc ngừng bất cứ lúc nào.",
            "Dịch vụ là công cụ phần mềm. Kết quả tính lương, doanh thu, hoá đơn dựa trên số liệu Salon nhập; Salon tự kiểm tra và tự chịu trách nhiệm về nghĩa vụ thuế, kế toán và lao động của mình.",
          ],
        },
        {
          heading: "5. Thời gian dùng thử",
          body: [
            "Mỗi salon mới và mỗi chi nhánh mới được dùng thử miễn phí với độ dài hiển thị khi đăng ký (hiện là 150 ngày), đủ tính năng, không cần thẻ.",
            "Hết thời gian dùng thử, muốn dùng tiếp phải trả phí gói. Nếu không trả, SalonGo có thể giới hạn tính năng; dữ liệu được giữ theo Điều 14.",
            "SalonGo có thể thay đổi thời gian và điều kiện dùng thử cho đăng ký mới. Việc này không rút ngắn thời gian dùng thử đang chạy.",
          ],
        },
        {
          heading: "6. Giá và thanh toán",
          body: [
            "Giá các gói có trong bảng giá trên website và trong app. Giá có giá trị là giá hiển thị trong app tại thời điểm thanh toán. Giá niêm yết là giá cuối cùng.",
            "Phí gói trả trước cho kỳ đã chọn (tháng hoặc năm), bằng thẻ qua cổng Stripe hoặc cách khác mà app hiển thị cho Salon (ví dụ chuyển khoản).",
            "Thông tin thẻ chỉ do Stripe xử lý; SalonGo không lưu.",
            "Chứng từ thanh toán được lập điện tử, xem trong app hoặc gửi qua email.",
            "Kỳ trả phí bắt đầu khi tiền về. Với chuyển khoản, thanh toán được coi là hoàn tất khi tiền vào tài khoản SalonGo.",
          ],
        },
        {
          heading: "7. Tự động gia hạn và thay đổi giá",
          body: [
            "Nếu Khách hàng trả bằng thẻ có bật tự động gia hạn, gói sẽ tự gia hạn thêm một kỳ như cũ khi hết kỳ và trừ tiền từ thẻ đó. Có thể tắt gia hạn bất cứ lúc nào trong app; việc tắt có hiệu lực từ kỳ sau.",
            "SalonGo có thể thay đổi giá. SalonGo báo cho Khách hàng qua email hoặc trong app ít nhất 30 ngày trước. Giá mới chỉ áp dụng từ kỳ trả phí tiếp theo. Nếu không đồng ý, Khách hàng có thể tắt gia hạn; nếu không, giá mới được áp dụng.",
            "Nếu chậm thanh toán, sau khi nhắc và quá 7 ngày, SalonGo có thể giới hạn truy cập cho tới khi trả tiền, và có quyền đòi lãi chậm trả theo luật.",
          ],
        },
        {
          heading: "8. Huỷ và hoàn tiền",
          body: [
            "Khách hàng có thể huỷ gói bất cứ lúc nào. Dịch vụ vẫn dùng được đến hết kỳ đã trả.",
            "Kỳ đã trả không được hoàn tiền và không tính lại theo ngày, kể cả khi không dùng, huỷ sớm hoặc chuyển xuống gói thấp hơn.",
            "SalonGo hoàn tiền hoặc gia hạn tương ứng trong các trường hợp:",
            "- trừ tiền hai lần hoặc trừ nhầm,",
            "- tính sai số tiền,",
            "- Dịch vụ ngừng hoạt động quá 7 ngày liên tục do lỗi của SalonGo; hoàn phần tương ứng với thời gian ngừng.",
            "Gửi yêu cầu tới {email} trong vòng 30 ngày kể từ ngày thanh toán hoặc sự việc, ghi rõ salon, ngày và chứng từ thanh toán. Tiền hoàn được trả về cùng phương thức thanh toán, thường trong 14 ngày.",
            "Nếu Khách hàng khiếu nại giao dịch với ngân hàng (chargeback) mà chưa liên hệ SalonGo trước, SalonGo có thể tạm khoá truy cập cho tới khi giải quyết xong.",
          ],
        },
        {
          heading: "9. Tài khoản và bảo mật",
          body: [
            "Khách hàng cung cấp thông tin đúng, bảo vệ thông tin đăng nhập và báo ngay khi bị lộ.",
            "Chủ salon chịu trách nhiệm cấp và thu hồi quyền truy cập của nhân viên.",
            "SalonGo không chịu trách nhiệm cho thiệt hại do chia sẻ mật khẩu, thiết bị của Khách hàng không an toàn, hoặc do người được Khách hàng cho truy cập gây ra.",
          ],
        },
        {
          heading: "10. Hành vi bị cấm",
          body: [
            "Khách hàng không được dùng Dịch vụ để:",
            "- vi phạm pháp luật hoặc quyền của người khác,",
            "- gửi tin quảng cáo khi người nhận chưa đồng ý,",
            "- tải lên nội dung trái pháp luật hoặc vi phạm bản quyền,",
            "- tấn công, dò lỗ hổng, vượt giới hạn, tải dữ liệu hàng loạt bằng công cụ tự động,",
            "- dịch ngược, sao chép hoặc dựa vào Dịch vụ để làm sản phẩm cạnh tranh,",
            "- bán lại hoặc cung cấp Dịch vụ cho người khác khi chưa được SalonGo đồng ý.",
          ],
        },
        {
          heading: "11. Nội dung của người dùng và báo cáo vi phạm (DSA)",
          body: [
            "SalonGo lưu trữ nội dung các Salon đưa lên Dịch vụ (tên, ảnh, mô tả dịch vụ, trang đặt lịch công khai...). Salon chịu trách nhiệm về nội dung đó.",
            "SalonGo không kiểm duyệt trước. Tuy nhiên SalonGo có thể gỡ hoặc ẩn nội dung, tạm khoá tính năng hoặc tài khoản khi biết nội dung trái pháp luật hoặc vi phạm Điều khoản. Quyết định do con người đưa ra, không do hệ thống tự động.",
            "Bất kỳ ai cũng có thể báo cáo nội dung trái pháp luật tới {email} với tiêu đề \"Nahlášení obsahu\". Báo cáo cần có: đường dẫn (URL) tới nội dung, giải thích vì sao trái pháp luật, tên và email người báo, và lời xác nhận thông tin là đúng theo hiểu biết tốt nhất của mình.",
            "SalonGo xử lý báo cáo không chậm trễ và báo kết quả cho người báo. Nếu hạn chế nội dung, SalonGo gửi lý do cho Salon liên quan (Điều 17 DSA). Có thể khiếu nại quyết định qua cùng email; việc này không ảnh hưởng quyền khởi kiện ra toà.",
          ],
        },
        {
          heading: "12. Dữ liệu của Salon",
          body: [
            "Dữ liệu Salon nhập vào Dịch vụ (khách, lịch hẹn, dịch vụ, nhân viên, hoá đơn) thuộc về Salon. SalonGo xử lý dữ liệu đó với vai trò bên xử lý theo Thoả thuận xử lý dữ liệu (DPA), là một phần của hợp đồng này.",
            "Salon là bên kiểm soát dữ liệu cá nhân của khách và nhân viên. Salon chịu trách nhiệm có cơ sở pháp lý để xử lý, thông báo cho khách, và chỉ gửi tin quảng cáo (SMS, email) khi khách đồng ý hoặc theo § 7 Luật số 480/2004 Sb.",
            "Không nhập vào ghi chú những thông tin không cần thiết. Chỉ nhập thông tin sức khoẻ (ví dụ dị ứng) khi thật cần cho dịch vụ và khách đã đồng ý.",
            "Salon có thể xuất dữ liệu bất cứ lúc nào. SalonGo khuyên nên sao lưu định kỳ dữ liệu quan trọng.",
            "SalonGo được dùng số liệu đã ẩn danh và tổng hợp, không thể nhận ra Salon hay cá nhân nào, để cải thiện Dịch vụ và làm thống kê.",
          ],
        },
        {
          heading: "13. Sở hữu trí tuệ",
          body: [
            "Phần mềm, thiết kế, nội dung chữ, logo, mẫu và các thành phần khác của Dịch vụ được pháp luật sở hữu trí tuệ bảo hộ và thuộc về SalonGo hoặc nhà cung cấp của SalonGo.",
            "Trong thời gian hợp đồng, Khách hàng được quyền sử dụng Dịch vụ cho salon của mình. Quyền này không độc quyền, không chuyển nhượng được và không giới hạn lãnh thổ.",
            "SalonGo được tự do dùng các góp ý về Dịch vụ mà không phải trả thù lao.",
            "SalonGo có thể ghi tên Salon trong danh sách khách hàng tham khảo. Khách hàng có thể từ chối bất cứ lúc nào qua email, SalonGo sẽ gỡ.",
          ],
        },
        {
          heading: "14. Chấm dứt hợp đồng và dữ liệu sau khi chấm dứt",
          body: [
            "Khách hàng có thể chấm dứt hợp đồng bất cứ lúc nào bằng cách huỷ gói và xoá tài khoản trong app hoặc gửi email.",
            "SalonGo có thể chấm dứt hợp đồng không cần nêu lý do với thời hạn báo trước 30 ngày. Khi đó SalonGo hoàn phần tương ứng của kỳ đã trả.",
            "SalonGo có thể chấm dứt hoặc khoá truy cập ngay nếu Khách hàng vi phạm nghiêm trọng Điều khoản (nhất là Điều 10), không trả tiền dù đã được nhắc, hoặc khi pháp luật hay cơ quan nhà nước yêu cầu.",
            "Sau khi chấm dứt hợp đồng hoặc sau 90 ngày không có gói trả phí, Khách hàng có 30 ngày để yêu cầu xuất dữ liệu. Sau đó SalonGo xoá dữ liệu; bản sao lưu được xoá chậm nhất trong 90 ngày tiếp theo. Chứng từ và dữ liệu mà luật buộc phải giữ thì được giữ trong thời hạn luật định.",
          ],
        },
        {
          heading: "15. Tính sẵn có và trách nhiệm",
          body: [
            "SalonGo cố gắng giữ Dịch vụ chạy liên tục nhưng không cam kết Dịch vụ không bao giờ gián đoạn hay lỗi. Bảo trì có kế hoạch sẽ được báo trước khi có thể.",
            "SalonGo không chịu trách nhiệm cho lợi nhuận bị mất, doanh thu bị mất, thiệt hại gián tiếp và hệ quả, thiệt hại do số liệu sai mà Khách hàng nhập, sự cố mạng, thiết bị của Khách hàng hoặc dịch vụ bên thứ ba (cổng thanh toán, nhà mạng, kho ứng dụng), hay sự kiện ngoài tầm kiểm soát.",
            "Tổng trách nhiệm bồi thường của SalonGo theo hợp đồng này không vượt quá số tiền Khách hàng đã trả cho SalonGo trong 12 tháng trước sự việc, và tối đa 10 000 Kč.",
            "Các giới hạn trên không áp dụng cho thiệt hại do cố ý hoặc do cẩu thả nghiêm trọng, thiệt hại về quyền tự nhiên của con người, và các trường hợp khác mà luật không cho phép giới hạn (§ 2898 Bộ luật Dân sự Séc).",
            "Khách hàng bồi thường cho SalonGo thiệt hại và chi phí phát sinh từ yêu cầu của bên thứ ba (ví dụ khách hoặc nhân viên của Salon) do Khách hàng vi phạm pháp luật hoặc Điều khoản này.",
          ],
        },
        {
          heading: "16. Thay đổi Điều khoản",
          body: [
            "SalonGo có thể thay đổi Điều khoản ở mức hợp lý, nhất là khi luật thay đổi, Dịch vụ mở rộng, vì lý do bảo mật hoặc chính sách kinh doanh.",
            "SalonGo báo thay đổi qua email hoặc trong app ít nhất 30 ngày trước khi có hiệu lực. Khách hàng có quyền từ chối và chấm dứt hợp đồng vì lý do đó, có hiệu lực vào ngày thay đổi có hiệu lực; khi đó được hoàn phần tương ứng của kỳ đã trả. Nếu không từ chối, coi như đã chấp nhận.",
            "Thay đổi chỉ có lợi cho Khách hàng hoặc do luật bắt buộc có thể có hiệu lực sớm hơn.",
          ],
        },
        {
          heading: "17. Khách của salon (đặt lịch online)",
          body: [
            "Khách của salon có thể đặt lịch và tạo tài khoản quản lý lịch hẹn miễn phí. Hợp đồng dịch vụ (ví dụ làm móng, cắt tóc) là giữa khách và Salon; SalonGo không phải một bên và không chịu trách nhiệm về chất lượng, giá hay quy định huỷ lịch của Salon.",
            "Khách có thể xoá tài khoản bất cứ lúc nào. SalonGo có thể xoá tài khoản bị lạm dụng (ví dụ đặt lịch giả).",
            "Nếu khách là người tiêu dùng, khách có quyền giải quyết tranh chấp ngoài toà án tại Cơ quan Thanh tra Thương mại Séc (www.coi.cz). Việc này không ảnh hưởng quyền khởi kiện ra toà.",
          ],
        },
        {
          heading: "18. Điều khoản cuối",
          body: [
            "Hợp đồng được điều chỉnh theo pháp luật Cộng hoà Séc, nhất là Luật số 89/2012 Sb., Bộ luật Dân sự.",
            "Tranh chấp giữa SalonGo và Khách hàng do toà án có thẩm quyền tại nơi kinh doanh của Người vận hành giải quyết.",
            "Các bên tự chịu rủi ro khi hoàn cảnh thay đổi (§ 1765 khoản 2 Bộ luật Dân sự). Giữa những người kinh doanh không áp dụng § 1799 và § 1800 Bộ luật Dân sự về hợp đồng theo mẫu.",
            "Thời hiệu cho các yêu cầu của Khách hàng đối với SalonGo là 1 năm, trừ khi luật quy định khác.",
            "Liên lạc bằng phương tiện điện tử (email, app). Nếu một điều khoản vô hiệu, các điều khoản khác vẫn có hiệu lực.",
          ],
        },
      ],
    },

    privacy: {
      title: "Chính sách bảo mật",
      description:
        "SalonGo xử lý dữ liệu cá nhân của người xem website, salon, nhân viên và khách như thế nào: mục đích, cơ sở pháp lý, thời gian lưu, bên nhận và quyền của bạn theo GDPR.",
      sections: [
        {
          heading: "1. Ai là bên kiểm soát dữ liệu",
          body: [
            "Bên kiểm soát dữ liệu cá nhân là Người vận hành ghi ở khung phía trên. Về dữ liệu cá nhân, liên hệ {email} với tiêu đề \"GDPR\".",
            "Chúng tôi không bổ nhiệm cán bộ bảo vệ dữ liệu (DPO) vì luật không yêu cầu với chúng tôi.",
          ],
        },
        {
          heading: "2. Khi nào chúng tôi là bên kiểm soát, khi nào là bên xử lý",
          body: [
            "Chúng tôi là bên kiểm soát dữ liệu của người xem website, của người dùng tài khoản salon (chủ và nhân viên) trong phạm vi quản lý tài khoản và thanh toán, và của khách tự tạo tài khoản quản lý lịch hẹn.",
            "Dữ liệu salon nhập vào app về khách và nhân viên của họ (tên, số điện thoại, lịch hẹn, ghi chú, lương) được chúng tôi xử lý thay mặt salon. Salon là bên kiểm soát. Câu hỏi và yêu cầu về dữ liệu này nên gửi trước hết cho salon; chúng tôi xử lý yêu cầu của salon theo Thoả thuận xử lý dữ liệu (DPA).",
          ],
        },
        {
          heading: "3. Dữ liệu gì, để làm gì, lưu bao lâu",
          body: [
            "Người xem website {site}:",
            "- nhật ký máy chủ (địa chỉ IP, trình duyệt, thời gian, trang đã xem) – bảo mật và vận hành website – lợi ích hợp pháp – tối đa 30 ngày,",
            "- cookie lưu ngôn ngữ – xem Chính sách cookie.",
            "Khi bạn liên hệ chúng tôi (email, điện thoại, WhatsApp, Facebook, Instagram):",
            "- tên, thông tin liên hệ, nội dung tin nhắn – trả lời và trao đổi trước khi ký hợp đồng – lợi ích hợp pháp và bước chuẩn bị hợp đồng – 3 năm kể từ lần liên lạc cuối.",
            "Tài khoản salon (chủ và nhân viên):",
            "- tên, email, số điện thoại, tên và địa chỉ salon, IČO, vai trò và thông tin đăng nhập (mật khẩu chỉ lưu dạng mã hoá) – cung cấp Dịch vụ – thực hiện hợp đồng – trong thời gian có tài khoản và 30 ngày sau,",
            "- gói, thanh toán, chứng từ – thực hiện hợp đồng và nghĩa vụ kế toán, thuế theo luật – 10 năm,",
            "- email và thông báo dịch vụ (xác thực tài khoản, hết hạn dùng thử, thay đổi điều khoản) – thực hiện hợp đồng,",
            "- tin mới về SalonGo và dịch vụ tương tự gửi tới email khách hàng – lợi ích hợp pháp theo § 7 khoản 3 Luật số 480/2004 Sb. – cho tới khi bạn huỷ đăng ký; huỷ ngay trong mỗi email hoặc qua {email},",
            "- yêu cầu hỗ trợ – xử lý yêu cầu – lợi ích hợp pháp – 3 năm.",
            "Khách của salon có tài khoản đặt lịch:",
            "- tên, email, số điện thoại, lịch hẹn và thẻ thành viên tại các salon – quản lý tài khoản và lịch hẹn – thực hiện hợp đồng – cho tới khi xoá tài khoản; bản thân lịch hẹn do salon lưu với vai trò bên kiểm soát.",
            "App và bảo mật:",
            "- mã thiết bị để gửi thông báo (push), phiên bản app, báo lỗi, nhật ký bảo mật – vận hành, bảo mật và sửa lỗi – lợi ích hợp pháp và thực hiện hợp đồng – nhật ký tối đa 90 ngày, lâu hơn chỉ khi đang xử lý sự cố.",
            "Thông tin tài khoản và thanh toán là bắt buộc để ký hợp đồng; thiếu thì không cung cấp được Dịch vụ. Các thông tin khác là tự nguyện.",
          ],
        },
        {
          heading: "4. Chúng tôi chia sẻ dữ liệu với ai",
          body: [
            "Chúng tôi không bán và không cho thuê dữ liệu. Chúng tôi chỉ chuyển dữ liệu ở mức cần thiết cho các nhà cung cấp xử lý thay chúng tôi:",
            "Website {site}:",
            "- Vercel Inc. (Mỹ) – hosting website, máy chủ tại EU (khu vực Frankfurt),",
            "- GitHub Inc. (Mỹ) – tải app máy tính (nút tải chuyển sang GitHub).",
            "Bản thân website không gửi email, không nhận thanh toán và không có cơ sở dữ liệu riêng.",
            "App SalonGo ({app}, app điện thoại và máy tính): áp dụng chính sách bảo mật của app tại {app}/legal/privacy, gồm danh sách bên xử lý hiện hành (ví dụ Vercel Inc. – hosting, Stripe Payments Europe Ltd. – thanh toán thẻ, chỉ diễn ra trong app, Resend – gửi email).",
            "Ngoài ra là kế toán, tư vấn thuế, luật sư và cơ quan nhà nước khi luật yêu cầu.",
            "Khi bạn liên hệ qua WhatsApp, Facebook hoặc Instagram, công ty Meta là bên kiểm soát độc lập theo điều khoản riêng của họ.",
          ],
        },
        {
          heading: "5. Chuyển dữ liệu ra ngoài EU",
          body: [
            "Một số nhà cung cấp có trụ sở tại Mỹ. Việc chuyển dữ liệu dựa trên quyết định của Uỷ ban châu Âu về mức bảo vệ tương đương (EU-US Data Privacy Framework) nếu nhà cung cấp đã được chứng nhận, nếu không thì dựa trên điều khoản hợp đồng mẫu của EU.",
          ],
        },
        {
          heading: "6. Quyền của bạn",
          body: [
            "Bạn có quyền truy cập, chỉnh sửa, xoá, hạn chế xử lý, chuyển dữ liệu và quyền phản đối việc xử lý dựa trên lợi ích hợp pháp, kể cả phản đối nhận tin mới (chúng tôi luôn đáp ứng). Bạn có thể rút lại sự đồng ý bất cứ lúc nào.",
            "Gửi yêu cầu tới {email}. Chúng tôi trả lời trong 1 tháng; trường hợp phức tạp có thể kéo dài thêm 2 tháng và sẽ báo cho bạn. Chúng tôi có thể xác minh danh tính của bạn.",
            "Bạn có quyền khiếu nại tới Văn phòng Bảo vệ Dữ liệu Cá nhân Séc (ÚOOÚ), Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz, hoặc cơ quan tại nước EU nơi bạn sống hay làm việc.",
          ],
        },
        {
          heading: "7. Bảo mật",
          body: [
            "Chúng tôi dùng kết nối mã hoá (HTTPS), mật khẩu mã hoá, tách riêng dữ liệu từng salon, phân quyền theo vai trò và sao lưu. Chỉ người cần thiết và có nghĩa vụ bảo mật mới được truy cập dữ liệu.",
            "Khi có sự cố rò rỉ, chúng tôi xử lý theo Điều 33 và 34 GDPR.",
          ],
        },
        {
          heading: "8. Thông tin khác",
          body: [
            "Chúng tôi không ra quyết định tự động hay lập hồ sơ (profiling) gây hệ quả pháp lý.",
            "Dịch vụ không dành cho người dưới 15 tuổi.",
            "Chính sách này có thể được cập nhật. Bản hiện hành luôn có tại {site}/vi/privacy; thay đổi quan trọng sẽ được báo cho người dùng tài khoản qua email hoặc trong app.",
          ],
        },
      ],
    },

    cookies: {
      title: "Chính sách cookie",
      description: "Website và app SalonGo dùng cookie và công nghệ tương tự nào. Chúng tôi không dùng cookie quảng cáo hay cookie phân tích.",
      sections: [
        {
          heading: "1. Cookie là gì",
          body: [
            "Cookie là tệp nhỏ website lưu trong trình duyệt của bạn. Bộ nhớ cục bộ của trình duyệt (local storage) hoạt động tương tự.",
          ],
        },
        {
          heading: "2. Website {site} dùng gì",
          body: [
            "- NEXT_LOCALE – nhớ ngôn ngữ bạn chọn – cần thiết – tới khi đóng trình duyệt hoặc tối đa 1 năm.",
            "Website không dùng cookie phân tích, quảng cáo hay theo dõi, và không tải nội dung bên thứ ba có đặt cookie. Vì vậy chúng tôi không hỏi đồng ý: theo § 89 khoản 3 Luật số 127/2005 Sb., cookie cần thiết được dùng mà không cần đồng ý.",
            "Liên kết Facebook, Instagram, WhatsApp chỉ là liên kết thường. Cookie của các dịch vụ đó chỉ được đặt khi bạn mở chúng và theo quy định của họ.",
          ],
        },
        {
          heading: "3. App {app} dùng gì",
          body: [
            "- cookie đăng nhập và bảo mật (phiên đăng nhập, chống CSRF) – cần thiết – trong thời gian đăng nhập,",
            "- bộ nhớ cục bộ cho ngôn ngữ, giao diện và cài đặt hiển thị – cần thiết cho chức năng bạn yêu cầu.",
          ],
        },
        {
          heading: "4. Thay đổi",
          body: [
            "Nếu sau này dùng cookie phân tích hoặc marketing, chúng tôi chỉ bật khi bạn đồng ý trước qua thanh thông báo, có nút \"Từ chối\" dễ bấm như \"Đồng ý\", và sẽ cập nhật chính sách này.",
            "Bạn có thể xoá hoặc chặn cookie trong cài đặt trình duyệt. Thiếu cookie cần thiết thì có thể không đăng nhập được.",
          ],
        },
      ],
    },

    dpa: {
      title: "Thoả thuận xử lý dữ liệu (DPA)",
      description:
        "Thoả thuận xử lý dữ liệu cá nhân theo Điều 28 GDPR giữa salon (bên kiểm soát) và SalonGo (bên xử lý): phạm vi, nghĩa vụ, nhà cung cấp phụ, sự cố, xoá dữ liệu.",
      sections: [
        {
          heading: "1. Các bên và việc ký kết",
          body: [
            "Thoả thuận xử lý dữ liệu cá nhân này (gọi là \"DPA\") được ký giữa Salon (bên kiểm soát) và Người vận hành SalonGo (bên xử lý) theo Điều 28 Quy định (EU) 2016/679 (GDPR).",
            "DPA là một phần của Điều khoản dịch vụ và được ký kết khi Salon đăng ký Dịch vụ. DPA có hiệu lực trong thời gian sử dụng Dịch vụ và cho tới khi dữ liệu được xoá theo Điều 10.",
          ],
        },
        {
          heading: "2. Đối tượng, bản chất và mục đích",
          body: [
            "Bên xử lý lưu trữ và xử lý dữ liệu cá nhân mà Salon đưa vào Dịch vụ để cung cấp Dịch vụ: lịch hẹn và đặt lịch, quản lý khách, tính tiền và hoá đơn, tính lương, báo cáo, gửi nhắc lịch và tin nhắn cho khách theo chỉ dẫn của Salon, sao lưu và hỗ trợ.",
          ],
        },
        {
          heading: "3. Loại chủ thể và loại dữ liệu",
          body: [
            "Chủ thể dữ liệu: khách của Salon, nhân viên và cộng tác viên của Salon.",
            "Dữ liệu: tên, số điện thoại, email, ngày sinh, lịch sử lịch hẹn và dịch vụ, thanh toán và hoá đơn, ghi chú, ảnh, thông tin thẻ thành viên; với nhân viên thêm vai trò, doanh thu, hoa hồng, lương và tiền tip.",
            "Dữ liệu đặc biệt (ví dụ thông tin sức khoẻ như dị ứng) chỉ khi Salon nhập. Salon chịu trách nhiệm có cơ sở pháp lý theo Điều 9 GDPR.",
          ],
        },
        {
          heading: "4. Chỉ dẫn của bên kiểm soát",
          body: [
            "Bên xử lý chỉ xử lý dữ liệu theo chỉ dẫn có ghi nhận của Salon. Chỉ dẫn gồm DPA này, Điều khoản dịch vụ, và các cài đặt, thao tác Salon thực hiện trong Dịch vụ.",
            "Nếu Bên xử lý cho rằng một chỉ dẫn vi phạm pháp luật, Bên xử lý sẽ báo cho Salon.",
            "Bên xử lý không dùng dữ liệu cho mục đích riêng, nhưng có thể làm thống kê tổng hợp đã ẩn danh, không còn là dữ liệu cá nhân.",
          ],
        },
        {
          heading: "5. Bảo mật thông tin",
          body: [
            "Người được phép xử lý dữ liệu đều có nghĩa vụ giữ bí mật.",
            "Bên xử lý áp dụng biện pháp kỹ thuật và tổ chức theo Điều 32 GDPR, gồm: truyền dữ liệu mã hoá (HTTPS/TLS), mật khẩu mã hoá, tách dữ liệu các salon, phân quyền theo vai trò, hạn chế tối đa người vận hành được truy cập, sao lưu định kỳ, ghi nhật ký truy cập và cập nhật phần mềm thường xuyên.",
          ],
        },
        {
          heading: "6. Nhà cung cấp phụ (bên xử lý phụ)",
          body: [
            "Salon đồng ý chung cho việc dùng bên xử lý phụ. Danh sách hiện tại:",
            "- Vercel Inc. (Mỹ) – hosting,",
            "- Neon Inc. – cơ sở dữ liệu (AWS, Frankfurt),",
            "- Resend (Plus Five Five Inc.) – email gửi khách và người dùng,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – thông báo push,",
            "- Functional Software Inc. (Sentry) – báo lỗi,",
            "- Stripe Payments Europe Ltd. – thanh toán (nếu Salon dùng thanh toán qua Dịch vụ).",
            "Danh sách bên xử lý hiện hành của app cũng có trong chính sách bảo mật của app: {app}/legal/privacy.",
            "Bên xử lý báo cho Salon qua email hoặc trong app ít nhất 14 ngày trước khi thêm hoặc thay bên xử lý phụ. Salon có thể phản đối với lý do chính đáng; nếu hai bên không thống nhất, Salon có thể chấm dứt hợp đồng và được hoàn phần tương ứng của kỳ đã trả.",
            "Bên xử lý ràng buộc bên xử lý phụ bằng nghĩa vụ bảo vệ dữ liệu tương đương và chịu trách nhiệm về việc họ tuân thủ.",
            "Chuyển dữ liệu ra ngoài EU chỉ dựa trên quyết định về mức bảo vệ tương đương (ví dụ EU-US Data Privacy Framework) hoặc điều khoản hợp đồng mẫu.",
          ],
        },
        {
          heading: "7. Hỗ trợ thực hiện quyền của chủ thể",
          body: [
            "Dịch vụ cho phép Salon tìm, sửa, xuất và xoá dữ liệu. Nếu Salon không tự xử lý được yêu cầu của chủ thể, Bên xử lý hỗ trợ ở mức hợp lý khi được yêu cầu.",
            "Nếu Bên xử lý nhận trực tiếp yêu cầu của chủ thể, Bên xử lý chuyển cho Salon và không tự xử lý, trừ khi Salon uỷ quyền.",
          ],
        },
        {
          heading: "8. Sự cố dữ liệu",
          body: [
            "Bên xử lý báo cho Salon về sự cố vi phạm dữ liệu cá nhân không chậm trễ, chậm nhất trong 48 giờ kể từ khi phát hiện, kèm thông tin hiện có theo Điều 33 khoản 3 GDPR, để Salon thực hiện nghĩa vụ thông báo của mình.",
          ],
        },
        {
          heading: "9. Hỗ trợ khác và kiểm tra",
          body: [
            "Bên xử lý hỗ trợ Salon ở mức hợp lý khi đánh giá tác động (DPIA) và tham vấn trước với cơ quan giám sát.",
            "Bên xử lý cung cấp thông tin cần thiết để chứng minh việc tuân thủ DPA. Việc kiểm tra (audit) được báo trước bằng văn bản ít nhất 30 ngày, tối đa mỗi năm một lần, trong giờ làm việc, không làm gián đoạn hoạt động và không truy cập dữ liệu của salon khác; Salon chịu chi phí, trừ khi phát hiện vi phạm nghiêm trọng.",
          ],
        },
        {
          heading: "10. Chấm dứt: trả lại và xoá dữ liệu",
          body: [
            "Sau khi chấm dứt hợp đồng, Salon có 30 ngày để xuất dữ liệu hoặc yêu cầu bàn giao ở định dạng máy đọc được thông dụng. Sau đó Bên xử lý xoá dữ liệu; bản sao lưu được xoá chậm nhất trong 90 ngày tiếp theo, trừ khi luật yêu cầu lưu giữ.",
          ],
        },
        {
          heading: "11. Trách nhiệm và luật áp dụng",
          body: [
            "Trách nhiệm các bên theo Điều 82 GDPR và Điều khoản dịch vụ.",
            "DPA này điều chỉnh theo pháp luật Cộng hoà Séc. Khi mâu thuẫn với Điều khoản dịch vụ về bảo vệ dữ liệu cá nhân, DPA này được ưu tiên.",
          ],
        },
      ],
    },

    websiteTerms: {
      title: "Điều khoản làm website",
      description:
        "Điều khoản gói làm website cho khách hàng SalonGo ({price}, tối đa {pages} trang): phạm vi, thanh toán, thời gian, chỉnh sửa, nghiệm thu, quyền sử dụng và hosting.",
      sections: [
        {
          heading: "1. Phạm vi áp dụng",
          body: [
            "Điều khoản này áp dụng cho hợp đồng làm sản phẩm (smlouva o dílo) giữa Người vận hành SalonGo (bên làm) và salon (bên đặt) để làm website cho salon. Điều khoản dịch vụ SalonGo áp dụng bổ sung.",
            "Ưu đãi dành cho người kinh doanh đang có tài khoản SalonGo hoạt động (gói trả phí hoặc đang dùng thử) tại thời điểm đặt.",
          ],
        },
        {
          heading: "2. Đặt làm và ký kết",
          body: [
            "Có thể đặt qua điện thoại, email, Facebook, Instagram hoặc WhatsApp.",
            "Hợp đồng được ký kết khi SalonGo xác nhận bằng văn bản (email hoặc tin nhắn) đơn đặt với mẫu đã chọn, phạm vi và giá.",
          ],
        },
        {
          heading: "3. Phạm vi công việc",
          body: [
            "Giá đã gồm:",
            "- website tối đa {pages} trang (ví dụ trang chủ, dịch vụ & bảng giá, giới thiệu, hình ảnh, liên hệ) theo mẫu đã chọn hoặc ý tưởng riêng của bên đặt,",
            "- đưa chữ, ảnh, màu sắc và thông tin salon do bên đặt cung cấp vào website,",
            "- hiển thị tốt trên máy tính và điện thoại,",
            "- nút dẫn tới trang đặt lịch SalonGo, nếu salon đã bật đặt lịch online,",
            "- hai lần chỉnh sửa sau khi giao bản nháp.",
            "Giá chưa gồm: viết nội dung và dịch thuật ngoài chỉnh sửa nhỏ, chụp ảnh và mua ảnh, tên miền, hosting, bán hàng online, kết nối hệ thống khác, cam kết thứ hạng Google và các thay đổi định kỳ về sau. Các việc này có thể đặt riêng theo thoả thuận.",
          ],
        },
        {
          heading: "4. Giá và thanh toán",
          body: [
            "Giá làm website là {price}, trả một lần. Đây là giá cuối cùng.",
            "Thanh toán trước, sau khi đơn được xác nhận, theo cách ghi trong xác nhận. SalonGo bắt đầu làm khi đã nhận tiền và đủ tài liệu.",
            "Tên miền và hosting SalonGo báo giá riêng.",
          ],
        },
        {
          heading: "5. Tài liệu và thời gian",
          body: [
            "Bên đặt gửi tên, liên hệ, dịch vụ và giá, nội dung chữ, logo và ảnh. Bên đặt chịu trách nhiệm về tính chính xác và có quyền sử dụng chúng (bản quyền, nhãn hiệu, sự đồng ý của người trong ảnh).",
            "SalonGo thường giao bản nháp trong 14 ngày làm việc kể từ khi nhận tiền và đủ tài liệu. Thời hạn được kéo dài tương ứng với thời gian bên đặt chưa gửi tài liệu hoặc góp ý.",
            "Nếu sau khi được nhắc mà bên đặt vẫn không gửi tài liệu trong 60 ngày kể từ ngày đặt, SalonGo có thể chấm dứt hợp đồng; tiền được hoàn sau khi trừ phần việc đã làm, mức trừ tối đa 50% giá.",
            "SalonGo có thể từ chối đăng nội dung trái pháp luật hoặc vi phạm quyền của người khác.",
          ],
        },
        {
          heading: "6. Chỉnh sửa và nghiệm thu",
          body: [
            "Mỗi lần chỉnh sửa, bên đặt gửi góp ý một lần cho đủ. Thêm lần sửa hoặc đổi yêu cầu sau khi đã duyệt thì tính phí theo thoả thuận.",
            "Website được coi là đã giao khi SalonGo gửi đường dẫn website hoàn chỉnh. Nếu trong 7 ngày bên đặt không báo lỗi cụ thể bằng văn bản, coi như đã nghiệm thu không có ý kiến. Lỗi nhỏ không cản trở việc sử dụng không phải lý do từ chối nghiệm thu; SalonGo sẽ sửa trong thời gian hợp lý.",
          ],
        },
        {
          heading: "7. Bảo hành và trách nhiệm",
          body: [
            "Lỗi của website (ví dụ liên kết hỏng, hiển thị sai) được báo trong 30 ngày kể từ khi giao sẽ được sửa miễn phí.",
            "SalonGo không chịu trách nhiệm về nội dung bên đặt cung cấp, thứ hạng tìm kiếm, doanh thu của salon, hay sự cố tên miền và hosting của bên thứ ba.",
            "Tổng trách nhiệm của SalonGo theo hợp đồng này không vượt quá giá đã trả. Giới hạn này không áp dụng cho thiệt hại do cố ý hoặc cẩu thả nghiêm trọng.",
            "Bên đặt bồi thường cho SalonGo thiệt hại từ yêu cầu của bên thứ ba liên quan tới tài liệu bên đặt đã cung cấp.",
          ],
        },
        {
          heading: "8. Quyền đối với website",
          body: [
            "Sau khi trả đủ tiền, bên đặt được quyền sử dụng website hoàn chỉnh để quảng bá salon của mình, không độc quyền và không giới hạn thời gian, gồm cả chữ và ảnh bên đặt đã cung cấp.",
            "Mẫu, thiết kế, mã nguồn và các thành phần chung vẫn thuộc SalonGo; bên đặt không được bán lại hay dùng cho website khác. Có thể thoả thuận riêng việc bàn giao mã nguồn, có tính phí.",
            "SalonGo được giới thiệu website trong danh sách khách hàng và bài mẫu. Bên đặt có thể từ chối bất cứ lúc nào qua email.",
          ],
        },
        {
          heading: "9. Huỷ trước khi hoàn thành",
          body: [
            "Trước khi bắt đầu làm, bên đặt có thể huỷ đơn và được hoàn toàn bộ tiền.",
            "Sau khi đã bắt đầu làm, tiền hoàn được trừ giá trị phần việc đã làm. Sau khi đã giao website thì không hoàn tiền.",
          ],
        },
        {
          heading: "10. Thông tin pháp lý trên website của salon",
          body: [
            "Salon là chủ website nên chịu trách nhiệm về các nội dung pháp lý trên website của mình, nhất là thông tin người kinh doanh (tên, IČO, địa chỉ), chính sách bảo mật và cookie. SalonGo đưa lên website nội dung và thông tin do bên đặt cung cấp.",
            "Nếu salon ngừng dùng SalonGo, nút đặt lịch online sẽ không hoạt động nữa. Website vẫn thuộc về bên đặt; nếu SalonGo đang host website thì việc hosting theo thoả thuận riêng.",
          ],
        },
        {
          heading: "11. Điều khoản cuối",
          body: [
            "Hợp đồng điều chỉnh theo pháp luật Cộng hoà Séc, nhất là § 2586 và các điều tiếp theo của Bộ luật Dân sự. Các vấn đề khác theo Điều khoản dịch vụ SalonGo.",
          ],
        },
      ],
    },
  },
};
