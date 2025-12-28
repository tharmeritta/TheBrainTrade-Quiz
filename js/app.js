// Destructure globals from the UMD scripts loaded in index.html
const { useState, useEffect, useCallback } = React;
const { createRoot } = ReactDOM;

// ==========================================
// CONSTANTS & DATA
// ==========================================

const UI_STRINGS = {
    en: {
        qLabel: "Question",
        scoreLabel: "Score",
        finishTitle: "Assessment Completed",
        finishSub: "Your Performance Results",
        outOf: "out of",
        correct: "Correct",
        incorrect: "Incorrect. The correct answer is:",
        submit: "Submit Answer",
        placeholder: "Enter your answer...",
        trueTxt: "True",
        falseTxt: "False",
        msgHigh: "Outstanding! You demonstrate expert-level knowledge of The Brain Trade.",
        msgMed: "Great job. You have a solid understanding of our system.",
        msgLow: "Keep learning. We recommend reviewing The Brain Trade materials again.",
        backToHome: "Return to Home",
        startQuiz: "Start Assessment",
        selectQuiz: "Select Assessment Module",
        understandingTitle: "System Understanding",
        salesTitle: "Sales Logic & Strategy",
        enterNameLabel: "Enter your name to start",
        namePlaceholder: "Your Name",
        startBtn: "Start Quiz",
        hello: "Hello"
    },
    vi: {
        qLabel: "Câu hỏi",
        scoreLabel: "Điểm số",
        finishTitle: "Hoàn thành đánh giá",
        finishSub: "Kết quả của bạn",
        outOf: "trên",
        correct: "Chính xác",
        incorrect: "Chưa chính xác. Đáp án đúng là:",
        submit: "Gửi câu trả lời",
        placeholder: "Nhập câu trả lời của bạn...",
        trueTxt: "Đúng",
        falseTxt: "Sai",
        msgHigh: "Xuất sắc! Bạn thể hiện kiến thức chuyên sâu về The Brain Trade.",
        msgMed: "Làm tốt lắm. Bạn có nền tảng kiến thức vững chắc về hệ thống.",
        msgLow: "Cần cố gắng thêm. Chúng tôi khuyên bạn nên xem lại các tài liệu về The Brain Trade.",
        backToHome: "Về trang chủ",
        startQuiz: "Bắt đầu",
        selectQuiz: "Chọn bài đánh giá",
        understandingTitle: "Hiểu biết về hệ thống",
        salesTitle: "Tư duy & Chiến lược bán hàng",
        enterNameLabel: "Nhập tên của bạn để bắt đầu",
        namePlaceholder: "Tên của bạn",
        startBtn: "Bắt đầu bài kiểm tra",
        hello: "Xin chào"
    },
    th: {
        qLabel: "คำถามที่",
        scoreLabel: "คะแนน",
        finishTitle: "การประเมินเสร็จสมบูรณ์",
        finishSub: "ผลลัพธ์ของคุณ",
        outOf: "จาก",
        correct: "ถูกต้อง",
        incorrect: "ไม่ถูกต้อง คำตอบที่ถูกคือ:",
        submit: "ส่งคำตอบ",
        placeholder: "กรุณาระบุคำตอบ...",
        trueTxt: "จริง",
        falseTxt: "เท็จ",
        msgHigh: "ยอดเยี่ยม! คุณมีความรู้ความเข้าใจในระดับผู้เชี่ยวชาญเกี่ยวกับ The Brain Trade",
        msgMed: "ทำได้ดีมาก คุณมีความเข้าใจระบบของเราเป็นอย่างดี",
        msgLow: "ควรศึกษาเพิ่มเติม เราแนะนำให้ทบทวนข้อมูลของ The Brain Trade อีกครั้ง",
        backToHome: "กลับสู่หน้าหลัก",
        startQuiz: "เริ่มทำแบบทดสอบ",
        selectQuiz: "เลือกหัวข้อการประเมิน",
        understandingTitle: "ความเข้าใจระบบ",
        salesTitle: "ตรรกะและกลยุทธ์การขาย",
        enterNameLabel: "กรอกชื่อของคุณเพื่อเริ่มทำแบบทดสอบ",
        namePlaceholder: "ชื่อของคุณ",
        startBtn: "เริ่มทำแบบทดสอบ",
        hello: "สวัสดี"
    }
};

const UNDERSTANDING_DATA = [
    {
        en: "The parent company of The Brain Trade is headquartered in Bulgaria.",
        vi: "Công ty mẹ của The Brain Trade có trụ sở chính tại Bulgaria.",
        th: "สำนักงานใหญ่ของบริษัทแม่ The Brain Trade ตั้งอยู่ที่ประเทศบัลแกเรีย",
        type: "tf",
        a: "true"
    },
    {
        en: "Which trading platform application do clients use to execute trades?",
        vi: "Khách hàng sử dụng ứng dụng nền tảng nào để thực hiện giao dịch?",
        th: "ลูกค้าใช้งานแอปพลิเคชันแพลตฟอร์มใดในการดำเนินการซื้อขาย?",
        type: "mcq",
        options: {
            en: ["MetaTrader 4", "cTrader", "Zenstox (via BrainTrade website)", "TradingView"],
            vi: ["MetaTrader 4", "cTrader", "Zenstox (trên trang web BrainTrade)", "TradingView"],
            th: ["MetaTrader 4", "cTrader", "Zenstox (ผ่านเว็บไซต์ BrainTrade)", "TradingView"]
        },
        correctIdx: 2
    },
    {
        en: "Clients are restricted to learning about trading exclusively through The Brain Trade.",
        vi: "Khách hàng bị giới hạn chỉ có thể tìm hiểu về giao dịch thông qua The Brain Trade.",
        th: "ลูกค้าถูกจำกัดให้เรียนรู้เกี่ยวกับการเทรดผ่าน The Brain Trade เท่านั้น",
        type: "tf",
        a: "true"
    },
    {
        en: "Which communication channel does The Brain Trade's advisory team primarily use to contact clients?",
        vi: "Đội ngũ tư vấn của The Brain Trade chủ yếu sử dụng kênh liên lạc nào để kết nối với khách hàng?",
        th: "ทีมที่ปรึกษาของ The Brain Trade ใช้ช่องทางใดเป็นหลักในการติดต่อลูกค้า?",
        type: "mcq",
        options: {
            en: ["LINE", "Facebook Messenger", "Phone Call", "Email"],
            vi: ["LINE", "Facebook Messenger", "Điện thoại", "Email"],
            th: ["LINE", "Facebook Messenger", "โทรศัพท์", "อีเมล"]
        },
        correctIdx: 2
    },
    {
        en: "Following a client's deposit, within what timeframe will the advisory team initiate contact?",
        vi: "Sau khi khách hàng thực hiện nạp tiền, đội ngũ tư vấn sẽ liên hệ trong khoảng thời gian bao lâu?",
        th: "หลังจากลูกค้าดำเนินการฝากเงิน ทีมที่ปรึกษาจะติดต่อกลับภายในระยะเวลากี่ชั่วโมง?",
        type: "mcq",
        options: {
            en: ["24 hours", "48 hours", "72 hours", "1 week"],
            vi: ["24 giờ", "48 giờ", "72 giờ", "1 tuần"],
            th: ["24 ชั่วโมง", "48 ชั่วโมง", "72 ชั่วโมง", "1 สัปดาห์"]
        },
        correctIdx: 2
    },
    {
        en: "Clients must deposit a minimum of ______ USD to unlock the All-in-one Platform and receive a Free Trading Account.",
        vi: "Khách hàng cần nạp tối thiểu ______ USD để mở khóa Nền tảng Tất cả trong một và nhận Tài khoản Giao dịch Miễn phí.",
        th: "ลูกค้าต้องฝากเงินขั้นต่ำ ______ USD เพื่อปลดล็อกแพลตฟอร์ม All-in-one และรับบัญชีเทรดฟรี",
        type: "fill",
        a: "100"
    },
    {
        en: "Clients are eligible to request a 100% refund within 48 hours of their deposit.",
        vi: "Khách hàng đủ điều kiện yêu cầu hoàn tiền 100% trong vòng 48 giờ sau khi nạp tiền.",
        th: "ลูกค้ามีสิทธิ์ขอคืนเงินเต็มจำนวน (100%) ภายใน 48 ชั่วโมงหลังจากทำรายการฝาก",
        type: "tf",
        a: "true"
    },
    {
        en: "What are the maximum and minimum bonus percentages authorized for clients?",
        vi: "Tỷ lệ phần trăm tiền thưởng tối đa và tối thiểu được phép áp dụng cho khách hàng là bao nhiêu?",
        th: "อัตราโบนัสสูงสุดและต่ำสุดที่ได้รับอนุญาตให้นำเสนอกับลูกค้าคือเท่าใด?",
        type: "mcq",
        options: {
            en: ["Max 100% and Min 50%", "Max 80% and Min 40%", "Max 120% and Min 60%", "Max 75% and Min 25%"],
            vi: ["Tối đa 100% và Tối thiểu 50%", "Tối đa 80% và Tối thiểu 40%", "Tối đa 120% và Tối thiểu 60%", "Tối đa 75% và Tối thiểu 25%"],
            th: ["สูงสุด 100% และต่ำสุด 50%", "สูงสุด 80% และต่ำสุด 40%", "สูงสุด 120% และต่ำสุด 60%", "สูงสุด 75% และต่ำสุด 25%"]
        },
        correctIdx: 0
    }
];

const SALES_DATA = [
    {
        en: 'Client: "I don\'t want to lose money on trading courses. I\'ve failed before." What is the most strategic response?',
        vi: 'Khách hàng: "Tôi không muốn mất tiền vào các khóa học giao dịch. Tôi đã từng thất bại." Phản hồi chiến lược nhất là gì?',
        th: 'ลูกค้า: "ผมไม่อยากเสียเงินกับคอร์สเทรดอีก ผมเคยล้มเหลวมาก่อน" คำตอบเชิงกลยุทธ์ที่ดีที่สุดคือ?',
        type: 'mcq',
        options: {
            en: ["Our course is different from others.", "Many people fail but eventually profit.", "The initial amount isn't a fee; it becomes your own trading capital.", "If you don't try, you will never succeed."],
            vi: ["Khóa học của chúng tôi khác biệt so với những nơi khác.", "Nhiều người thất bại nhưng cuối cùng vẫn có lãi.", "Khoản tiền ban đầu không phải là học phí; nó là vốn giao dịch của riêng bạn.", "Nếu bạn không thử, bạn sẽ không bao giờ thành công."],
            th: ["คอร์สของเราแตกต่างจากที่อื่น", "หลายคนเคยล้มเหลวแต่สุดท้ายก็ทำกำไรได้", "เงินเริ่มต้นไม่ใช่ค่าธรรมเนียม แต่เป็นเงินทุนสำหรับเทรดของคุณเอง", "ถ้าไม่ลอง คุณก็จะไม่มีวันประสบความสำเร็จ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "So, what is the total cost I need to pay?" Which response aligns with BrainTrade logic?',
        vi: 'Khách hàng: "Vậy, tổng chi phí tôi cần trả là bao nhiêu?" Phản hồi nào phù hợp với logic của BrainTrade?',
        th: 'ลูกค้า: "สรุปแล้วผมต้องจ่ายทั้งหมดเท่าไหร่?" คำตอบใดสอดคล้องกับตรรกะของ BrainTrade?',
        type: 'mcq',
        options: {
            en: ["The package costs $500.", "This is a bundle including a course and account.", "It is $500 in starting capital, fully available for you to trade.", "The price is very valuable."],
            vi: ["Gói này có giá 500 USD.", "Đây là gói bao gồm khóa học và tài khoản.", "Đó là 500 USD vốn khởi đầu, hoàn toàn thuộc quyền sử dụng của bạn để giao dịch.", "Mức giá này rất xứng đáng."],
            th: ["แพ็คเกจราคา 500 USD", "นี่เป็นชุดรวมคอร์สและบัญชี", "มันคือเงินทุนเริ่มต้น 500 USD ที่คุณนำไปเทรดได้เต็มจำนวน", "ราคานี้คุ้มค่ามาก"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "Sounds too good to be true. Are there hidden fees?" Best response to build trust?',
        vi: 'Khách hàng: "Nghe có vẻ quá tốt để là sự thật. Có phí ẩn nào không?" Phản hồi tốt nhất để xây dựng lòng tin?',
        th: 'ลูกค้า: "ฟังดูดีเกินจริง มีค่าใช้จ่ายแอบแฝงไหม?" คำตอบใดสร้างความเชื่อมั่นได้ดีที่สุด?',
        type: 'mcq',
        options: {
            en: ["No hidden fees, I promise.", "We are an established company with many clients.", "We do not charge you for education; our revenue is generated from broker commissions when you trade.", "Every business requires profit."],
            vi: ["Tôi hứa là không có phí ẩn.", "Chúng tôi là công ty lâu năm với nhiều khách hàng.", "Chúng tôi không thu phí đào tạo; doanh thu của chúng tôi đến từ hoa hồng sàn khi bạn giao dịch.", "Mọi doanh nghiệp đều cần lợi nhuận."],
            th: ["ไม่มีค่าใช้จ่ายแอบแฝงครับ ผมรับรอง", "เราเป็นบริษัทที่มั่นคงและมีลูกค้ามากมาย", "เราไม่คิดค่าสอนครับ รายได้ของเรามาจากค่าคอมมิชชั่นของโบรกเกอร์เมื่อคุณเทรด", "ทุกธุรกิจต้องมีกำไรครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "I already have a trading account elsewhere. Can I use that instead?" Most strategic response?',
        vi: 'Khách hàng: "Tôi đã có tài khoản giao dịch ở nơi khác. Tôi dùng nó được không?" Phản hồi chiến lược nhất?',
        th: 'ลูกค้า: "ผมมีบัญชีเทรดที่อื่นอยู่แล้ว ใช้บัญชีเดิมได้ไหม?" คำตอบเชิงกลยุทธ์ที่สุดคือ?',
        type: 'mcq',
        options: {
            en: ["Our platform is easier to use.", "It doesn't matter where you trade.", "Using our integrated ecosystem allows our Mentors to accurately guide your portfolio.", "Other brokers don't support this."],
            vi: ["Nền tảng của chúng tôi dễ sử dụng hơn.", "Bạn giao dịch ở đâu không quan trọng.", "Sử dụng hệ sinh thái tích hợp giúp Mentor của chúng tôi hướng dẫn danh mục đầu tư của bạn chính xác hơn.", "Các sàn khác không hỗ trợ việc này."],
            th: ["แพลตฟอร์มของเราใช้งานง่ายกว่า", "เทรดที่ไหนก็เหมือนกันครับ", "การใช้ระบบที่เชื่อมโยงกันจะช่วยให้ Mentor ของเราดูแลพอร์ตของคุณได้อย่างแม่นยำครับ", "โบรกเกอร์อื่นไม่รองรับครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "I don\'t want to switch everything, it\'s too much hassle." Best response?',
        vi: 'Khách hàng: "Tôi không muốn chuyển đổi mọi thứ, phiền phức quá." Phản hồi tốt nhất?',
        th: 'ลูกค้า: "ไม่อยากย้ายอะไรให้วุ่นวาย มันยุ่งยาก" คำตอบที่ดีที่สุดคือ?',
        type: 'mcq',
        options: {
            en: ["You don't have to switch.", "Just move once and it's done.", "I understand. Since capital is critical, we designed this ecosystem so Mentors can fully support your growth.", "Most clients switch."],
            vi: ["Bạn không cần phải chuyển.", "Chỉ cần chuyển một lần là xong.", "Tôi hiểu. Vì vốn là quan trọng, chúng tôi thiết kế hệ sinh thái này để Mentor có thể hỗ trợ toàn diện cho sự phát triển của bạn.", "Hầu hết khách hàng đều chuyển."],
            th: ["ไม่จำเป็นต้องย้ายก็ได้ครับ", "ย้ายแค่ครั้งเดียวก็จบครับ", "เข้าใจครับ เพราะเงินทุนสำคัญ เราจึงออกแบบระบบนี้เพื่อให้ Mentor ดูแลคุณได้อย่างเต็มที่", "ลูกค้าส่วนใหญ่ก็ย้ายกันครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "I\'ll just start with $100." Response according to logic?',
        vi: 'Khách hàng: "Tôi sẽ chỉ bắt đầu với 100 USD." Phản hồi theo đúng logic?',
        th: 'ลูกค้า: "ขอเริ่มแค่ 100 USD ก่อนละกัน" คำตอบที่ตรงตามตรรกะคือ?',
        type: 'mcq',
        options: {
            en: ["Sure, start small first.", "$100 is low risk.", "$100 is the minimum, but the level of support and education differs significantly from the $500 tier.", "Most people start at $100."],
            vi: ["Được chứ, hãy bắt đầu nhỏ trước.", "100 USD có rủi ro thấp.", "100 USD là mức tối thiểu, nhưng mức độ hỗ trợและ đào tạo sẽ khác biệt đáng kể so với mức 500 USD.", "Đa số mọi người bắt đầu ở mức 100 USD."],
            th: ["ได้ครับ เริ่มเล็กๆ ก่อน", "100 USD ความเสี่ยงต่ำครับ", "100 USD คือขั้นต่ำครับ แต่ระดับการดูแลและความรู้ที่จะได้รับจะต่างจากระดับ 500 USD มากครับ", "คนส่วนใหญ่ก็เริ่มที่ 100 USD ครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "What if I trade and lose? Is my money gone?" Most safety-focused response?',
        vi: 'Khách hàng: "Nếu tôi giao dịch thua lỗ thì sao? Tiền của tôi có mất hết không?" Phản hồi tập trung vào sự an toàn?',
        th: 'ลูกค้า: "ถ้าเทรดเสียล่ะ? เงินผมจะหายหมดไหม?" คำตอบที่เน้นความปลอดภัยมากที่สุด?',
        type: 'mcq',
        options: {
            en: ["Investment always carries risk.", "We have an excellent course.", "You will have a Mentor guiding you; you won't be making isolated decisions.", "Everyone loses sometimes."],
            vi: ["Đầu tư luôn đi kèm rủi ro.", "Chúng tôi có khóa học tuyệt vời.", "Bạn sẽ có Mentor hướng dẫn; bạn sẽ không phải đưa ra quyết định một mình.", "Ai cũng có lúc thua lỗ."],
            th: ["การลงทุนมีความเสี่ยงเสมอครับ", "เรามีคอร์สเรียนที่ดีเยี่ยม", "คุณจะมี Mentor คอยแนะนำครับ คุณจะไม่ต้องตัดสินใจเพียงลำพัง", "ใครๆ ก็เคยขาดทุนครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "What do you get out of me?" Best trust-building response?',
        vi: 'Khách hàng: "Bạn được lợi gì từ tôi?" Phản hồi xây dựng lòng tin tốt nhất?',
        th: 'ลูกค้า: "คุณได้อะไรจากผม?" คำตอบที่สร้างความเชื่อมั่นได้ดีที่สุด?',
        type: 'mcq',
        options: {
            en: ["We sell packages.", "We earn from the course fees.", "We earn commissions from the broker only when you trade and remain active in the system.", "It's company business."],
            vi: ["Chúng tôi bán các gói sản phẩm.", "Chúng tôi thu từ phí khóa học.", "Chúng tôi nhận hoa hồng từ sàn môi giới chỉ khi bạn giao dịch và duy trì hoạt động trong hệ thống.", "Đó là việc kinh doanh của công ty."],
            th: ["เราขายแพ็คเกจครับ", "เราได้รายได้จากค่าคอร์สครับ", "เราได้รับค่าคอมมิชชั่นจากโบรกเกอร์ก็ต่อเมื่อคุณเทรดและยังอยู่ในระบบครับ", "เป็นเรื่องธุรกิจของบริษัทครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Client: "I\'m still not sure if I should start." Soft close with strategic logic?',
        vi: 'Khách hàng: "Tôi vẫn chưa chắc có nên bắt đầu không." Chốt nhẹ nhàng với logic chiến lược?',
        th: 'ลูกค้า: "ยังไม่แน่ใจว่าจะเริ่มดีไหม" การปิดการขายแบบนุ่มนวลด้วยตรรกะเชิงกลยุทธ์?',
        type: 'mcq',
        options: {
            en: ["Decide quickly.", "Opportunities don't come often.", "You aren't spending money; you are simply allocating capital to invest in yourself with a professional support team.", "If you don't start, you won't see results."],
            vi: ["Hãy quyết định nhanh chóng.", "Cơ hội không đến thường xuyên.", "Bạn không hề tiêu tiền; bạn chỉ đang phân bổ vốn để đầu tư vào bản thân với một đội ngũ hỗ trợ chuyên nghiệp.", "Nếu không bắt đầu sẽ không có kết quả."],
            th: ["รีบตัดสินใจนะครับ", "โอกาสไม่ได้มีบ่อยๆ", "คุณไม่ได้กำลังเสียเงินครับ คุณเพียงแค่จัดสรรเงินทุนเพื่อลงทุนในตัวเองโดยมีทีมงานมืออาชีพคอยดูแล", "ถ้าไม่เริ่ม ก็ไม่เห็นผลลัพธ์ครับ"]
        },
        correctIdx: 2
    },
    {
        en: 'Summary: How would you succinctly describe the business model?',
        vi: 'Tóm tắt: Bạn mô tả mô hình kinh doanh này ngắn gọn như thế nào?',
        th: 'สรุป: คุณจะอธิบายโมเดลธุรกิจนี้สั้นๆ ว่าอย่างไร?',
        type: 'mcq',
        options: {
            en: ["It's an all-in-one trading course.", "It's a package deal with an account.", "You utilize your own capital to invest, while we provide systemized education and mentorship guidance.", "Our system is superior."],
            vi: ["Đó là khóa học giao dịch tất cả trong một.", "Đó là gói sản phẩm kèm tài khoản.", "Bạn sử dụng vốn của chính mình để đầu tư, trong khi chúng tôi cung cấp giáo dục hệ thống hóa và hướng dẫn từ Mentor.", "Hệ thống của chúng tôi vượt trội."],
            th: ["เป็นคอร์สเทรดแบบครบวงจร", "เป็นแพ็คเกจพร้อมบัญชี", "คุณใช้เงินทุนของตัวเองในการลงทุน ส่วนเรามอบความรู้ที่เป็นระบบและคำแนะนำจาก Mentor", "ระบบของเราดีที่สุด"]
        },
        correctIdx: 2
    }
];

const PROCESS_MASTERY_DATA = [
    {
        en: "As a new user, what is the mandatory first step to correctly initiate usage of BrainTrade?",
        vi: "Là người dùng mới, bước bắt buộc đầu tiên để bắt đầu sử dụng BrainTrade đúng cách là gì?",
        th: "ในฐานะผู้ใช้งานใหม่ ขั้นตอนแรกที่จำเป็นเพื่อเริ่มใช้งาน BrainTrade อย่างถูกต้องคืออะไร?",
        type: 'mcq',
        options: {
            en: ["Select a broker", "Transfer funds to trading account", "Register an account on the BrainTrade website", "Contact support to request an account"],
            vi: ["Chọn nhà môi giới", "Chuyển tiền vào tài khoản giao dịch", "Đăng ký tài khoản trên trang web BrainTrade", "Liên hệ hỗ trợ để yêu cầu mở tài khoản"],
            th: ["เลือกโบรกเกอร์", "โอนเงินเข้าบัญชีเทรด", "ลงทะเบียนบัญชีบนเว็บไซต์ BrainTrade", "ติดต่อฝ่ายสนับสนุนเพื่อขอเปิดบัญชี"]
        },
        correctIdx: 2
    },
    {
        en: "Upon registration, why does the system restrict immediate trading access?",
        vi: "Sau khi đăng ký, tại sao hệ thống lại hạn chế quyền truy cập giao dịch ngay lập tức?",
        th: "เมื่อลงทะเบียนแล้ว ทำไมระบบจึงยังจำกัดไม่ให้เข้าเทรดได้ทันที?",
        type: 'mcq',
        options: {
            en: ["A course package has not been selected yet", "KYC identity verification is pending", "Trading strategy configuration is missing", "Market hours are closed"],
            vi: ["Chưa chọn gói khóa học", "Đang chờ xác minh danh tính KYC", "Thiếu cấu hình chiến lược giao dịch", "Thị trường đang đóng cửa"],
            th: ["ยังไม่ได้เลือกแพ็คเกจคอร์ส", "รอการยืนยันตัวตน (KYC)", "ยังไม่ได้กำหนดกลยุทธ์การเทรด", "ตลาดปิดทำการ"]
        },
        correctIdx: 0
    },
    {
        en: "BrainTrade packages range from $100 to $2,000. What is the primary differentiator between these tiers?",
        vi: "Các gói BrainTrade dao động từ 100 đến 2.000 USD. Điểm khác biệt chính giữa các cấp độ này là gì?",
        th: "แพ็คเกจ BrainTrade มีราคาตั้งแต่ 100 ถึง 2,000 USD ความแตกต่างหลักระหว่างระดับเหล่านี้คืออะไร?",
        type: 'mcq',
        options: {
            en: ["Withdrawal processing speed", "Access to functions, tools, and usage rights", "Internet connection speed for trading", "Company advertising allocation"],
            vi: ["Tốc độ xử lý rút tiền", "Quyền truy cập vào các chức năng, công cụ và quyền sử dụng", "Tốc độ kết nối internet để giao dịch", "Phân bổ quảng cáo của công ty"],
            th: ["ความเร็วในการถอนเงิน", "การเข้าถึงฟังก์ชัน เครื่องมือ และสิทธิ์การใช้งาน", "ความเร็วอินเทอร์เน็ตสำหรับการเทรด", "งบโฆษณาของบริษัท"]
        },
        correctIdx: 1
    },
    {
        en: "If you purchase a $500 package, how is this capital utilized within the system?",
        vi: "Nếu bạn mua gói 500 USD, nguồn vốn này được sử dụng như thế nào trong hệ thống?",
        th: "หากคุณซื้อแพ็คเกจ 500 USD เงินทุนส่วนนี้จะถูกนำไปใช้ในระบบอย่างไร?",
        type: 'mcq',
        options: {
            en: ["Strictly as a tuition fee", "As a monthly subscription fee", "As accessible capital in your personal trading account", "As a non-refundable security deposit"],
            vi: ["Hoàn toàn là học phí", "Là phí đăng ký hàng tháng", "Là vốn khả dụng trong tài khoản giao dịch cá nhân của bạn", "Là tiền đặt cọc không hoàn lại"],
            th: ["เป็นค่าเล่าเรียนทั้งหมด", "เป็นค่าสมาชิกรายเดือน", "เป็นเงินทุนที่ใช้ได้จริงในบัญชีเทรดส่วนตัวของคุณ", "เป็นเงินประกันที่ไม่สามารถขอคืนได้"]
        },
        correctIdx: 2
    },
    {
        en: "What occurs if the payment process is not fully completed?",
        vi: "Điều gì sẽ xảy ra nếu quá trình thanh toán không được hoàn tất?",
        th: "จะเกิดอะไรขึ้นหากขั้นตอนการชำระเงินยังไม่เสร็จสมบูรณ์?",
        type: 'mcq',
        options: {
            en: ["The system generates a trading account automatically", "Limited trading access is granted", "Progression to trade account setup is blocked", "Funds are credited via credit later"],
            vi: ["Hệ thống tự động tạo tài khoản giao dịch", "Được cấp quyền giao dịch hạn chế", "Không thể tiếp tục đến bước thiết lập tài khoản giao dịch", "Tiền sẽ được ghi nợ sau"],
            th: ["ระบบจะสร้างบัญชีเทรดโดยอัตโนมัติ", "สามารถเทรดได้ในวงจำกัด", "ไม่สามารถดำเนินการตั้งค่าบัญชีเทรดต่อได้", "เงินจะถูกเครดิตให้ในภายหลัง"]
        },
        correctIdx: 2
    },
    {
        en: "Which interface is displayed immediately following a successful payment?",
        vi: "Giao diện nào được hiển thị ngay sau khi thanh toán thành công?",
        th: "หน้าจอใดจะปรากฏขึ้นทันทีหลังจากชำระเงินสำเร็จ?",
        type: 'mcq',
        options: {
            en: ["Broker selection interface", "Payment Confirmation screen with a 'Done' button", "Trading Dashboard", "Error log screen"],
            vi: ["Giao diện chọn nhà môi giới", "Màn hình Xác nhận thanh toán với nút 'Done'", "Bảng điều khiển giao dịch", "Màn hình nhật ký lỗi"],
            th: ["หน้าเลือกโบรกเกอร์", "หน้าจอยืนยันการชำระเงินพร้อมปุ่ม 'Done'", "แดชบอร์ดการเทรด", "หน้าบันทึกข้อผิดพลาด"]
        },
        correctIdx: 1
    },
    {
        en: "What is the critical function of the 'Done' button on the confirmation screen?",
        vi: "Chức năng quan trọng của nút 'Done' trên màn hình xác nhận là gì?",
        th: "ฟังก์ชันสำคัญของปุ่ม 'Done' บนหน้าจอยืนยันคืออะไร?",
        type: 'mcq',
        options: {
            en: ["To initiate a refund", "To revert to package selection", "To advance to the trade account setup phase", "To download the transaction receipt"],
            vi: ["Để bắt đầu hoàn tiền", "Để quay lại chọn gói", "Để chuyển sang giai đoạn thiết lập tài khoản giao dịch", "Để tải xuống biên lai giao dịch"],
            th: ["เพื่อทำเรื่องขอคืนเงิน", "เพื่อกลับไปเลือกแพ็คเกจ", "เพื่อเข้าสู่ขั้นตอนการตั้งค่าบัญชีเทรด", "เพื่อดาวน์โหลดใบเสร็จรับเงิน"]
        },
        correctIdx: 2
    },
    {
        en: "After selecting 'Done', the system redirects to the Trade page. What is the immediate next action?",
        vi: "Sau khi chọn 'Done', hệ thống chuyển hướng đến trang Trade. Hành động tiếp theo ngay lập tức là gì?",
        th: "หลังจากกด 'Done' ระบบจะเปลี่ยนไปหน้า Trade สิ่งที่ต้องทำทันทีคืออะไร?",
        type: 'mcq',
        options: {
            en: ["Execute market orders immediately", "Select the preferred broker to integrate", "Configure withdrawal methods", "Inject additional capital"],
            vi: ["Thực hiện lệnh thị trường ngay lập tức", "Chọn nhà môi giới ưu tiên để tích hợp", "Cấu hình phương thức rút tiền", "Nạp thêm vốn"],
            th: ["ส่งคำสั่งซื้อขายทันที", "เลือกโบรกเกอร์ที่ต้องการเชื่อมต่อ", "ตั้งค่าวิธีการถอนเงิน", "เพิ่มเงินทุน"]
        },
        correctIdx: 1
    },
    {
        en: "Why is selecting a broker mandatory before a trading account is opened?",
        vi: "Tại sao việc chọn nhà môi giới là bắt buộc trước khi mở tài khoản giao dịch?",
        th: "ทำไมจึงจำเป็นต้องเลือกโบรกเกอร์ก่อนเปิดบัญชีเทรด?",
        type: 'mcq',
        options: {
            en: ["To configure technical chart preferences", "To establish the link between the trading account and the specific broker", "To compute tax liabilities", "To set the system language interface"],
            vi: ["Để cấu hình tùy chọn biểu đồ kỹ thuật", "Để thiết lập liên kết giữa tài khoản giao dịch và nhà môi giới cụ thể", "Để tính toán nghĩa vụ thuế", "Để thiết lập giao diện ngôn ngữ hệ thống"],
            th: ["เพื่อตั้งค่ากราฟเทคนิค", "เพื่อเชื่อมโยงบัญชีเทรดกับโบรกเกอร์ที่เลือก", "เพื่อคำนวณภาษี", "เพื่อตั้งค่าภาษาของระบบ"]
        },
        correctIdx: 1
    },
    {
        en: "What user action is required prior to clicking the 'Open Account' button?",
        vi: "Hành động nào của người dùng là bắt buộc trước khi nhấp vào nút 'Open Account' (Mở tài khoản)?",
        th: "ผู้ใช้ต้องทำอะไรก่อนคลิกปุ่ม 'Open Account' (เปิดบัญชี)?",
        type: 'mcq',
        options: {
            en: ["Fund the account with additional deposits", "Acknowledge and accept the Terms & Conditions", "Contact the Support Team", "Upload identification documents"],
            vi: ["Nạp thêm tiền vào tài khoản", "Xác nhận và chấp nhận Điều khoản & Điều kiện", "Liên hệ với Đội ngũ Hỗ trợ", "Tải lên tài liệu nhận dạng"],
            th: ["ฝากเงินเพิ่มเข้าบัญชี", "ยอมรับข้อกำหนดและเงื่อนไข", "ติดต่อทีมสนับสนุน", "อัปโหลดเอกสารยืนยันตัวตน"]
        },
        correctIdx: 1
    },
    {
        en: "Upon successful account creation, what is the primary metric to verify?",
        vi: "Sau khi tạo tài khoản thành công, chỉ số chính cần xác minh là gì?",
        th: "เมื่อสร้างบัญชีสำเร็จแล้ว ข้อมูลหลักที่ควรตรวจสอบคืออะไร?",
        type: 'mcq',
        options: {
            en: ["Total allowable trade volume", "Current trading account balance", "Historical withdrawal logs", "Educational course progress"],
            vi: ["Tổng khối lượng giao dịch cho phép", "Số dư tài khoản giao dịch hiện tại", "Nhật ký rút tiền lịch sử", "Tiến độ khóa học giáo dục"],
            th: ["ปริมาณการซื้อขายทั้งหมดที่อนุญาต", "ยอดเงินคงเหลือในบัญชีเทรดปัจจุบัน", "ประวัติการถอนเงิน", "ความคืบหน้าของคอร์สเรียน"]
        },
        correctIdx: 1
    },
    {
        en: "If a $1,000 package was purchased and the account opened, what should the balance reflect?",
        vi: "Nếu gói 1.000 USD được mua và tài khoản đã mở, số dư sẽ hiển thị là bao nhiêu?",
        th: "หากซื้อแพ็คเกจ 1,000 USD และเปิดบัญชีแล้ว ยอดเงินควรแสดงเป็นเท่าไหร่?",
        type: 'mcq',
        options: {
            en: ["$0 USD", "$100 USD", "$1,000 USD", "Zero balance pending first trade"],
            vi: ["0 USD", "100 USD", "1.000 USD", "Số dư bằng 0 chờ giao dịch đầu tiên"],
            th: ["0 USD", "100 USD", "1,000 USD", "ยอดเป็นศูนย์จนกว่าจะเริ่มเทรด"]
        },
        correctIdx: 2
    },
    {
        en: "Under which specific condition is immediate trading authorized?",
        vi: "Trong điều kiện cụ thể nào thì việc giao dịch ngay lập tức được cho phép?",
        th: "ภายใต้เงื่อนไขใดที่อนุญาตให้เริ่มเทรดได้ทันที?",
        type: 'mcq',
        options: {
            en: ["Registration is finalized", "Package selection is complete", "Payment is made but account creation is pending", "Account is successfully opened with visible balance"],
            vi: ["Đăng ký đã hoàn tất", "Chọn gói đã hoàn tất", "Đã thanh toán nhưng chưa tạo tài khoản", "Tài khoản được mở thành công với số dư hiển thị"],
            th: ["ลงทะเบียนเสร็จสมบูรณ์", "เลือกแพ็คเกจเรียบร้อย", "ชำระเงินแล้วแต่ยังไม่ได้สร้างบัญชี", "เปิดบัญชีสำเร็จและมียอดเงินแสดง"]
        },
        correctIdx: 3
    },
    {
        en: "True/False: Clients are permitted to commence trading without selecting a broker.",
        vi: "Đúng/Sai: Khách hàng được phép bắt đầu giao dịch mà không cần chọn nhà môi giới.",
        th: "จริง/เท็จ: ลูกค้าได้รับอนุญาตให้เริ่มเทรดได้โดยไม่ต้องเลือกโบรกเกอร์",
        type: 'tf',
        a: "false"
    },
    {
        en: "True/False: Funds paid for the package are fully allocated as usable trading capital in the client's account.",
        vi: "Đúng/Sai: Tiền thanh toán cho gói được phân bổ hoàn toàn làm vốn giao dịch có thể sử dụng trong tài khoản của khách hàng.",
        th: "จริง/เท็จ: เงินที่ชำระค่าแพ็คเกจจะถูกจัดสรรเป็นเงินทุนสำหรับเทรดในบัญชีของลูกค้าเต็มจำนวน",
        type: 'tf',
        a: "true"
    }
];

const QUIZZES = [
    {
        id: 'understanding',
        title: {
            en: "System Understanding",
            vi: "Hiểu biết về hệ thống",
            th: "ความเข้าใจระบบ"
        },
        description: {
            en: "Verify your comprehensive knowledge of The Brain Trade ecosystem.",
            vi: "Kiểm tra kiến thức toàn diện của bạn về hệ sinh thái The Brain Trade.",
            th: "ตรวจสอบความรู้ความเข้าใจเกี่ยวกับระบบนิเวศ The Brain Trade ของคุณ"
        },
        questions: UNDERSTANDING_DATA
    },
    {
        id: 'sales',
        title: {
            en: "Sales Logic & Strategy",
            vi: "Tư duy & Chiến lược bán hàng",
            th: "ตรรกะและกลยุทธ์การขาย"
        },
        description: {
            en: "Advanced scenario-based evaluation focusing on strategic objection handling.",
            vi: "Đánh giá dựa trên tình huống nâng cao tập trung vào xử lý từ chối chiến lược.",
            th: "การประเมินตามสถานการณ์ขั้นสูง เน้นการจัดการข้อโต้แย้งเชิงกลยุทธ์"
        },
        questions: SALES_DATA,
        uiOverrides: {
            scoreLabel: {
                en: "Strategic Precision",
                vi: "Độ chính xác chiến lược",
                th: "ความแม่นยำเชิงกลยุทธ์"
            },
            finishTitle: {
                en: "Strategic Assessment Complete",
                vi: "Hoàn thành đánh giá chiến lược",
                th: "การประเมินเชิงกลยุทธ์เสร็จสมบูรณ์"
            },
            finishSub: {
                en: "Logic Analysis Results",
                vi: "Kết quả phân tích logic",
                th: "ผลการวิเคราะห์ตรรกะ"
            },
            feedbackHigh: {
                en: "Exceptional. You possess perfect command of system logic and objection handling.",
                vi: "Xuất sắc. Bạn nắm vững hoàn hảo logic hệ thống và xử lý từ chối.",
                th: "ยอดเยี่ยม คุณมีความเชี่ยวชาญในตรรกะของระบบและการจัดการข้อโต้แย้งอย่างสมบูรณ์แบบ"
            },
            feedbackMid: {
                en: "Competent. You understand the core concepts, but ensure to emphasize capital ownership.",
                vi: "Khá tốt. Bạn hiểu các khái niệm cốt lõi, nhưng hãy đảm bảo nhấn mạnh quyền sở hữu vốn.",
                th: "มีความสามารถ คุณเข้าใจแนวคิดหลัก แต่ควรเน้นย้ำเรื่องความเป็นเจ้าของเงินทุนให้ชัดเจน"
            },
            feedbackLow: {
                en: "Development Required. Focus on mastering the 'Self-funding' concept and revenue transparency.",
                vi: "Cần cải thiện. Tập trung vào việc nắm vững khái niệm 'Tự nạp vốn' và minh bạch doanh thu.",
                th: "ต้องปรับปรุง มุ่งเน้นไปที่การทำความเข้าใจแนวคิด 'Self-funding' และความโปร่งใสของรายได้"
            }
        }
    },
    {
        id: 'process-mastery',
        title: {
            en: "Process Mastery",
            vi: "Thành thạo quy trình",
            th: "ความเชี่ยวชาญในกระบวนการ"
        },
        description: {
            en: "Validate your expertise in the 1-Click Process, from registration to active trading.",
            vi: "Xác nhận chuyên môn của bạn trong Quy trình 1 Click, từ đăng ký đến giao dịch tích cực.",
            th: "ตรวจสอบความเชี่ยวชาญของคุณในกระบวนการ 1-Click ตั้งแต่การลงทะเบียนจนถึงการเทรดจริง"
        },
        questions: PROCESS_MASTERY_DATA,
        uiOverrides: {
             finishTitle: {
                en: "Proficiency Verified",
                vi: "Đã xác minh năng lực",
                th: "ยืนยันความเชี่ยวชาญแล้ว"
            },
            finishSub: {
                en: "Process Adherence Score",
                vi: "Điểm tuân thủ quy trình",
                th: "คะแนนการปฏิบัติตามกระบวนการ"
            },
            feedbackHigh: {
                en: "Flawless. You have achieved total mastery of the operational workflow.",
                vi: "Hoàn hảo. Bạn đã đạt được sự thành thạo tuyệt đối về quy trình vận hành.",
                th: "ไร้ที่ติ คุณมีความเชี่ยวชาญในขั้นตอนการทำงานอย่างสมบูรณ์"
            },
            feedbackMid: {
                en: "Satisfactory. You grasp the majority of the workflow steps.",
                vi: "Đạt yêu cầu. Bạn nắm bắt được phần lớn các bước trong quy trình làm việc.",
                th: "น่าพอใจ คุณเข้าใจขั้นตอนการทำงานส่วนใหญ่"
            },
            feedbackLow: {
                en: "Review Necessary. Please re-examine the Standard Operating Procedures.",
                vi: "Cần xem lại. Vui lòng kiểm tra lại Quy trình Vận hành Tiêu chuẩn (SOP).",
                th: "จำเป็นต้องทบทวน กรุณาตรวจสอบขั้นตอนการปฏิบัติงานมาตรฐานอีกครั้ง"
            }
        }
    }
];

// ==========================================
// COMPONENTS
// ==========================================

const StartScreen = ({ onSelectLanguage }) => {
    return (
        <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            {/* Logo removed as per request */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">The Brain Trade</h1>
            <p className="text-gray-500 mb-8 text-lg">Please select your language to start the quiz.</p>
            
            <div className="space-y-3 max-w-sm mx-auto">
                <button 
                    onClick={() => onSelectLanguage('th')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇹🇭 ภาษาไทย
                </button>
                <button 
                    onClick={() => onSelectLanguage('vi')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇻🇳 Tiếng Việt
                </button>
                <button 
                    onClick={() => onSelectLanguage('en')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇺🇸 English
                </button>
            </div>
        </div>
    );
};

const NameEntryScreen = ({ language, onNameSubmit, onBack }) => {
    const [name, setName] = useState('');
    const ui = UI_STRINGS[language];

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return (
        <div className="p-8 animate-in fade-in zoom-in duration-300 flex flex-col h-full justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{ui.enterNameLabel}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={ui.namePlaceholder}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg transition-all text-center font-bold text-gray-900 placeholder:text-gray-400 shadow-sm"
                    autoFocus
                />
                
                <button 
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                    {ui.startBtn}
                </button>
            </form>

            <button 
                onClick={onBack}
                className="mt-8 text-gray-400 font-medium hover:text-gray-600 transition-colors text-sm text-center w-full"
            >
                ← {ui.backToHome}
            </button>
        </div>
    );
};

const QuizSelector = ({ quizzes, language, onSelectQuiz, onBack }) => {
    const ui = UI_STRINGS[language];

    return (
        <div className="p-8 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{ui.selectQuiz}</h1>
            
            <div className="space-y-4 flex-grow">
                {quizzes.map((quiz) => (
                    <button 
                        key={quiz.id}
                        onClick={() => onSelectQuiz(quiz.id)}
                        className="w-full text-left p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-1">
                            {quiz.title[language]}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {quiz.description[language]}
                        </p>
                    </button>
                ))}
            </div>

            <div className="mt-8">
                <button 
                    onClick={onBack}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors"
                >
                    ← {ui.backToHome}
                </button>
            </div>
        </div>
    );
};

const ResultScreen = ({ score, total, language, userName, onRestart, uiOverrides }) => {
    const ui = UI_STRINGS[language];
    const ratio = score / total;
    
    // Determine overrides or default
    const title = uiOverrides?.finishTitle?.[language] || ui.finishTitle;
    const subtitle = uiOverrides?.finishSub?.[language] || ui.finishSub;
    
    let emoji = '🏆';
    let message = uiOverrides?.feedbackHigh?.[language] || ui.msgHigh;

    if (ratio < 0.5) {
        emoji = '📚';
        message = uiOverrides?.feedbackLow?.[language] || ui.msgLow;
    } else if (ratio < 0.8) {
        emoji = '👍';
        message = uiOverrides?.feedbackMid?.[language] || ui.msgMed;
    }

    return (
        <div className="text-center py-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-7xl mb-6 animate-bounce">{emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">{title}</h2>
            <h3 className="text-xl font-medium text-blue-600 mb-2">{ui.hello}, {userName}!</h3>
            <p className="text-gray-500 mb-6">{subtitle}</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 inline-block min-w-[200px] border border-gray-100">
                <span className="block text-5xl font-black text-blue-600 mb-1">{score}</span>
                <span className="text-gray-400 font-medium">
                    {ui.outOf} <span className="text-gray-600">{total}</span>
                </span>
                {uiOverrides?.scoreLabel && (
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                        {uiOverrides.scoreLabel[language]}
                     </div>
                )}
            </div>
            
            <p className="text-lg text-gray-600 font-medium px-4 leading-relaxed mb-8 max-w-md mx-auto">
                {message}
            </p>

            <button 
                onClick={onRestart}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5"
            >
                {ui.backToHome}
            </button>
        </div>
    );
};

const QuizGame = ({ language, quiz, userName, onExit }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    
    // Animation states for buttons
    const [selectedBtnIndex, setSelectedBtnIndex] = useState(null);
    const [animClass, setAnimClass] = useState('');

    const ui = UI_STRINGS[language];
    
    const questions = quiz.questions;
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIdx];

    // Reset state if quiz changes
    useEffect(() => {
        setCurrentIdx(0);
        setScore(0);
        setIsFinished(false);
        setFeedback(null);
        setInputValue('');
        setIsLocked(false);
    }, [quiz.id]);

    const handleChoice = useCallback((val, index) => {
        if (isLocked) return;
        setIsLocked(true);
        setSelectedBtnIndex(index ?? null);

        let isCorrect = false;
        let displayCorrect = "";

        if (currentQuestion.type === 'tf') {
            isCorrect = (val === currentQuestion.a);
            displayCorrect = (currentQuestion.a === 'true') ? ui.trueTxt : ui.falseTxt;
        } else if (currentQuestion.type === 'mcq') {
            const labels = currentQuestion.options?.[language] || [];
            displayCorrect = labels[currentQuestion.correctIdx || 0];
            isCorrect = (val === displayCorrect);
        } else if (currentQuestion.type === 'fill') {
            const answer = currentQuestion.a || '';
            isCorrect = (val.toString().trim().toLowerCase() === answer.toLowerCase());
            displayCorrect = answer;
        }

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback({ msg: ui.correct, type: 'correct' });
            setAnimClass('animate-pulse-green bg-emerald-500 border-emerald-500 text-white');
        } else {
            setFeedback({ msg: `${ui.incorrect} ${displayCorrect}`, type: 'incorrect' });
            setAnimClass('animate-shake bg-red-500 border-red-500 text-white');
        }

        setTimeout(() => {
            if (currentIdx < totalQuestions - 1) {
                setCurrentIdx(prev => prev + 1);
                setIsLocked(false);
                setFeedback(null);
                setInputValue('');
                setSelectedBtnIndex(null);
                setAnimClass('');
            } else {
                setIsFinished(true);
            }
        }, 1800);
    }, [isLocked, currentQuestion, language, ui, currentIdx, totalQuestions]);

    if (isFinished) {
        return (
            <ResultScreen 
                score={score} 
                total={totalQuestions} 
                language={language} 
                userName={userName}
                onRestart={onExit} 
                uiOverrides={quiz.uiOverrides}
            />
        );
    }

    const progressPercent = (currentIdx / totalQuestions) * 100;
    const headerScoreLabel = quiz.uiOverrides?.scoreLabel?.[language] || ui.scoreLabel;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        {ui.qLabel} {currentIdx + 1}/{totalQuestions}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                        {headerScoreLabel}: <span className="text-gray-800">{score}</span>
                    </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8">
                {/* Question */}
                <h2 className="text-xl font-bold text-gray-800 mb-8 leading-tight animate-in fade-in slide-in-from-right-4 duration-300" key={currentIdx}>
                    {currentQuestion[language]}
                </h2>
                
                <div className="space-y-3">
                    {currentQuestion.type === 'tf' && (
                        <>
                            {[ui.trueTxt, ui.falseTxt].map((label, idx) => {
                                const val = idx === 0 ? 'true' : 'false';
                                const isSelected = selectedBtnIndex === idx;
                                const baseClass = "w-full p-4 text-left border-2 border-gray-100 rounded-xl font-medium text-gray-700 bg-white shadow-sm hover:border-blue-200 focus:outline-none transition-all duration-200";
                                const finalClass = isSelected ? `${baseClass} ${animClass}` : baseClass;
                                
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => handleChoice(val, idx)}
                                        disabled={isLocked}
                                        className={finalClass}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </>
                    )}

                    {currentQuestion.type === 'mcq' && (
                         currentQuestion.options?.[language].map((label, idx) => {
                             const isSelected = selectedBtnIndex === idx;
                             const baseClass = "w-full p-4 text-left border-2 border-gray-100 rounded-xl font-medium text-gray-700 bg-white shadow-sm hover:border-blue-200 focus:outline-none transition-all duration-200";
                             const finalClass = isSelected ? `${baseClass} ${animClass}` : baseClass;

                             return (
                                <button 
                                    key={idx}
                                    onClick={() => handleChoice(label, idx)}
                                    disabled={isLocked}
                                    className={finalClass}
                                >
                                    {label}
                                </button>
                             );
                         })
                    )}

                    {currentQuestion.type === 'fill' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLocked}
                                placeholder={ui.placeholder}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && inputValue.trim()) {
                                        handleChoice(inputValue, 0);
                                    }
                                }}
                                className={`w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg font-bold transition-all ${isLocked && selectedBtnIndex === 0 ? animClass.replace('text-white', '') : ''}`} 
                            />
                            <button 
                                onClick={() => handleChoice(inputValue, 0)}
                                disabled={isLocked || !inputValue.trim()}
                                className={`w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${selectedBtnIndex === 0 ? animClass : ''}`}
                            >
                                {ui.submit}
                            </button>
                        </div>
                    )}
                </div>

                {/* Feedback */}
                <div 
                    className={`mt-8 text-center font-bold text-lg min-h-[1.5rem] transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'} ${feedback?.type === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}
                >
                    {feedback?.msg || '...'}
                </div>
            </div>
        </div>
    );
};

// ==========================================
// APP COMPONENT
// ==========================================

const App = () => {
    const [language, setLanguage] = useState(null);
    const [currentQuizId, setCurrentQuizId] = useState(null);
    const [userName, setUserName] = useState(null);

    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
    };

    const handleQuizSelect = (quizId) => {
        setCurrentQuizId(quizId);
    };

    const handleNameSubmit = (name) => {
        setUserName(name);
    };

    const handleBackToLang = () => {
        setLanguage(null);
        setCurrentQuizId(null);
        setUserName(null);
    };

    const handleBackFromQuiz = () => {
        setCurrentQuizId(null);
        setUserName(null);
    };

    const handleExit = () => {
        setLanguage(null);
        setCurrentQuizId(null);
        setUserName(null);
    };

    const currentQuiz = QUIZZES.find(q => q.id === currentQuizId);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl glass-card rounded-3xl shadow-2xl overflow-hidden relative min-h-[600px] flex flex-col">
                {!language ? (
                    <div className="p-8 flex-grow flex flex-col justify-center">
                        <StartScreen onSelectLanguage={handleLanguageSelect} />
                    </div>
                ) : !currentQuizId ? (
                     <QuizSelector 
                        quizzes={QUIZZES} 
                        language={language} 
                        onSelectQuiz={handleQuizSelect}
                        onBack={handleBackToLang}
                     />
                ) : !userName ? (
                    <NameEntryScreen 
                        language={language}
                        onNameSubmit={handleNameSubmit}
                        onBack={handleBackFromQuiz}
                    />
                ) : (
                    <QuizGame 
                        language={language} 
                        quiz={currentQuiz}
                        userName={userName} 
                        onExit={handleExit} 
                    />
                )}
            </div>
            
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                 <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                 <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                 <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

// ==========================================
// MOUNTING
// ==========================================

const root = createRoot(document.getElementById('root'));
root.render(<App />);