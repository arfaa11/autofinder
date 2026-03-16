import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://teyrckdarkmenzatviqt.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: "sb_publishable_mHynPxKhpz6fEf6hWrAUvA_qxVHVmEq",
    RESEND_API_KEY: "re_3sQRQVcQ_CL5ykDcLpVRGAGoeAiky8vC2"
  },
};

export default nextConfig;
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
