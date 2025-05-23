import type { NextConfig } from 'next'
import path from 'path';
 
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
    silenceDeprecations: ['legacy-js-api'],
  },
}
 
export default nextConfig