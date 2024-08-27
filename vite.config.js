// vite.config.js
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  base: "/wms_3d/",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    cssCodeSplit: true, // 是否提取所有CSS到一个CSS文件中, introduct: https://cn.vitejs.dev/config/build-options.html#build-csscodesplit
  },
});
