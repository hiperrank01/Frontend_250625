import Logo from "@/public/Logo_Main.png";
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={Logo.src} alt="나인위닛 로고" />
            </div>
            <p className="text-gray-400">스마트스토어 SEO 최적화 전문 서비스</p>
            <p>서비스 데이터 분석 기반 매출 최적화 전문</p>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>주소: 주소 수원시 세류동 482-7 501호</p>
            <p>전화: 010-4590-4917</p>
            <p>이메일:9winit01@gmail.com</p>
            <p>사업자번호: 246-17-02470</p>
            <p>대표: 배대근</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 나인위닛. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
