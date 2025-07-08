/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() { // 이 부분을 추가합니다.
    return [
      {
        source: '/(.*)', // 모든 경로에 적용
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups', // 이 값을 설정합니다.
          },
        ],
      },
    ];
  },
};

export default nextConfig;