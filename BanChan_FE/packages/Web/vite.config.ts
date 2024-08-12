import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  // mode에 따른 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env": env, // 환경 변수를 define을 통해 사용
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://i11e105.p.ssafy.io", // 실제 API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://i11e105.p.ssafy.io", // 실제 API 서버 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
    },
    base: "/", // 모든 경로에 /m을 붙이도록 설정
  };
});

