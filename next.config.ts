import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Home-dir package-lock.json was making Turbopack treat ~ as the workspace
  // root, so @import "tailwindcss" resolved outside this project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
