/* A custom PostCSS config replaces Next's defaults, so the first two entries
   restate them exactly (next/dist/build/webpack/config/blocks/css/plugins.js).
   The last one strips hover effects on touch screens — see the plugin. */
module.exports = {
  plugins: [
    "next/dist/compiled/postcss-flexbugs-fixes",
    [
      "next/dist/compiled/postcss-preset-env",
      {
        browsers: ["defaults"],
        autoprefixer: { flexbox: "no-2009" },
        stage: 3,
        features: { "custom-properties": false },
      },
    ],
    "./scripts/postcss-hover-only.js",
  ],
};
