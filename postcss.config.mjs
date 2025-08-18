// postcss.config.mjs

// 기존 형식 (배열 기반) - Next.js만 지원
// export default {
//   plugins: ['tailwindcss', 'autoprefixer'],
// }
// postcss.config.mjs

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;

// 새로운 형식 (객체 기반) - Next.js와 Vite 모두 지원
// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   }
// }

// export default config


