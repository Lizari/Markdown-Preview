const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { webpack, isServer }) => {
    config.plugins.push(
        new webpack.ProvidePlugin({
          React: 'react',
        }),
    );

    // ビルドエラー修正用
    // character-reference-invalid/index.json
    // character-entities-legacy/index.json
    config.resolve.extensions = ['.tsx', '.ts', '.js'];
    config.module.rules.push({
      test: /\.json$/,
      loader: "json-loader",
      type: "javascript/auto"
    })

    useEsbuildMinify(config);
    useEsbuildLoader(config, {
      loader: 'jsx',
      target: 'es2017',
    });


    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.tls = false;
    }
    return config;
  },
}

function useEsbuildMinify(config, options) {
  const { minimizer } = config.optimization;
  const terserIndex = minimizer.findIndex(
      minifier => minifier.constructor.name === 'TerserPlugin',
  );

  minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options));
}

function useEsbuildLoader(config, options) {
  const { rules } = config.module;
  const rule = rules.find(rule => rule.test.test('.js'));

  rule.use = {
    loader: 'esbuild-loader',
    options,
  };
}