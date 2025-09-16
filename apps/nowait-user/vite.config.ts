import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
// });

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      svgr(),
      sentryVitePlugin({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: "stayready",
        project: "nowait-user",

        sourcemaps: {
          assets: "./dist/**",
          filesToDeleteAfterUpload: "./dist/**/*.map",
        },
      }),
    ],
    build: {
      outDir: "dist",
      sourcemap: true,
    },
    server: {
      proxy: {
        // /orders 로 시작하는 요청은 모두 백엔드서버 주소로 전달
        "/orders": {
          target: env.VITE_SERVER_URI,
          changeOrigin: true,
        },
        "/v1": {
          target: env.VITE_SERVER_URI,
          changeOrigin: true,
        },
        "/api/images": {
          target:
            "https://gtablestoreimage-resize-bucket.s3.ap-northeast-2.amazonaws.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/images/, ""),
        },
        "/api/banner-images": {
          target: "https://gtablestoreimage.s3.ap-northeast-2.amazonaws.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/banner-images/, ""),
        },
      },
    },
  };
});
