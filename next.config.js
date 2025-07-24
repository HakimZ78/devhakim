/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for IONOS deployment
  output: 'export',
  
  // Add trailing slash for static hosting
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Optional: Add base path if deploying to subdirectory
  // basePath: '/portfolio',
  
  // Optional: Asset prefix for CDN
  // assetPrefix: 'https://your-cdn.com',
  
  // Disable server-side features for static export
  experimental: {
    // Disable app dir middleware for static export
    middlewareFile: false
  }
}

module.exports = nextConfig