import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip type checking during build
  },
  env: {
    IP_INFO_TOKEN: process.env.IP_INFO_TOKEN,
    MONGODB_URI: process.env.MONGODB_URI,
    MYAPP_AWS_ACCESS_KEY_ID: process.env.MYAPP_AWS_ACCESS_KEY_ID,
    MYAPP_AWS_SECRET_ACCESS_KEY: process.env.MYAPP_AWS_SECRET_ACCESS_KEY,
    MYAPP_AWS_REGION: process.env.MYAPP_AWS_REGION,
    NOTIFICATION_EMAIL_USER: process.env.NOTIFICATION_EMAIL_USER,
    NOTIFICATION_EMAIL_PASS: process.env.NOTIFICATION_EMAIL_PASS,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    SECRET_KEY: process.env.SECRET_KEY,
    RAZORPAY_PAYMENT_TOKEN: process.env.RAZORPAY_PAYMENT_TOKEN,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  },
  images: {
    domains: ["printeepal-collections-images.s3.us-east-1.amazonaws.com"],
  },
};

export default nextConfig;
