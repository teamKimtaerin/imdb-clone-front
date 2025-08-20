import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 원격 패턴 설정 (권장 방법)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    // 이미지 최적화 설정
    formats: ['image/webp', 'image/avif'],
    // 캐싱 설정
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7일
    // 이미지 크기 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 정적 파일 캐싱 헤더 설정
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
