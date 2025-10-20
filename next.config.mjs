/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // 빌드 시 ESLint 에러 확인
  },
  typescript: {
    ignoreBuildErrors: false, // 빌드 시 TypeScript 에러 확인
  },
  images: {
    unoptimized: true,
    domains: [], // 외부 이미지 도메인 추가 필요시 여기에 추가
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  // 빌드 최적화
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
