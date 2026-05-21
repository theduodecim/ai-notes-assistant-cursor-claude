import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/confirm",
        has: [{ type: "query", key: "token_hash" }],
        destination: "/auth/confirm/handler",
      },
    ];
  },
};

export default nextConfig;
