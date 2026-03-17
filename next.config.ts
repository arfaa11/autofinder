import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * env vars for supabase and resend.
   */
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://teyrckdarkmenzatviqt.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: "sb_publishable_mHynPxKhpz6fEf6hWrAUvA_qxVHVmEq",
    RESEND_API_KEY: "re_3sQRQVcQ_CL5ykDcLpVRGAGoeAiky8vC2"
  },

  /* * fixes 404 errors on cloudflare by bypassing the next.js image resizing server.
   * cloudflare pages serves images directly from the public folder.
   */
  images: {
    unoptimized: true,
  },

  /*
   * allows server actions to execute from production domain.
   */
  experimental: {
    serverActions: {
      allowedOrigins: ["abautofinder.ca", "localhost:3000"],
    },
  },
};

export default nextConfig;