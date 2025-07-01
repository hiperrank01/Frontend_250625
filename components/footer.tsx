export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white text-black px-3 py-1 rounded font-bold text-xl">
                9W
              </div>
              <span className="text-xl font-bold">나인위닛</span>
            </div>
            <p className="text-gray-400">스마트스토어 SEO 최적화 전문 서비스</p>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>주소: 구미시 공단동264-8 금오빌딩506-2호</p>
            <p>전화: 010-4590-4917</p>
            <p>이메일: 9winit@gmail.com</p>
            <p>사업자번호: 649-02-03465</p>
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
