/** @type {import('next').NextConfig} */
const nextConfig = {
  // For VPS deployment - use full Next.js features (SSR, API routes)
  // Comment out for static export if needed
  
  // Uncomment these lines ONLY if you want static export:
  // output: 'export',
  // trailingSlash: true,
  // images: { unoptimized: true },
  
  // For VPS deployment with full features:
  images: {
    domains: ['localhost', 'devhakim.com'],
  },
  
  // Optional: Add custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig