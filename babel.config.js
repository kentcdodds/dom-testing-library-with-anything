module.exports = function(api) {
  var env = api.cache(() => process.env.NODE_ENV)

  return {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', {legacy: true}],
      ['@babel/plugin-proposal-class-properties', {loose: true}],
    ],
  }
}
