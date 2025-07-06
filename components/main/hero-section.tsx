"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-4xl font-bold text-black mb-6 leading-tight">
            스마트스토어 SEO
            <br />
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              최적화 솔루션
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-xl text-gray-600 mb-2 font-light">
            데이터 기반 분석으로 매출 성장을 이끌어내는 전문 서비스
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-3 mb-10">
            <div className="group">
              <blockquote className=" hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                "광고 매출/효율 Maximum으로 올리는 방법은?"
              </blockquote>
            </div>

            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                "상품 5개만 넘어가도 무엇을 어떻게 집중해야할지 모르는 대행사들,
                어떻게 관리해야할까?"
              </blockquote>
            </div>

            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                "네이버/구글/메타 등 매체별 놓치고 있는 키워드는 없나?"
              </blockquote>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="py-0 rounded-xl">
            <p className="text-lg md:text-lg font-light mb-0 text-black leading-relaxed">
              데이터 기반 분석으로 매출 성장을 이끌어내는 전문 서비스
            </p>

            <p className="text-lg md:text-lg mb-0 text-black">
              매체별 데이터 분석 기반 마케팅 전략 도출 전문 광고대행사
              <span className="font-bold text-lg md:text-2xl text-black relative">
                나인위닛
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </p>

            <p className="text-lg md:text-xl text-black ">
              상품별/키워드별 자동화로 매출을 극대화해드립니다.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-3">
            <p className="text-base md:text-lg  font-bold text-black ">
              매체별 데이터 분석 기반 마케팅 전략 도출 전문 대행사
              <span className="font-bold text-2xl "> 나인위닛</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
